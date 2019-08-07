import Vue from "vue";
import Router from "vue-router";
import Login from "./Login";

Vue.use(Router);

export default new Router({
  routes: [
    ...Login,
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue")
    }
  ]
});
