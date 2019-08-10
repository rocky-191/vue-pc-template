import { Loading } from "element-ui";

let loading;
let needLoadingRequestCount = 0;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中……"
  });
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    loading.close();
  }
};

const utils = {
  //公用的方法
  //防抖函数外壳======
  preventShakeHandle(fn, wait) {
    let timer;
    let startTime = 0;

    return function run() {
      let d = new Date();
      let nowTime = d.getTime();
      if (nowTime - startTime < wait) {
        //触发时间
        clearTimeout(timer);
        // console.log('清空效果');
        startTime = nowTime;
        timer = setTimeout(function() {
          fn();
        }, wait);
      } else {
        startTime = nowTime;
        timer = setTimeout(function() {
          fn();
        }, wait);
      }
    };
  },
  //截留外壳==========
  splitFlowHandle(fn, wait) {
    let timer;
    let startTime = 0;

    return function run() {
      let d = new Date();
      let nowTime = d.getTime();
      if (nowTime - startTime > wait) {
        if (timer) {
          // console.log('节流不执行！！！！！！！！！');
        } else {
          timer = setTimeout(function() {
            fn();
            timer = null;
          }, wait);
          startTime = startTime + wait;
        }
      }
    };
  },
  showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
      startLoading();
    }
    needLoadingRequestCount++;
  },
  tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
      this.preventShakeHandle(tryCloseLoading, 300)();
    }
  }
};

export default utils;
