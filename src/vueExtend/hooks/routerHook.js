const routeBeforeHook = router => {
  // 判断是否有权限 路由跳转
  router.beforeEach((to, from, next) => {
    if (to.fullPath == "/") {
      // debugger
      localStorage.removeItem("Authorization");
      // localStorage.removeItem('token');
    }
    if (to.matched.some(record => record.meta.requireAuth)) {
      // 判断该路由是否需要登录权限
      console.log("需要登录");
      if (
        localStorage.Authorization != null &&
        localStorage.Authorization != ""
      ) {
        // 判断当前的token是否存在 ； 登录存入的token
        next();
      } else {
        next({
          path: "/",
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
        localStorage.removeItem("Authorization");
        // localStorage.removeItem('token');
      }
    } else {
      next();
    }
  });
};

export default routeBeforeHook;
