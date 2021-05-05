import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

// Registering a custom global directive called `v-blur` that prevents focus
// Useful for removing focus from vuetify components after they are clicked
Vue.directive("blur", {
  inserted: function(el) {
    el.onfocus = ev => ev.target.blur();
  }
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
