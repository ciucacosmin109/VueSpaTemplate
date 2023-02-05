<template>
  <div id="app-container" 
    :data-bs-theme="currentTheme.bootstrapColorMode"
    :class="currentTheme.cssClass">
    
    <component :is="layout">
      <RouterView v-slot="{ Component, route }">
        <!-- Use any custom transition and to `fade` -->
        <Transition name="router">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </component>

  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import DesktopLayout from "./layouts/DesktopLayout.vue";
import MobileLayout from "./layouts/MobileLayout.vue";
import ResponsiveLayout from "./layouts/ResponsiveLayout.vue";

import { useThemeStore } from './stores/theme';

export default defineComponent({
  components: {
    DesktopLayout,
    MobileLayout,
    ResponsiveLayout
  },
  data() {
    const themeStore = useThemeStore();

    return {
      currentTheme: storeToRefs(themeStore).currentTheme,

      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    layout(): string {
      return "ResponsiveLayout";

      // Do not change the layout like this (see the comments in ToastList.vue & GlobalLoader.vue)
      //return this.windowWidth > 750 ? "DesktopLayout" : "MobileLayout";
    }
  },
  methods: {
    windowResized() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener("resize", this.windowResized);
  },
  unmounted() {
    window.removeEventListener("resize", this.windowResized);
  },
});
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  
}

</style>