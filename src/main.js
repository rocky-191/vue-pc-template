// import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import routeBeforeHook from "@/vueExtend/hooks/routerHook";

import "@/assets/icon/iconfont.css";
import "@/assets/icon/iconfont.js";

import mixins from "@/mixins";
import router from "@/router";
import store from "@/store";
// import axios from "axios";
// import "@/request/axios";
import "@/components";

Vue.use(ElementUI);
import * as filters from "@/vueExtend/filters"; // 全局 filters

import directives from "@/vueExtend/directives";
Vue.use(directives); // 注册全局指令
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

// eslint-disable-next-line no-undef
console.log(process.env);

// Vue.prototype.$Base_url = window.location.protocol + "//" + window.location.host;
routeBeforeHook(router); //路由鉴权

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
