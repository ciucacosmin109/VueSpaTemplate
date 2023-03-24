<template>
  <div>
    This is a home page
  </div>
</template>

<script lang="ts">
import { baseApiFactory } from '@/api/baseApi'; 
import { defineComponent } from 'vue'; 

const demoApi = baseApiFactory("/api/Demo/TestApiAuthorization");
const demoAdminApi = baseApiFactory("/api/Demo/TestAdminAuthorization");

const demoRightApi = baseApiFactory("/api/Demo/TestRightAuthorization");

export default defineComponent({
  async mounted() { 
    const res = await demoApi.getAll<string>();
    if(res.ok) {
      this.$showSuccess("Fetched some useless data");
    }

    const res2 = await demoAdminApi.getAll<string>();
    if(res2.ok) {
      this.$showSuccess("Fetched some useless data 2");
    }

    const res3 = await demoRightApi.getAll<string>();
    if(res3.ok) {
      this.$showSuccess("Fetched some useless data 3 (right)");
    }

    // await demoApi.put<unknown>({});
    // await demoApi.post<unknown>();
    // await demoApi.deleteAll<unknown>();
  }
});
</script>

<style lang="scss" scoped>
</style>
