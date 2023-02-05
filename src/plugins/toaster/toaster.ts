import { ToastType } from '@/stores/toast';
import type { App, Plugin } from 'vue';
import { emitter } from '../eventBus/eventBus';

export function showToast(message: string, type?: ToastType) {
  emitter.emit("showToast", {message: message, type: type});
}

// The install function used by Vue to register the plugin
export const toasterPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$showToast = showToast;
    app.config.globalProperties.$showSuccess = message => showToast(message, ToastType.Success);
    app.config.globalProperties.$showWarning = message => showToast(message, ToastType.Warning);
    app.config.globalProperties.$showError = message => showToast(message, ToastType.Error);
  }
}

// Bind to `this` keyword
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $showToast: (message: string, type?: ToastType) => void;
    $showSuccess: (message: string) => void;
    $showWarning: (message: string) => void;
    $showError: (message: string) => void;
  }
}