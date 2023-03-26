import { defineStore } from "pinia";

export class RouterLocation {
  name: string;
  params?: unknown;
  query?: unknown;

  constructor(name: string, params?: unknown, query?: unknown) {
    this.name = name;
    this.params = params;
    this.query = query;
  }
}

export class BreadcrumbItem {
  text: string;

  backOffset?: number;
  location?: RouterLocation;
  clickCallback?: () => void;

  constructor(text: string) {
    this.text = text;
  }
}

// Define the store
export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: () => {
    return {
      path: [] as BreadcrumbItem[],
    };
  },
  getters: {
    pathString(): string {
      if (this.path.length === 0) {
        return "";
      }
      return this.path.join("/");
    },
  },
  actions: {
    clear() {
      this.path = [];
    },
    remove(items: number) {
      if (items >= this.path.length) {
        this.clear();
        return;
      }
      this.path.splice(items);
    },

    append(text: string) {
      const item = new BreadcrumbItem(text);
      this.path.push(item);
    },
    appendWithBack(text: string, back: number) {
      const item = new BreadcrumbItem(text);
      item.backOffset = back;
      this.path.push(item);
    },
    appendWithLocation(text: string, location: RouterLocation) {
      const item = new BreadcrumbItem(text);
      item.location = location;
      this.path.push(item);
    },
    appendWithClickHandler(text: string, clickCallback?: () => void) {
      const item = new BreadcrumbItem(text);
      item.clickCallback = clickCallback;
      this.path.push(item);
    },

    updateIndex(index: number, updateFunction: (item: BreadcrumbItem) => void) {
      if (index >= this.path.length) {
        return;
      }
      updateFunction(this.path[index]);
    },
  },
});
