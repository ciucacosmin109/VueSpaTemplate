import { createApp } from "vue";
import { createPinia } from "pinia";
import { emitterPlugin } from "./plugins/eventBus/eventBus";
import { toasterPlugin } from "./plugins/toaster/toaster";
import { popupPlugin } from "./plugins/popup/popup";
import { breadcrumbPlugin } from "./plugins/breadcrumb/breadcrumb";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";
// import { VDataTable } from "vuetify/labs/VDataTable";
import { aliases, fa } from "vuetify/iconsets/fa";
//import { mdi } from "vuetify/lib/iconsets/mdi"; // https://www.the-koi.com/projects/how-to-set-up-a-project-with-nuxt3-and-vuetify3-with-a-quick-overview/
//import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

// Bootstrap + Font awesome + Animations
import "./styles/bootstrap";
import "./styles/fontawesome";
import "./styles/animations";

// Theme files (+ Base css files)
import "./assets/main.css";
import "./styles/themes/all.scss";

// Others
import App from "./App.vue";
import router from "./router";

// Init pinia
const pinia = createPinia();

// Vuetify
const vuetify = createVuetify({
  // components: {
  //   ...components,
  //   VDataTable,
  // },
  // directives: directives,
  theme: { defaultTheme: "dark" },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      //mdi, // "@mdi/font": "^7.1.96",
      fa,
    },
  },
});

// Create Vue 3 app
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);

app.use(emitterPlugin);
app.use(toasterPlugin);
app.use(popupPlugin);
app.use(breadcrumbPlugin);

app.mount("#app");
