import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export class Theme {
  name!: string;
  cssClass!: string;
  bootstrapColorMode!: string;

  constructor(data: Theme) {
    Object.assign(this, data);
  }
}

const allThemes = [
  new Theme({
    name: "Default theme",
    cssClass: "light-theme",
    bootstrapColorMode: "light",
  }),
  new Theme({
    name: "Dark theme",
    cssClass: "dark-theme",
    bootstrapColorMode: "dark",
  }),
  new Theme({
    name: "Blue theme",
    cssClass: "blue-theme",
    bootstrapColorMode: "blue",
  }),
]

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref(allThemes[1]);
  
  // Actions
  function changeTheme(themeName: string) {
    currentTheme.value = allThemes.find(x => x.name === themeName) ?? allThemes[0];
  }

  return { allThemes, currentTheme, changeTheme };
})
