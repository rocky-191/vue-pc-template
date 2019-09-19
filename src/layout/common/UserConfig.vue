<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link user">
      <img :src="$store.state.commonStore.user.photoSmall" alt="用户头像" />
      <span class="user-name">{{ $store.state.commonStore.user.name }}</span>
      <i
        class="iconfont elxialaxuanze"
        style="width: 10px; height: 6px; color: #959ba7;"
      ></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="changePwd">更换密码</el-dropdown-item>
      <el-dropdown-item command="loginOut">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "UserConfig",
  methods: {
    handleCommand(command) {
      // console.log(command);
      if (command === "changePwd") {
        console.log("修改密码");
      } else if (command === "loginOut") {
        this.loginOut();
      }
    },
    loginOut() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  outline: none;
  .user-name {
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
