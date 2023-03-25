<template>
  <Popup :visible="visible" :title="title" @close="close" @confirm="confirm">{{ message }}</Popup>
</template>
<script lang="ts">
import { emitter } from "@/plugins/eventBus/eventBus";
import { defineComponent } from "vue";
import type { GlobalPopupProperties } from "./globalPopup";
import Popup from "./Popup.vue";

export default defineComponent({
  components: { Popup },
  data() {
    return {
      visible: false,
      title: "",
      message: "",
    };
  },
  methods: {
    confirm() {
      this.visible = false;
      emitter.emit("confirm-global-popup");
    },
    close() {
      this.visible = false;
      emitter.emit("close-global-popup");
    },
  },
  mounted() {
    emitter.on("show-global-popup", (data) => {
      const props = data as GlobalPopupProperties;
      this.message = props.message;
      this.title = props.title;

      this.visible = true;
    });
  },
  unmounted() {
    emitter.off("show-global-popup");
  },
});
</script>
<style scoped lang="scss"></style>
