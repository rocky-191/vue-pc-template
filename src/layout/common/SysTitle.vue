<template>
  <div class="sys-title">
    <!-- <img :src="$store.state.commonStore.disposeList.logoKey" alt /> -->
    {{ $store.state.commonStore.projectName }}
  </div>
</template>

<script>
export default {
  name: "SysTitle"
};
</script>

<style lang="scss" scoped>
.sys-title {
  color: #ffffff;
  font-size: 30px;
}
</style>
