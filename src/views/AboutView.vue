<template>
  <div>
    <span>This is an about page {{ $route.params.param }}</span>
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
      const ok = await this.$askUser("I have a question for you", "Do you want to open a popup ?");
      if (ok) {
        this.popupVisible = true;
      } else {
        this.$showWarning("You canceled the operation !");
      }
    },
  },
  mounted() {
    console.log("mounted the about page");
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
