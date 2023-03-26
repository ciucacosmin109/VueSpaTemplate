import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "Homepage",
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/vuetifydemo",
    name: "vuetifydemo",
    meta: {
      title: "Vuetify demo",
    },
    component: () => import("../views/VuetifyDemo/VuetifyDemo.vue"),
  },
  {
    path: "/about/:param?", // https://router.vuejs.org/guide/essentials/route-matching-syntax.html#optional-parameters
    name: "about",
    meta: {
      title: "About",
    },
    component: () => import("../views/AboutView.vue"),
  },

  // Others
  {
    path: "/callback",
    name: "callback",
    component: () => import("../views/OidcCallback/OidcCallback.vue"),
  },
  {
    path: "/error/:code(\\d+)",
    name: "error",
    component: () => import("../views/Error/ErrorView.vue"),
  },
  {
    // Not found handler
    path: "/:pathMatch(.*)*",
    meta: {
      error: 404,
    },
    component: () => import("../views/Error/ErrorView.vue"),
  },
];
