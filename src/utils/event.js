// import { Loading } from "element-ui";

const utils = {
  //一些公用的方法==================================
  //防抖函数外壳======
  preventShakeHandle: function(fn, wait) {
    let timer;
    let startTimestap = 0;

    return function run() {
      let d = new Date();
      let nowTimestap = d.getTime();
      if (nowTimestap - startTimestap < wait) {
        //触发时间
        clearTimeout(timer);
        // console.log('清空效果');
        startTimestap = nowTimestap;
        timer = setTimeout(function() {
          fn();
        }, wait);
      } else {
        startTimestap = nowTimestap;
        timer = setTimeout(function() {
          fn();
        }, wait);
      }
    };
  },
  //截留外壳==========
  splitFlowHandle: function(fn, wait) {
    let timer;
    let startTimestap = 0;

    return function run() {
      let d = new Date();
      let nowTimestap = d.getTime();
      if (nowTimestap - startTimestap > wait) {
        if (timer) {
          // console.log('节流不执行！！！！！！！！！');
        } else {
          timer = setTimeout(function() {
            fn();
            timer = null;
          }, wait);
          startTimestap = startTimestap + wait;
        }
      }
    };
  },
  //文件服务器下载函数下载
  fileDownloadHandle(fileID) {
    let that = this;
    let url =
      process.env.BASE_FILE_API + "/fileserver/file/" + fileID + "/download";
    let params = {
      responseType: "arraybuffer"
    };
    let success = function(response) {
      if (response.ok == true) {
        // 接口只获取连接 js 创建a标签模拟点击a下载文件
        var fileName = "";
        if (response.headers.map["attachment-name"]) {
          fileName = response.headers.map["attachment-name"][0];
        }
        if (response.headers.map["Attachment-Name"]) {
          fileName = response.headers.map["Attachment-Name"][0];
        }
        let blobObj = new Blob([response.data]);
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          //兼任ie10+
          window.navigator.msSaveBlob(blobObj, fileName);
        } else {
          var objectUrl = URL.createObjectURL(blobObj);
          console.log(objectUrl, "url");
          var link = document.createElement("a");

          link.download = decodeURIComponent(fileName);
          link.href = objectUrl;
          link.click();
          link.remove();
        }
      } else {
        that.$message({
          type: "info",
          message: that.globalAPI.mes.error
        });
      }
    };
    // var fail = function(error) {
    //   that.$message({
    //     type: "info",
    //     message: that.globalAPI.mes.error
    //   });
    // };
    // this.requestHandleGet(url, params, success, fail);
  }
}

export default utils;
