import { GlobalPopupProperties } from "@/components/popup/globalPopup";
import type { App, Plugin } from "vue";
import { emitter } from "../eventBus/eventBus";

export async function askUser(title: string, message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const confirm = () => {
      resolve(true);
      emitter.off("confirm-global-popup");
    };
    const close = () => {
      resolve(false);
      emitter.off("close-global-popup");
    };

    emitter.on("confirm-global-popup", confirm);
    emitter.on("close-global-popup", close);

    emitter.emit("show-global-popup", new GlobalPopupProperties(message, title));
  });
}

// The install function used by Vue to register the plugin
export const popupPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$askUser = askUser;
  },
};

// Bind to `this` keyword
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $askUser: (title: string, message: string) => Promise<boolean>;
  }
}
