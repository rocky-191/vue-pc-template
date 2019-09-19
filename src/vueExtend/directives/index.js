/* eslint-disable no-unused-vars */
export default Vue => {
  Vue.directive("filterSpecialChar", {
    update(el, { value, modifiers }, vnode) {
      try {
        if (!el.value) {
          return false;
        }
        // eslint-disable-next-line no-useless-escape
        el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "");
        el.dispatchEvent(new Event(modifiers.lazy ? "change" : "input"));
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  });
};
