import { createApp } from "vue";
import { createPinia } from "pinia";
import { emitterPlugin } from "./plugins/eventBus/eventBus";
import { toasterPlugin } from "./plugins/toaster/toaster";

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

// Create Vue 3 app
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(emitterPlugin);
app.use(toasterPlugin);

app.mount("#app");
