import { loadingStartedEvent, loadingStoppedEvent } from '@/api/baseAxios';
import { useAuthenticationStore } from '@/stores/authentication';
import { createRouter, createWebHistory } from 'vue-router'

// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file, in which case you will need to add an export
// to ensure it is treated as a module
//export {}
// import 'vue-router'
// declare module 'vue-router' {
//   interface RouteMeta {
//     icon?: string
//     requiresAuth?: boolean
//   }
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: "Homepage",
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (Home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about/:param?', // https://router.vuejs.org/guide/essentials/route-matching-syntax.html#optional-parameters
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/callback', // https://router.vuejs.org/guide/essentials/route-matching-syntax.html#optional-parameters
      name: 'callback',
      component: () => import('../views/OidcCallback/OidcCallback.vue')
    },
    {
      path: '/error/:code(\\d+)',
      name: 'error',
      component: () => import('../views/Error/ErrorView.vue')
    },
    {
      // Not found handler
      path: '/:pathMatch(.*)*',
      meta: {
        error: 404
      },
      component: () => import('../views/Error/ErrorView.vue')
    }
  ]
})

// Authentication middleware
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthenticationStore();
  if (authStore.isAuthenticated) {
    // Already signed in, we can navigate anywhere
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    // Authentication is required. Trigger the sign in process, including the return URI
    await authStore.authenticate(to.path);
    console.log('Authenticating a protected url: ' + to.path);
    next();
  } else {
    // No auth required. We can navigate
    next()
  }
});

// Title middleware
router.beforeEach((to, from, next) => {
  // Get the page title from the route meta data that we have defined
  // See further down below for how we setup this data
  const title = to.meta.title
  const defaultTitle = "Vue app";

  // If the route has a title, set it as the page title of the document/page
  if (title) {
    document.title = title.toString() + " - " + defaultTitle;
  }
  else {
    document.title = defaultTitle;
  }

  // Continue resolving the route
  next()
});


// Loader middleware
router.beforeEach((to, from, next) => {
  // Loader
  dispatchEvent(loadingStartedEvent())

  // Continue resolving the route
  next()
});
router.afterEach((to, from) => {
  // When navigating to the same route, the beforeEach will not be called
  const isNavigatingToOtherRoute = to.fullPath !== from.fullPath || JSON.stringify(to.params) !== JSON.stringify(from.params);

  if( // The beforeEach will be called:
    from.name == null || // When I refresh,
    isNavigatingToOtherRoute // When I navigae to other routes
  ) {
    dispatchEvent(loadingStoppedEvent());
  }
})

export default router
