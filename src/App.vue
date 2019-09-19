<template>
  <div id="app" style="height: 100%;">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100% !important;
}
body {
  // min-width: 1200px;
  margin: 0 auto;
  overflow: auto;
  background: #e6e9f1;
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
