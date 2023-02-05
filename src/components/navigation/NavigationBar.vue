<template>
  <nav class="w-100 navbar navbar-expand-sm shadow p-0">
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav-pills">
          <li class="nav-item">
            <RouterLink to="/" class="px-3 py-1 nav-link" active-class="active">
              <i class="fas fa-home me-2"></i>
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="px-3 py-1 nav-link" active-class="active">
              <i class="fas fa-info-circle me-2"></i>
              About
            </RouterLink>
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

//const themeStore = useThemeStore();

export default defineComponent({
  data() {
    const themeStore = useThemeStore();

    return {
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
