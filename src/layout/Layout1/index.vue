<template>
  <div>
    <div class="page-header">
      <span class="sys-title">
        <img :src="$store.state.commonStore.logoSrc" alt />
        {{ $store.state.commonStore.projectName }}
      </span>
      <el-menu
        :default-active="activeIndex"
        router
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#18243C"
        text-color="#959BA7"
        active-text-color="#FFFFFF"
      >
        <template v-for="item in menuData">
          <el-submenu
            v-if="item.children.length !== 0"
            :key="item.index"
            :index="item.url"
          >
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                :index="subItem.url"
                :key="subItem.index"
                v-if="subItem.children.length !== 0"
              >
                <template slot="title">{{ subItem.name }}</template>
                <!-- <el-menu-item :id="subItem.url">
                  {{ subItem.name }}
                </el-menu-item>-->

                <template v-for="subChildItem in subItem.children">
                  <el-submenu
                    :index="subChildItem.url"
                    :key="subChildItem.index"
                    v-if="subChildItem.children.length !== 0"
                  >
                    <template slot="title">{{ subChildItem.name }}</template>
                    <el-menu-item :id="subChildItem.url">{{
                      subChildItem.name
                    }}</el-menu-item>
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :index="subChildItem.url"
                    :key="subChildItem.index"
                    >{{ subChildItem.name }}</el-menu-item
                  >
                </template>
              </el-submenu>
              <el-menu-item v-else :index="subItem.url" :key="subItem.index">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="item.index" :index="item.url">{{
            item.name
          }}</el-menu-item>
        </template>
      </el-menu>
      <span>
        <i class="iconfont elxiaoxi icon-sy"></i>
        <i class="iconfont elshezhi icon-sy"></i>
      </span>
      <div>
        <span class="shu-line"></span>
        <user-config />
      </div>
    </div>
    <div class="page-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如详情B页面-->
      </router-view>
    </div>
  </div>
</template>

<script>
import layoutMixins from "@/mixins/layoutMixins";
import UserConfig from "../common/UserConfig";
export default {
  name: "Layout1",
  mixins: [layoutMixins],
  components: {
    UserConfig
  },
  props: {
    menuData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-header {
  height: 70px;
  background: #18243c;
  box-sizing: border-box;
  padding: 0 32px 0 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sys-title {
    color: #ffffff;
    font-size: 30px;
  }

  /deep/ .el-menu-item,
  /deep/ .el-submenu__title {
    border-bottom: none;
    height: 70px;
    line-height: 70px;
  }

  .el-submenu.is-active {
    /deep/ .el-submenu__title {
      border-bottom: none !important;
      line-height: 70px !important;
      height: 70px !important;
    }
  }
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}

.page-content {
  padding: 10px;
}

.icon-sy {
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #959ba7;
  margin-left: 20px;
  cursor: pointer;
}

.shu-line {
  display: inline-block;
  width: 1px;
  height: 70px;
  background: #364156;
  vertical-align: middle;
  margin-right: 20px;
}

.return {
  color: #515a6d;
  font-size: 14px;
  cursor: pointer;
  i {
    color: #959ba7;
    margin-right: 5px;
  }
}
</style>
