<template>
  <div class="d-flex align-items-center pb-3">
    <div class="d-flex align-items-center" v-for="(item, idx) in breadcrumbStore.path">
      <button
        class="border-0"
        :class="[
          (!item.clickCallback && !item.location && !item.backOffset) || idx === breadcrumbStore.path.length - 1
            ? 'btn border-0 disabled'
            : 'btn btn-link',
          idx === 0 ? 'pl-0' : '',
        ]"
        @click="itemClicked(item, idx)"
      >
        {{ item.text }}
      </button>
      <span v-if="idx !== breadcrumbStore.path.length - 1" class="">/</span>
    </div>
  </div>
</template>
<script lang="ts">
import { BreadcrumbItem, useBreadcrumbStore } from "@/stores/breadcrumb";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const breadcrumbStore = useBreadcrumbStore();
    return {
      breadcrumbStore: breadcrumbStore,
    };
  },
  watch: {
    $route() {
      console.log(this.$route);
      console.log({ ...this.$router });
    },
  },
  methods: {
    isItemEnabled(item: BreadcrumbItem, idx: number) {
      return (
        (!item.clickCallback && !item.location && !item.backOffset) || idx === this.breadcrumbStore.path.length - 1
      );
    },
    itemClicked(item: BreadcrumbItem, idx: number) {
      if (item.clickCallback) {
        item.clickCallback();
      } else if (item.backOffset) {
        this.$router.go(-item.backOffset);
      } else if (item.location) {
        this.$router.push({
          name: item.location.name,
          params: item.location.params as any,
          query: item.location.query as any,
        });
      }
      this.breadcrumbStore.path = this.breadcrumbStore.path.filter((x, i) => i < idx);
    },
  },
});
</script>
<style lang="scss">
.border-0 {
  border: 0px !important;
}
</style>
