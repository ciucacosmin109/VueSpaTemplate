<template>
  <div v-if="runningOperations > 0" class="loader-backdrop">
    <div class="loader-container">
      <i class="fas fa-spinner fa-spin"></i>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRandomMessage } from "./loadingMessages";

//////////////////////////////////////////////////////////////////////////////
// Do not create more instances of this component
// Searate instance can have different values for 'runningOperations'
// It does not work as expected WITHOUT <keep-alive> on layout
// Use a store ? => see ToastList.vue
// TODO: fix this
//////////////////////////////////////////////////////////////////////////////

export default defineComponent({
  data() {
    return {
      runningOperations: 0,
      message: "Loading...",
    };
  },
  methods: {
    increment() {
      this.runningOperations++;
      this.message = getRandomMessage();
      //console.log("+", this.runningOperations);
    },
    decrement() {
      this.runningOperations--;
      //console.log("-", this.runningOperations);
    },
  },
  mounted() {
    addEventListener("lodingStarted", this.increment);
    addEventListener("lodingStopped", this.decrement);
  },
  unmounted() {
    removeEventListener("lodingStarted", this.increment);
    removeEventListener("lodingStopped", this.decrement);
  },
});
</script>

<style lang="scss" scoped>
.loader-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 200;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;

  height: 100px;
  width: 100%;
  padding: 1em;

  .fa-spin {
    font-size: 2em;
  }
}
</style>
