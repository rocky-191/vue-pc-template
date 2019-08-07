import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import mixins from '@/mixins';
import router from "@/router";
import store from "@/store";
// import axios from "axios";
// import "@/request/axios";
import "@/components";

import * as filters from "@/filters"; // 全局 filters

import directives from "@/directives";
Vue.use(directives); // 注册全局指令
Vue.use(ElementUI);
Vue.config.productionTip = false;

// Vue.prototype.$http = axios;
//引入全局文件
import globalAPI from "@/utils/globalAPI.js";
Vue.prototype.globalAPI = globalAPI;

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

 // 混入会占用 Vue 组件的命名属性，内部重复命名会覆写混入的方法
 // 这里混入了 gf 方法
Vue.use(mixins);

console.log(process.env)

// Vue.prototype.$Base_url = window.location.protocol + "//" + window.location.host;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
