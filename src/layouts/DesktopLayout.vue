<template>
  <div id="layout-container" class="d-flex align-items-stretch h-100 w-100">
    
    <!-- Sidebar -->
    <div class="flex-shrink-1">
      <SideBar />
    </div>

    <!-- Content -->
    <div class="flex-grow-1 overflow-custom p-3">
      <slot></slot>
    </div>

    <!-- Toasts -->
    <ToastList />

    <!-- Loader -->
    <GlobalLoader />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '../components/navigation/SideBar.vue';
import ToastList from '../components/toast/ToastList.vue';
import GlobalLoader from '@/components/loader/GlobalLoader.vue';

export default defineComponent({
  components: {
    SideBar,
    ToastList,
    GlobalLoader
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