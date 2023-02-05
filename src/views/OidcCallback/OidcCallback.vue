<template>
  <div>
    Signing in ...
  </div>
</template>

<script lang="ts">
import { useAuthenticationStore } from '@/stores/authentication';
import { defineComponent } from 'vue';
export default defineComponent({
  async mounted() {
    const authStore = useAuthenticationStore();
    try {
      const result = await authStore.userManager.signinRedirectCallback();
      let returnToUrl = '/';
      if (result.state !== undefined) { 
        returnToUrl = result.state;
      }
      this.$router.push({ path: returnToUrl });
    } catch (e) {
      this.$router.push({ name: 'error', params: { code: "401" } });
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
