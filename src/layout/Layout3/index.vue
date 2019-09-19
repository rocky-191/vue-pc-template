<template>
  <div class="height100">
    <el-container class="height100">
      <el-header>
        <div class="page-header">
          <span class="sys-title">
            <img :src="$store.state.commonStore.logoSrc" alt />
            {{ $store.state.commonStore.projectName }}
          </span>
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
              :index="item.url"
              >{{ item.name }}</el-menu-item
            >
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
      </el-header>
      <el-container>
        <el-aside width="240px">
          <el-menu
            :default-active="secondActiveIndex"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#24324d"
            text-color="#959ba7"
            active-text-color="#ffffff"
            @select="handleSelectSecondMenu"
          >
            <el-menu-item
              v-for="item in resolvedSecondMenuData"
              :key="item.index"
              :index="item.url"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="page-breadcrumb">
            <el-menu
              :default-active="thirdActiveIndex"
              router
              class="el-menu-demo"
              mode="horizontal"
              background-color="#ffffff"
              text-color="#515a6d"
              active-text-color="#3883f8"
            >
              <el-menu-item
                v-for="item in resolvedthirdMenuData"
                :key="item.index"
                :index="item.url"
                >{{ item.name }}</el-menu-item
              >
            </el-menu>
            <!-- <span class="return"> <i class="iconfont elfanhui"></i>返回 </span> -->
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutMixins from "@/mixins/layoutMixins";
import UserConfig from "../common/UserConfig";
export default {
  name: "Layout3",
  mixins: [layoutMixins],
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
    },
    thirdMenuData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    UserConfig
  },
  data() {
    return {
      activeIndex: "1",
      secondActiveIndex: "1-1",
      thirdActiveIndex: "1-1-1",
      resolvedSecondMenuData: [],
      resolvedthirdMenuData: []
    };
  },
  mounted() {
    //console.log(JSON.stringify(this.secondMenuData));
    this.activeIndex = this.firstMenuData[0].index;
    this.handleSelect(this.activeIndex);
    this.handleSelectSecondMenu(this.secondActiveIndex, [
      this.secondActiveIndex
    ]);
  },
  methods: {
    handleSelect(key) {
      this.resolvedSecondMenuData.splice(0);
      this.secondMenuData.forEach(item => {
        if (this.handleIndex(item.index) === key) {
          this.resolvedSecondMenuData.push(item);
        }
      });
      this.secondActiveIndex = this.resolvedSecondMenuData[0].index;
    },
    handleSelectSecondMenu(key, keyPath) {
      // console.log(key, keyPath);
      this.resolvedthirdMenuData.splice(0);
      this.thirdMenuData.forEach(item => {
        if (item.index.indexOf(keyPath.join("")) === 0) {
          this.resolvedthirdMenuData.push(item);
        }
      });
      this.thirdActiveIndex = this.resolvedthirdMenuData[0].url;
      this.$router.push({
        path: this.resolvedthirdMenuData[0].url
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
$primary-color: #3883f8;

.height100 {
  height: 100%;
}

.el-header {
  padding: 0;
  height: 70px !important;
  .el-menu {
    background: transparent;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item {
    height: 70px;
    line-height: 70px;
    &.is-active {
      border-bottom: 2px solid $primary-color !important;
      background: #38455e !important;
    }
  }
}

.el-main {
  padding: 0;
}

.page-content {
  padding: 10px;
}

.el-aside {
  background: #24324d;
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
  padding: 0 32px 0 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sys-title {
    color: #ffffff;
    font-size: 30px;
  }
  .tab-ul {
    display: flex;
    li {
      width: 140px;
      height: 66px;
      line-height: 66px;
      color: #959ba7;
      font-size: 18px;
      border-bottom: 4px solid transparent;
      text-align: center;
      cursor: pointer;
      &.actived-li {
        color: #ffffff;
        border-bottom: 4px solid $primary-color;
      }
    }
  }
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

.page-breadcrumb {
  height: 50px;
  background: #ffffff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-menu {
    background: transparent;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item {
    height: 50px;
    line-height: 50px;
    &.is-active {
      border-bottom: 2px solid $primary-color !important;
    }
  }
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
