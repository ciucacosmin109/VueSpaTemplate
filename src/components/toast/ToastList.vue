<template>
  <TransitionGroup name="slide" tag="div" class="custom-toast-list d-flex flex-column justify-content-end">
    <div
      v-for="toast in toastStore.list"
      :key="toast.message.length"
      class="custom-toast overflow-hidden"
      :class="getToastColors(toast.type)"
    >
      <div class="custom-toast-progress-bar" :style="`width: ${(toast.elapsedTime / toast.totalTime) * 100}%`"></div>
      <button type="button" class="custom-toast-btn btn-close btn-close-white"></button>

      <div class="custom-toast-body overflow-auto">
        <i :class="getToastIcon(toast.type)"></i>
        {{ toast.message }}
      </div>
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
import { ToastProperties, ToastType, useToastStore } from "@/stores/toast";
import { defineComponent, TransitionGroup } from "vue";

///////////////////////////////////////////////////////
// Do not create more instances of this component
// Each instance will increment the same store
// It does not work as expected with <keep-alive> on layout
// TODO: fix this
///////////////////////////////////////////////////////

const timeStep = 250;

export default defineComponent({
  data() {
    const toastStore = useToastStore();

    return {
      toastStore: toastStore,
      stepInterval: 0,
    };
  },
  methods: {
    getToastColors(type: ToastType) {
      switch (type) {
        case ToastType.Info:
          return "text-white bg-primary";
        case ToastType.Success:
          return "text-white bg-success";
        case ToastType.Warning:
          return "text-black bg-warning";
        case ToastType.Error:
          return "text-white bg-danger";
        case ToastType.Exception:
          return "text-white bg-danger";
        case ToastType.Unauthorized:
          return "text-white bg-danger";
      }
    },
    getToastIcon(type: ToastType) {
      switch (type) {
        case ToastType.Info:
          return "fas fa-info-circle";
        case ToastType.Success:
          return "fas fa-check-circle";
        case ToastType.Warning:
          return "fas fa-exclamation-triangle";
        case ToastType.Error:
          return "fas fa-times-circle";
        case ToastType.Exception:
          return "fas fa-bug";
        case ToastType.Unauthorized:
          return "fas fa-key";
      }
    },
    showToast(message: string, type?: ToastType) {
      this.toastStore.addToast(new ToastProperties(message, type));
    },
    toastHandler(data: unknown) {
      const toast = data as ToastProperties;
      this.showToast(toast.message, toast.type);
    },
  },
  mounted() {
    this.stepInterval = setInterval(() => this.toastStore.incrementToastTimes(timeStep), timeStep);
    this.$emitter.on("showToast", this.toastHandler);
  },
  unmounted() {
    clearInterval(this.stepInterval);
    this.$emitter.off("showToast", this.toastHandler);
  },
});
</script>

<style lang="scss" scoped>
/* Style */
.custom-toast-list {
  z-index: 500;

  position: absolute;
  bottom: 1em;
  right: 1em;
  width: 30em;
  max-width: calc(100% - 2em);

  display: flex;
  gap: 0.6em;

  overflow-x: hidden;
}

.custom-toast:hover {
  opacity: 1;
}
.custom-toast {
  position: relative;
  border-radius: 0.5em;

  cursor: pointer;
  opacity: 0.8;
}

.custom-toast-btn {
  position: absolute;
  top: 0.7em;
  right: 0.4em;
}
.custom-toast-body {
  padding: 0.6em 1em;
  padding-right: 2em;
  max-height: 200px;
  overflow-wrap: break-word;
}

.custom-toast-progress-bar {
  position: absolute;
  height: 0.3em;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-warning .custom-toast-progress-bar {
  background-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
