const storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, val) {
    window.localStorage.setItem(
      key,
      typeof val !== "string" ? JSON.stringify(val) : val
    );
  },
  del(key) {
    window.localStorage.removeItem(key);
  },
  cle() {
    window.localStorage.clear();
  }
};
export default storage;

//vuex刷新问题处理方案，有兼容性问题IE
export const storeMaker = state => {
  // 初始化
  Object.keys(state).map(key => {
    // 判断类型获取本地存储数据
    if (typeof state[key] === "object") {
      if (
        sessionStorage.getItem(key) &&
        JSON.parse(sessionStorage.getItem(key))
      ) {
        state[key] = JSON.parse(sessionStorage.getItem(key));
      }
    } else if (typeof state[key] === "number") {
      if (
        sessionStorage.getItem(key) &&
        parseInt(sessionStorage.getItem(key))
      ) {
        state[key] = parseInt(sessionStorage.getItem(key));
      }
    } else {
      if (sessionStorage.getItem(key)) {
        state[key] = sessionStorage.getItem(key);
      }
    }
  });

  // 重写set处理
  return new Proxy(state, {
    set: function(target, key, value) {
      let temp = value;
      if (typeof temp === "object") {
        temp = JSON.stringify(temp);
      }

      sessionStorage.setItem(key, temp);
      return Reflect.set(target, key, value);
    }
  });
};
