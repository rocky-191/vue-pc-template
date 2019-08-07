import { Loading } from "element-ui";
export default {
  methods: {
    //下载导入模板 方法
    //请先在login.vue 里面添加本模块的key
    //传入对应模块添加的key 就可以下载 模板文件
    mixin_downloadModuleFileHandle(moduleName, isShowLoading) {
      let that = this;
      isShowLoading = isShowLoading ? isShowLoading : true;
      let loadingInstance = null;
      if (isShowLoading) {
        loadingInstance = Loading.service({ target: ".appContent" });
      }

      let strmodule = JSON.parse(localStorage.getItem("disposeList"))[
        moduleName
      ];
      let idArr = strmodule.split(";");
      if (idArr.length <= 1) {
        if (isShowLoading) {
          loadingInstance.close();
        }
        that.$message({
          type: "info",
          message: "获取文件id失败！"
        });
        return;
      }
      let uploadModule = idArr[1];
      if (!uploadModule) {
        if (isShowLoading) {
          loadingInstance.close();
        }
        that.$message({
          type: "info",
          message: "获取文件id失败！"
        });
        return;
      }

      let url =
        process.env.BASE_FILE_API +
        "/fileserver/file/" +
        uploadModule +
        "/download";
      let params = {
        responseType: "arraybuffer"
      };
      let success = function(response) {
        if (response.ok == true) {
          // 接口只获取连接 js 创建a标签模拟点击a下载文件
          let fileName = "";
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
            let objectUrl = URL.createObjectURL(blobObj);
            console.log(objectUrl, "url");
            let link = document.createElement("a");

            link.download = decodeURIComponent(fileName);
            link.href = objectUrl;
            link.click();
            link.remove();
          }
          if (isShowLoading) {
            loadingInstance.close();
          }
        } else {
          if (isShowLoading) {
            loadingInstance.close();
          }
          that.$message({
            type: "info",
            message: response.data.msg
          });
        }
      };
      var fail = function(error) {
        if (isShowLoading) {
          loadingInstance.close();
        }
        that.$message({
          type: "info",
          message: that.globalAPI.mes.error
        });
      };
      that.globalAPI.requestHandleGet(url, params, success, fail);
    },
    //导出文件接口
    mixin_exportFilehandle(url, params, isShowLoading) {
      var that = this;
      isShowLoading = isShowLoading ? isShowLoading : true;
      let loadingInstance = null;
      if (isShowLoading) {
        loadingInstance = Loading.service({ target: ".appContent" });
      }
      var ourl = url;
      let success = function(response) {
        if (response.ok == true) {
          // 接口只获取连接 js 创建a标签模拟点击a下载文件
          // var fileName = '导出文件';//设置默认
          let fileName = "导出文件"; //设置默认 txt 文件
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
            let objectUrl = URL.createObjectURL(blobObj);

            let link = document.createElement("a");

            link.download = decodeURIComponent(fileName);
            link.href = objectUrl;
            link.click();
            link.remove();
          }
          if (isShowLoading) {
            loadingInstance.close();
          }
        } else {
          that.$message({
            type: "info",
            message: response.data.msg
          });
          if (isShowLoading) {
            loadingInstance.close();
          }
        }
      };
      var fail = function(error) {
        if (isShowLoading) {
          loadingInstance.close();
        }
        that.$message({
          type: "info",
          message: that.globalAPI.mes.error
        });
      };
      this.globalAPI.requestHandlePost(ourl, params, success, fail, {
        responseType: "arraybuffer"
      });
    },
    //错误提示
    mixin_checkTipText(paramsKey, type, keyName) {
      /**
       * @paramsKey  str 校验的类型
       * @type       int 1表示非空校验（没填） 2表示格式校验（格式不对）
       * @keyName    str 页面上该字段的描述明细
       */
      //type == 1 是非空校验   2是格式校验
      //邮箱
      if (paramsKey == "email") {
        if (type == 1) {
          return "请填写" + keyName;
        }
        if (type == 2) {
          return "请填正确" + keyName + "格式'123452@163.com'";
        }
      }
      //电话
      if (paramsKey == "cellphone") {
        if (type == 1) {
          return "请填写" + keyName;
        }
        if (type == 2) {
          return "请填正确" + keyName + "格式";
        }
      }
      //邮编
      if (paramsKey == "postalCode") {
        if (type == 1) {
          return "请填写" + keyName;
        }
        if (type == 2) {
          return "请填正确" + keyName + "格式-6位数字";
        }
      }
      //固定电话
      if (paramsKey == "fixedPhone") {
        if (type == 1) {
          return "请填写" + keyName;
        }
        if (type == 2) {
          return "请填写正确的" + keyName + "格式";
        }
      }
    },

    //
    //防抖
    mixin_preventShakeFUN: function(fn, wait, params) {
      //向父组件传递事件 对应经常监听
      //请把fn的产生在params里按数组传入
      let timestamp = new Date().getTime(); //触发时间

      let shakeEmitTime = timestamp - this.$store.getters.getShakeTimeStamp;
      this.$store.dispatch("getShakeTimeStampAc", timestamp);
      if (shakeEmitTime > wait) {
        if (params) {
          fn(...params);
        } else {
          fn();
        }
      } else {
        console.log("防抖-------------");
      }
    }
  },
  components: {
    Loading
  }
}; // 页面import  引入  再mixins:[],混入直接调用方法名称就好
