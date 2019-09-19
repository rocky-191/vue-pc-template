/* eslint-disable no-undef */
import Vue from "vue";
import Router from "vue-router";
import Login from "./Login";

Vue.use(Router);

let myRoutes = [];

// eslint-disable-next-line no-undef
// const routerContext = require.context("./", true, /index\.js$/);
const routerContext = require.context("../views", true, /routes\.js$/); //自动扫描views文件夹下的路由文件routes.js
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith("./index") || route.startsWith("./Login")) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  myRoutes = [...myRoutes, ...(routerModule.default || routerModule)];
});

export default new Router({
  routes: [
    ...Login,
    {
      path: "/index",
      name: "index",
      component: () => import("@/views"),
      children: [...myRoutes]
      // meta: {
      //   requireAuth: true
      // }
    },
    {
      path: "**",
      name: "404",
      component: () => import("@/views/Error/404")
    }
  ]
});
