<template>
  <nav class="w-100 navbar shadow p-0" :class="{ 'navbar-expand': isExpanded }">
    <div class="w-100 container-fluid p-2">
      <!-- Logo -->
      <div class="navbar-brand p-0">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
        <span class="fs-4 ms-3">Vue app</span>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse overflow-scroll" id="navbarNav">
        <ul class="navbar-nav nav-pills">
          <!-- Main links -->
          <li v-for="(route, index) of sideBarRoutes" :key="index" class="d-flex flex-row">
            <div class="d-flex overflow-hidden">
              <RouterLink
                :to="route.route"
                class="px-3 py-1 nav-link flex-grow-1 d-flex align-items-center"
                :class="{ 'partially-active': $route.name === route.route.name }"
                active-class="partially-active"
                exact-active-class="active"
              >
                <i :class="route.icon" class="me-2"></i>
                <span class="text-nowrap">{{ route.text }}</span>
              </RouterLink>
              <button
                v-if="route.children.length > 0"
                class="btn btn-link py-0 ps-2 pe-1"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i class="fas fa-caret-down"></i>
              </button>
            </div>

            <!-- Children -->
            <div v-if="route.children.length > 0" class="collapse" id="collapseExample">
              <ul>
                <li v-for="(child, childIndex) of route.children" :key="index * 1000 + childIndex">
                  <RouterLink
                    :to="child.route"
                    class="px-3 py-1 nav-link"
                    active-class="partially-active"
                    exact-active-class="active"
                  >
                    <i :class="child.icon" class="me-2"></i>
                    <span class="text-nowrap">{{ child.text }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { sideBarRoutes } from "./sideBarRoutes";

//const themeStore = useThemeStore();

export default defineComponent({
  data() {
    const themeStore = useThemeStore();

    return {
      sideBarRoutes: sideBarRoutes,
      isExpanded: false,

      themeStore: themeStore,

      allThemes: themeStore.allThemes,
      currentTheme: storeToRefs(themeStore).currentTheme,
    };
  },
  methods: {
    changeTheme(theme: string) {
      this.themeStore.changeTheme(theme);
    },
  },
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
  user-select: none;
}
</style>
