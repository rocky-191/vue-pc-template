<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
  </div>
</template>

<style lang="scss">
body {
  // min-width: 1200px;
  margin: 0 auto;
  overflow: auto;
  // overflow-y: hidden;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-track {
  border-radius: 3px;
  // background-color: rgba(255, 255, 255, 1);
  background: transparent;
}

:hover::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(177, 182, 199, 0.849);
}
</style>
