<template>
  <div class="height100">
    <el-container class="height100">
      <el-aside width="280px">
        <el-header>
          <div class="page-header">
            <span class="sys-title">
              <img :src="$store.state.commonStore.logoSrc" alt />
              {{ $store.state.commonStore.projectName }}
            </span>
          </div>
        </el-header>
        <el-container class="calc-height100">
          <el-aside width="60px">
            <div class="side-menu1 height100">
              <div>
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-vertical-demo"
                  background-color="#24324d"
                  text-color="#959ba7"
                  active-text-color="#ffffff"
                  @select="handleSelect"
                >
                  <el-menu-item
                    v-for="item in firstMenuData"
                    :key="item.index"
                    :index="item.url"
                  >
                    <i :class="item.icon"></i>
                  </el-menu-item>
                </el-menu>
              </div>
              <div>
                <i class="iconfont fwxiaoxi icon-sy"></i>
                <i class="iconfont fwshezhi icon-sy"></i>
                <img
                  :src="$store.state.commonStore.user.photoSmall"
                  class="user-image"
                  alt="用户头像"
                />
              </div>
            </div>
          </el-aside>
          <el-main class="side-menu2">
            <el-menu
              :default-active="secondActiveIndex"
              router
              :unique-opened="true"
              :default-openeds="defaultOpen"
              class="el-menu-vertical-demo"
              background-color="#37445d"
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
                    <!-- <i :class="item.icon"></i> -->
                    <span>{{ item.name }}</span>
                  </template>

                  <template v-for="subItem in item.children">
                    <el-submenu
                      :index="subItem.index"
                      :key="subItem.url"
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
                    >
                      <span class="item-circle"></span>
                      {{ subItem.name }}
                    </el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-else :key="item.index" :index="item.url">
                  <!-- <i :class="item.icon"></i> -->
                  {{ item.name }}
                </el-menu-item>
              </template>
            </el-menu>
          </el-main>
        </el-container>
      </el-aside>
      <el-main class="page-content">
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
  </div>
</template>

<script>
import layoutMixins from "@/mixins/layoutMixins";
export default {
  name: "Layout4",
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
    }
  },
  data() {
    return {
      activeIndex: "1",
      secondActiveIndex: "1-1",
      resolvedSecondMenuData: [],
      defaultOpen: []
    };
  },
  mounted() {
    this.activeIndex = this.firstMenuData[0].index;
    this.handleSelect(this.activeIndex);
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {
      this.resolvedSecondMenuData.splice(0);
      //console.log(key, keyPath);
      this.secondMenuData.forEach(item => {
        if (this.handleIndex(item.index) === key) {
          this.resolvedSecondMenuData.push(item);
        }
      });
      this.secondActiveIndex = this.resolvedSecondMenuData[0].children[0].url;
      this.$router.push({
        path: this.secondActiveIndex
      });
      this.defaultOpen.push(this.resolvedSecondMenuData[0].url);
    }
  }
};
</script>
<style lang="scss" scoped>
$primary-color: #3883f8;

.height100 {
  height: 100%;
}

.calc-height100 {
  height: calc(100% - 60px);
}

.el-header {
  padding: 0;
}

.page-content {
  padding: 10px;
}

.el-menu {
  border-right: none;
}

.page-header {
  height: 60px;
  background: #18243c;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sys-title {
    color: #ffffff;
    font-size: 24px;
  }
}

.side-menu1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #24324d;
  .el-submenu {
    &.is-active {
      span {
        color: #ffffff !important;
      }
    }
  }
  .el-menu-item {
    width: 60px;
    border-left: 4px solid transparent;
    &.is-active {
      background: #38455e !important;
      border-left: 4px solid $primary-color;
    }
  }
}

.icon-sy {
  display: block;
  font-size: 20px;
  width: 20px;
  height: 20px;
  color: #959ba7;
  margin: 20px auto;
  cursor: pointer;
}

.user-image {
  display: block;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  margin: 10px auto;
}

.el-main.side-menu2 {
  padding: 20px 0 20px 20px;
  background: #37445d;
  .item-circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #959ba7;
    border-radius: 100%;
  }

  .el-menu-item {
    &.is-active {
      .item-circle {
        background: #ffffff;
      }
    }
  }
}
</style>
