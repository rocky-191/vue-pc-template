import loading from "./loading";
import fontlib from "./fontlib";
// 引入混入对象文件

let mixins = [
  // 混入注册
  // 混入了 ld_open、ld_close方法 及 ld_open_sign 数据 ，使用下划线写法，以区分页面数据防止字段重复
  loading,
  fontlib
];

// 混入规则 -- 慎用全局混入

// 1、数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

// 2、同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

// 3、值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

export default function(Vue) {
  mixins.map(mixin => {
    Vue.mixin(mixin);
  });
}
