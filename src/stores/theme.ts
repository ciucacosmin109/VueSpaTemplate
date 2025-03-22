import { ref } from "vue";
import { defineStore } from "pinia";
import { useTheme } from "vuetify";

export class Theme {
  name!: string;
  cssClass!: string;
  bootstrapColorMode!: string;
  vuetifyThemeName!: string;

  constructor(data: Theme) {
    Object.assign(this, data);
  }
}

const allThemes = [
  new Theme({
    name: "Default theme",
    cssClass: "light-theme",
    bootstrapColorMode: "light",
    vuetifyThemeName: "light",
  }),
  new Theme({
    name: "Dark theme",
    cssClass: "dark-theme",
    bootstrapColorMode: "dark",
    vuetifyThemeName: "dark",
  }),
];

export const useThemeStore = defineStore("theme", () => {
  // State
  const currentTheme = ref(allThemes[0]);
  const vuetiyThemeStore = useTheme();

  // Actions
  function changeTheme(themeName: string) {
    currentTheme.value = allThemes.find((x) => x.name === themeName) ?? allThemes[0];
    vuetiyThemeStore.global.name.value = currentTheme.value.vuetifyThemeName;
  }

  return { allThemes, currentTheme, changeTheme };
});
