import { loadingStartedEvent, loadingStoppedEvent } from "@/api/baseAxios";
import { useAuthenticationStore } from "@/stores/authentication";
import { useBreadcrumbStore } from "@/stores/breadcrumb";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

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
  routes: routes,
});

// Loader middleware
router.beforeEach((to, from, next) => {
  // Loader
  dispatchEvent(loadingStartedEvent());

  // Continue resolving the route
  next();
});

// Authentication middleware
router.beforeEach(async (to, from, next) => {
  // Init the auth store
  const authStore = useAuthenticationStore();
  await authStore.loadUserFromStorage();

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    // No auth required. We can navigate
    next();
    return;
  }

  if (authStore.isAuthenticated) {
    // Already signed in, we can navigate anywhere
    next();
    return;
  }

  // Authentication is required. Trigger the sign in process, including the return URI
  console.log("Authenticating a protected url: " + to.path);
  await authStore.signIn(to.path);
  next(false);
});

// Title middleware
router.beforeEach((to, from, next) => {
  // Get the page title from the route meta data that we have defined
  // See further down below for how we setup this data
  const title = to.meta.title;
  const defaultTitle = "Vue app";

  // If the route has a title, set it
  if (title) {
    document.title = title.toString() + " - " + defaultTitle;

    // Set the breadcrumb
    const breadcrumbStore = useBreadcrumbStore();
    breadcrumbStore.clear();
    breadcrumbStore.append(title.toString());
  } else {
    document.title = defaultTitle;
  }

  // Continue resolving the route
  next();
});

// Loader middleware
router.afterEach((to, from) => {
  // When navigating to the same route, the beforeEach will not be called
  const isNavigatingToOtherRoute =
    to.fullPath !== from.fullPath || JSON.stringify(to.params) !== JSON.stringify(from.params);

  if (
    // The beforeEach will be called:
    from.name == null || // When I refresh,
    isNavigatingToOtherRoute // When I navigae to other routes
  ) {
    dispatchEvent(loadingStoppedEvent());
  }
});

export default router;
