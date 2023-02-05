import type { App, Plugin } from "vue";
import mitt, { type Emitter, type EventType } from "mitt";
export const emitter = mitt();

// The Install function used by Vue to register the plugin
export const emitterPlugin: Plugin = {
  install(app: App) {
    // makes 'mitt' available in your Vue.js app as "this.$emitter"
    app.config.globalProperties.$emitter = emitter;
    // register Headline as a global component, so you can use it wherever you want in your app
    //app.component('Headline', Headline)
  },
};

// You can also declare the type in the shims-vue.d.ts file
declare module "@vue/runtime-core" {
  // Bind to `this` keyword
  interface ComponentCustomProperties {
    $emitter: Emitter<Record<EventType, unknown>>;
  }
}
