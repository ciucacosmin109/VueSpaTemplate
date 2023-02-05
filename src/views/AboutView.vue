<template>
  <div>
    This is an about page {{ $route.params.param }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  mounted() {
    console.log("mounted the about page")
  }
});
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
