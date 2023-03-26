<template>
  <Transition name="slide-from-top">
    <div v-if="visible" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div v-if="title !== ''" class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button v-if="!hideXbutton" type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer d-flex">
            <div class="d-flex flex-grow-1">
              <slot name="footer"></slot>
            </div>
            <div class="d-flex">
              <button v-if="!hideCancelButton" type="button" class="btn btn-secondary ml-2" @click="close">
                Close
              </button>
              <button v-if="!hideConfirmButton" type="button" class="btn btn-primary ml-2" @click="confirm">Ok</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["confirm", "close"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    // Content
    title: {
      type: String,
      default: "",
    },

    // Style
    hideXbutton: {
      type: Boolean,
      default: false,
    },
    hideConfirmButton: {
      type: Boolean,
      default: false,
    },
    hideCancelButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>
<style scoped lang="scss">
.modal {
  display: inherit;
  background-color: rgba($color: #000000, $alpha: 0.2);
}
</style>
