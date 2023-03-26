import { BreadcrumbItem, RouterLocation, useBreadcrumbStore } from "@/stores/breadcrumb";
import type { App, Plugin } from "vue";

declare type BcStoreType = {
  clear(): void;
  remove(items: number): void;

  append(text: string): void;
  appendWithBack(text: string, back: number): void;
  appendWithLocation(text: string, location: RouterLocation): void;
  appendWithClickHandler(text: string, clickCallback?: (() => void) | undefined): void;

  updateIndex(index: number, updateFunction: (item: BreadcrumbItem) => void): void;
};

// The install function used by Vue to register the plugin
export const breadcrumbPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$breadcrumbStore = useBreadcrumbStore();
  },
};

// Bind to `this` keyword
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $breadcrumbStore: BcStoreType;
  }
}
