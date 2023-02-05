import { ref } from "vue";
import { defineStore } from "pinia";

export enum ToastType {
  Info,
  Success,
  Warning,
  Error,
  Exception,
  Unauthorized,
}

export class ToastProperties {
  message: string;
  type: ToastType = ToastType.Info;
  elapsedTime: number = 0;
  totalTime: number = 4000;

  constructor(message: string, type?: ToastType, totalTime?: number) {
    this.message = message;
    this.type = type ?? this.type;
    this.totalTime = totalTime ?? this.totalTime;
  }
}

export const useToastStore = defineStore("toast", () => {
  // State
  const list = ref([] as ToastProperties[]);

  // Actions
  function addToast(toastData: ToastProperties) {
    list.value.push(toastData);
  }
  function incrementToastTimes(time: number) {
    list.value.forEach((x) => (x.elapsedTime += time));
    list.value = list.value.filter((x) => x.elapsedTime < x.totalTime + time);
  }

  return { list, addToast, incrementToastTimes };
});
