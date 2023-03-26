<template>
  <div>
    <div>This is an about page {{ $route.params.param }}</div>
    <button class="btn btn-primary" @click="askUserTest">Show popup</button>
    <Popup title="Demo popup" :visible="popupVisible" @close="popupVisible = false">Test 123</Popup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Popup from "@/components/popup/Popup.vue";

export default defineComponent({
  components: {
    Popup,
  },
  data() {
    return {
      popupVisible: false,
    };
  },
  methods: {
    async askUserTest() {
      let ok = await this.$askUser("I have a question for you", "Do you want to open a popup ?");
      while (!ok) {
        ok = await this.$askUser(":((", "PWEEEEEASE");
      }
      this.popupVisible = true;
    },
  },
  mounted() {
    console.log("mounted the about page");

    if (this.$route.params.param) {
      this.$breadcrumbStore.updateIndex(0, (x) => (x.location = { name: "about", params: { param: "" } }));
      this.$breadcrumbStore.append(this.$route.params.param.toString());
    }
  },
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
