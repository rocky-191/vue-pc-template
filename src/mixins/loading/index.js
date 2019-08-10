const load_option = {
  // 配置初始参数
  lock: true,
  text: "努力加载中。。。",
  spinner: undefined,
  background: "rgba(255, 255, 255, 0.8)"
};
function ld_open(option) {
  // 方法复写到外部，防止混入过大方法内存
  // option 参数参考  element-ui loading 功能设置的参数
  // 注意： 这里 target 参数经过修改，可以传入 ref 对象
  try {
    let name,
      load_o = {
        ...load_option,
        ...option
      };
    console.log(option);
    if (load_o.target) {
      if (typeof option.target == "string") {
        name = option.target;
        load_o.target = option.target;
      } else if (typeof option.target == "object" && option.target._isVue) {
        let componentName = option.target.$options.name;
        if (["ElButton"].indexOf(componentName) > -1) {
          option.target._props.loading = true;
        } else {
          name = option.target._uid;
          load_o.target = option.target.$el;
        }
      } else if (option.target instanceof HTMLElement) {
        // 这里写入了一个domAttr，以确认关闭时是否正确
        name = `${option.target.nodeName}_${
          option.target.className
        }_ld_open_sign_${new Date().getTime()}`;
        let typ = document.createAttribute("ld_open_sign");
        typ.nodeValue = name;
        option.target.attributes.setNamedItem(typ);
        load_o.target = option.target;
      } else {
        console.log("target 参数错误");
        return false;
      }
    }
    if (!this.$loading) {
      console.log("本功能基于element-ui实现，请加载element-ui组件");
      return false;
    }
    if (option.target) {
    } else if (option.fullscreen) {
      name = "fullscreen";
    } else if (option.body) {
      name = "body";
    }
    if (name) this.ld_open_sign[name] = this.$loading(load_o);
  } catch (error) {
    console.log(option);
    console.log(error);
  }
}
function ld_close(option) {
  // 方法复写到外部，防止混入过大方法内存
  // option 参数参考  element-ui loading 功能设置的参数
  // 但只需要传递 打开loading时设置的 target、fullscreen、body 三个参数，假如设置时没有传则不需要
  try {
    let name;
    if (option.target) {
      if (typeof option.target == "string") {
        name = option.target;
      } else if (typeof option.target == "object" && option.target._isVue) {
        let componentName = option.target.$options.name;
        if (["ElButton", "ElInput", "ElSelect"].indexOf(componentName) > -1) {
          option.target._props.loading = false;
        } else {
          name = option.target._uid;
        }
      } else if (option.target instanceof HTMLElement) {
        // 这里写入了一个domAttr，关闭时验证是否正确
        name = option.target.attributes.getNamedItem("ld_open_sign")
          .textContent;
        option.target.attributes.removeNamedItem("ld_open_sign");
      } else {
        console.log("target 参数错误");
        return false;
      }
    }
    if (option.target) {
    } else if (option.fullscreen) {
      name = "fullscreen";
    } else if (option.body) {
      name = "body";
    }
    if (name) {
      this.ld_open_sign[name] && this.ld_open_sign[name].close();
      this.ld_open_sign[name] = undefined;
    }
  } catch (error) {
    console.log(option);
    console.log(error);
  }
}

export default {
  // 抛出混入对象
  data: function() {
    return {
      ld_open_sign: {} // 存储loading开启时的对象, 因为开启loading时，非全屏可以开启多个，所以缓存到各自组件
    };
  },
  methods: {
    ld_open(option) {
      // 配置初始参数， 传入 element-ui loading 功能设置的参数
      // option 参数参考  element-ui loading 功能设置的参数
      // 注意： 这里 target 参数经过修改，可以传入 ref 对象
      ld_open.call(this, option);
    },
    ld_close(option) {
      // 关闭loading 并清除 loading对象缓存
      // option 参数参考  element-ui loading 功能设置的参数
      // 但只需要传递 打开loading时设置的 target、fullscreen、body 三个参数，假如设置时没有传则不需要
      ld_close.call(this, option);
    }
  }
};
