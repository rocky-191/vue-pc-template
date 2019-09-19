<template>
  <div class="height100">
    <el-container class="height100">
      <el-header>
        <div class="page-header">
          <!-- <span class="sys-title">
            <img :src="$store.state.commonStore.logoSrc" alt />
            {{ $store.state.commonStore.projectName }}
          </span>-->
          <sys-title />
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#18243c"
            text-color="#959ba7"
            active-text-color="#ffffff"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="item in firstMenuData"
              :key="item.index"
              :index="item.index"
              >{{ item.name }}</el-menu-item
            >
          </el-menu>
          <div>
            <span class="shu-line"></span>
            <user-config />
          </div>
        </div>
      </el-header>
      <el-container class="minHeight">
        <el-aside width="240px">
          <el-menu
            :default-active="secondActiveIndex"
            class="el-menu-vertical-demo"
            router
            :unique-opened="true"
            :default-openeds="defaultOpen"
            @open="handleOpen"
            @close="handleClose"
            background-color="#24324d"
            text-color="#959ba7"
            active-text-color="#ffffff"
          >
            <template v-for="item in resolvedSecondMenuData">
              <el-submenu
                v-if="item.children.length !== 0"
                :key="item.index"
                :index="item.url"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span style="font-size: 16px;">{{ item.name }}</span>
                </template>

                <template v-for="subItem in item.children">
                  <el-submenu
                    :index="subItem.url"
                    :key="subItem.index"
                    v-if="subItem.children.length !== 0"
                  >
                    <template slot="title">{{ subItem.name }}</template>
                    <el-menu-item :id="subItem.url">{{
                      subItem.name
                    }}</el-menu-item>
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :index="subItem.url"
                    :key="subItem.index"
                    >{{ subItem.name }}</el-menu-item
                  >
                </template>
              </el-submenu>
              <el-menu-item v-else :key="item.index" :index="item.url">
                <i :class="item.icon"></i>
                {{ item.name }}
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
            </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，比如详情B页面-->
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import layoutMixins from "@/mixins/layoutMixins";
import UserConfig from "../common/UserConfig";
import SysTitle from "../common/SysTitle";
export default {
  name: "Layout2",
  components: {
    UserConfig,
    SysTitle
  },
  mixins: [layoutMixins],
  computed: {
    secondActiveIndex() {
      return this.$route.path;
    }
  },
  props: {
    firstMenuData: {
      type: Array,
      default() {
        return [];
      }
    },
    secondMenuData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      activeIndex: "1",
      // secondActiveIndex: "",
      resolvedSecondMenuData: [],
      breadData: [],
      defaultOpen: []
    };
  },
  watch: {
    firstMenuData(val) {
      this.activeIndex = val[0].index;
      this.handleSelect(this.activeIndex, 2);
    }
  },
  mounted() {
    // this.activeIndex = this.firstMenuData[0].index;
    // this.handleSelect(this.activeIndex);
    this.$nextTick(() => {
      this.activeIndex =
        this.$route.path === "/index"
          ? this.firstMenuData[0].index
          : sessionStorage.getItem("activeIndex") ||
            this.firstMenuData[0].index;
      //console.log(JSON.stringify(this.firstMenuData));

      this.handleSelect(this.activeIndex, 2);
    });
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, flag) {
      this.resolvedSecondMenuData.splice(0);
      this.secondMenuData.forEach(item => {
        if (this.handleIndex(item.index) === key) {
          this.resolvedSecondMenuData.push(item);
        }
      });
      // 存储激活的头部菜单
      sessionStorage.setItem("activeIndex", key);
      if (flag !== 2 || this.$route.path === "/index") {
        let secondMenu = this.resolvedSecondMenuData[0].children[0].url;
        this.$router.push({
          path: secondMenu
        });
      }
      // 默认打开暂时注释，之后放开
      // if (key !== "1" && key != 3) {
      //   //this.secondActiveIndex = this.resolvedSecondMenuData[0].children[0].url;
      //   let path = this.resolvedSecondMenuData[0].children[0].url;
      //   this.$router.push({
      //     path: path
      //   });
      //   //this.defaultOpen.push(this.resolvedSecondMenuData[0].url);
      // }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectMenu(key, keyPath) {
      // console.log(key, keyPath);
      // console.log(JSON.stringify(this.resolvedSecondMenuData));
      this.breadData.splice(0);
      let objMenu = this.resolvedSecondMenuData.filter(item => {
        return item.url === keyPath[0];
      });
      objMenu[0].children &&
        objMenu[0].children.forEach(item => {
          if (item.url === keyPath[1]) {
            this.breadData.push({ url: item.url, name: item.name });
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
$primary-color: #3883f8;

.height100 {
  height: 100%;
}
.minHeight {
  height: calc(100% - 70px);
}
.el-header {
  padding: 0;
  height: 70px !important;
  .el-menu {
    border-right: none;
    background: transparent;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    &.is-active {
      border-bottom: 2px solid $primary-color !important;
      background: #38455e !important;
    }
  }
}

.el-main {
  padding: 10px;
  height: calc(100% - 0);
  position: relative;
  box-sizing: border-box;
}

.el-aside {
  background: #24324d;
  height: calc(100% - 0);
  .el-menu {
    border-right: none;
  }
  .el-submenu {
    &.is-active {
      span {
        color: #ffffff !important;
      }
    }
  }

  .item-circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #959ba7;
    border-radius: 100%;
  }

  .el-menu-item {
    border-left: 4px solid transparent;
    &.is-active {
      background: #38455e !important;
      border-left: 4px solid $primary-color;
      .item-circle {
        background: #ffffff;
      }
    }
  }
}

.page-header {
  height: 70px;
  background: #18243c;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
