<template>
  <div id="layout-container" class="d-flex flex-column align-items-stretch h-100 w-100">
    
    <!-- Navbar -->
    <div class="flex-shrink-1">
      <NavigationBar />
    </div>

    <!-- Content -->
    <div class="flex-grow-1 overflow-auto p-3">
      <slot></slot>
    </div>
    
    <!-- Toasts -->
    <ToastList />

    <!-- Loader -->
    <GlobalLoader />

  </div>
</template>

<script lang="ts">
import NavigationBar from '@/components/navigation/NavigationBar.vue';
import { defineComponent } from 'vue';
import ToastList from '../components/toast/ToastList.vue';
import GlobalLoader from '@/components/loader/GlobalLoader.vue';

export default defineComponent({
  components: { 
    NavigationBar, 
    ToastList,
    GlobalLoader
  },
});
</script>

<style lang="scss" scoped>

</style>
  