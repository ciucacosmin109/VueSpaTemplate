<template>
  <div id="layout-container" class="d-flex align-items-stretch h-100 w-100" :class="layoutContainerClass">
    <!-- Sidebar / Navbar -->
    <div class="flex-shrink-1">
      <component :is="nav" />
    </div>

    <!-- Content -->
    <div class="flex-grow-1 p-3" :class="contentOverflowClass">
      <slot></slot>
    </div>

    <!-- Toasts -->
    <ToastList />

    <!-- Popups -->
    <GlobalPopup />

    <!-- Loader -->
    <GlobalLoader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "../components/navigation/SideBar.vue";
import NavigationBar from "@/components/navigation/NavigationBar.vue";
import ToastList from "../components/toast/ToastList.vue";
import GlobalLoader from "@/components/loader/GlobalLoader.vue";
import GlobalPopup from "@/components/popup/GlobalPopup.vue";

export default defineComponent({
  components: {
    SideBar,
    NavigationBar,
    ToastList,
    GlobalLoader,
    GlobalPopup,
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    isMobile(): boolean {
      return this.windowWidth < 750;
    },
    nav(): string {
      return !this.isMobile ? "SideBar" : "NavigationBar";
    },
    contentOverflowClass(): string {
      return !this.isMobile ? "overflow-custom" : "overflow-auto";
    },
    layoutContainerClass(): string {
      return !this.isMobile ? "" : "flex-column";
    },
  },
  methods: {
    windowResized() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
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
/* Styles */
.overflow-custom {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
