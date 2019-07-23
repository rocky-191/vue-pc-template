export default Vue => {
  Vue.directive("filterSpecialChar", {
    update(el, { value, modifiers }, vnode) {
      try {
        if (!el.value) {
          return false;
        }
        el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "");
        el.dispatchEvent(new Event(modifiers.lazy ? "change" : "input"));
      } catch (e) {}
    }
  });
};
