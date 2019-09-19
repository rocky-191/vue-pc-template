<template>
  <div class="height100">
    <div v-show="$store.state.commonStore.isAdmin">
      <el-select
        v-model="themeType"
        placeholder="请选择主题"
        @change="changeTheme"
      >
        <el-option
          v-for="item in themeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="layoutValue"
        placeholder="请选择布局类型"
        @change="changeLayout"
      >
        <el-option
          v-for="item in layoutOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <template v-if="layoutValue === 1">
      <layout1 :menuData="menuData" />
    </template>
    <template v-else-if="layoutValue === 2">
      <layout2
        :firstMenuData="firstMenuData"
        :secondMenuData="secondMenuData"
      />
    </template>
    <template v-else-if="layoutValue === 3">
      <layout3
        :firstMenuData="firstMenuData"
        :secondMenuData="secondMenuData"
        :thirdMenuData="thirdMenuData"
      />
    </template>
    <template v-else-if="layoutValue === 4">
      <layout4
        :firstMenuData="firstMenuData"
        :secondMenuData="secondMenuData"
      />
    </template>
  </div>
</template>

<script>
import Layout1 from "@/layout/Layout1";
import Layout2 from "@/layout/Layout2";
import Layout3 from "@/layout/Layout3";
import Layout4 from "@/layout/Layout4";
import menuMixins from "@/mixins/menuMixins";

export default {
  name: "Home",
  mixins: [menuMixins],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Layout1,
    // eslint-disable-next-line vue/no-unused-components
    Layout2,
    // eslint-disable-next-line vue/no-unused-components
    Layout3,
    // eslint-disable-next-line vue/no-unused-components
    Layout4
  },
  data() {
    return {
      themeOptions: [
        {
          value: "theme1",
          label: "主题1"
        },
        {
          value: "theme2",
          label: "主题2"
        }
      ],
      layoutOptions: [
        {
          value: 1,
          label: "布局1"
        },
        {
          value: 2,
          label: "布局2"
        },
        {
          value: 3,
          label: "布局3"
        },
        {
          value: 4,
          label: "布局4"
        }
      ],
      menuData: [],
      firstMenuData: [],
      secondMenuData: [],
      thirdMenuData: [],
      centerDialogVisible: false,
      centerDialogVisible1: false,
      dialogInfo: [
        {
          title: "事件标题",
          text: "台风“利奇马”突发事件"
        },
        {
          title: "事件类型",
          text: "自然灾害"
        },
        {
          title: "事件等级",
          text: "2级"
        },
        {
          title: "发生时间",
          text: "2019-08-11 20:50:00"
        },
        {
          title: "发生地点",
          text: "山东省威海市环翠区"
        },
        {
          title: "报送部门",
          text: "气象局"
        },
        {
          title: "报送时间",
          text: "2019-08-11 21:10:00"
        }
      ],
      dialogInfo1: {}
    };
  },
  computed: {
    layoutValue: {
      get() {
        return this.$store.state.commonStore.layoutValue;
      },
      set(val) {
        this.$store.commit("commonStore/setLayoutValue", val);
      }
    },
    themeType: {
      get() {
        return this.$store.state.commonStore.themeColor;
      },
      set(val) {
        this.$store.commit("commonStore/setThemeColor", val);
      }
    }
  },
  watch: {
    themeType: {
      handler() {
        this.toggle();
      }
    },
    layoutValue: {
      handler(newVal) {
        this.firstMenuData.splice(0);
        this.secondMenuData.splice(0);
        this.thirdMenuData.splice(0);
        switch (newVal) {
          case 1:
            this.menuData = this.menuLevel;
            break;
          case 2:
          case 3:
          case 4:
            this.handleMenuData(this.menuLevel);
            break;
          default:
            break;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.toggle();
  },
  methods: {
    toggle() {
      let stylesheetPath = `/theme/${
        this.$store.state.commonStore.themeColor
      }.css`;
      let themeLink = document.querySelector('link[name="theme"]');
      themeLink.setAttribute("href", stylesheetPath);
    },
    changeTheme(val) {
      this.themeType = val;
    },
    changeLayout(val) {
      this.layoutValue = val;
    },
    handleMenuData(data) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].level === 1) {
          this.firstMenuData.push(data[i]);
        }
        if (data[i].level === 2) {
          this.secondMenuData.push(data[i]);
        }
        if (data[i].level === 3) {
          this.thirdMenuData.push(data[i]);
        }
        if (data[i].children) {
          this.handleMenuData(data[i].children);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.height100 {
  height: 100%;
}

.info-dialog {
  .info-title {
    font-size: 16px;
    color: #18243c;
    margin-bottom: 13px;
    font-weight: 600;
    padding-left: 5px;
  }
  .el-row {
    margin-bottom: 13px;
    font-size: 14px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .row-title {
    text-align: right;
    color: #18243c;
    padding-right: 19px;
    font-weight: 600;
  }
  .row-text {
    color: #515a6d;
  }
}
</style>
