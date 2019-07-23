import Vue from "vue";
import App from "./App.vue";
import "./assets/css/myReset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index.js";
import store from "./store/index.js";
import axios from "axios";
import "./request/axios";
import "@/components";

import * as filters from "./filters"; // 全局 filters

import directives from "@/directives/directives.js";
Vue.use(directives); // 注册全局指令
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
//引入全局文件
import globalAPI from "./utils/globalAPI";
Vue.prototype.globalAPI = globalAPI;

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.$Base_url =
  window.location.protocol + "//" + window.location.host;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
