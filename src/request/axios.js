// 封装axios
import axios from "axios";
// import router from "../router";
// import { Message } from "fw-ui";
import noLoadingList from "./noLoadingList";
import utils from "@/utils/event";
import globalAPI from "@/utils/globalAPI.js";
let noLoadingString = noLoadingList.join("|");
let axiosConfig = {
  // 设置超时时间
  timeout: 60000
  // eslint-disable-next-line no-undef
  // baseURL: process.env.BASE_URL // api 的 base_url
  // withCredentials: true
};
const service = axios.create(axiosConfig);

// 设置 post、put 默认 Content-Type
service.defaults.headers.post["Content-Type"] = "application/json";
service.defaults.headers.put["Content-Type"] = "application/json";

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removeRepeatUrl = ever => {
  for (let p in pending) {
    if (pending[p].u === ever.url + "&" + ever.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(
  config => {
    if (!config.url.match(noLoadingString)) {
      // console.log(config);
      utils.showFullScreenLoading();
    }
    //在一个ajax发送前执行一下取消操作
    removeRepeatUrl(config);
    config.cancelToken = new cancelToken(c => {
      // 自定义唯一标识
      pending.push({ u: config.url + "&" + config.method, f: c });
    });
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers["authorization"] = token;
    }
    // config.headers["authorization"] =
    //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdW55b25nLVtcIndlaWhhaV9ncm91cFwiLFwiZGF0YV9hZG1pblwiLFwibm9ybWFsX3VzZXJcIixcIjFcIixcImRhdGFfYWRtaW5cIixcIndlaWhhaV9ncm91cFwiLFwiMVwiLFwibm9ybWFsX3VzZXJcIl0iLCJleHAiOjE1NjYzMjkwODJ9.-ufwTT0DrNDK64GswzgV_bVBDCyzxRzUzEHvIbMNT36x0ndLPCd3hgTBp5ugdF5hJE44XEgj56sYOnkO6cy5xg";
    return config;
  },
  error => {
    utils.tryHideFullScreenLoading();
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(
  response => {
    // console.log(response);
    utils.tryHideFullScreenLoading();
    removeRepeatUrl(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    if (response.data.code || response.data.code === 0) {
      let responseCode = response.data.code;
      let rightCode = [10000, 10001, 10002, 10003, 10004, 200, 0];
      // 如果返回的状态码在正确名单中，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (rightCode.indexOf(responseCode) > -1) {
        switch (responseCode) {
          case 10001:
            globalAPI.MessageTip(1, "登录成功");
            break;
          case 10002:
            globalAPI.MessageTip(1, "操作成功");
            break;
          case 10003:
            globalAPI.MessageTip(1, "下载成功");
            break;
          case 10004:
            globalAPI.MessageTip(1, "文件生成成功");
            break;
        }
      } else {
        switch (responseCode) {
          case 401:
          case 408:
          case 201006:
            globalAPI.MessageTip(2, "Token过期，请重新登录");
            // 清除token
            localStorage.removeItem("Authorization");
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {
              /* router.replace({
              path: "/Login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });*/
              window.location.href =
                "/#/?redirect=" + window.location.href.split("#")[1];
            }, 10);
            break;
          // 30002：未登录
          case 301002:
            // 跳转登录页
            globalAPI.MessageTip(3, "未登录");
            /* router.replace({
            path: "/Login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });*/
            window.location.href =
              "/#/?redirect=" + window.location.href.split("#")[1];
            break;
          case 401015:
            globalAPI.MessageTip(4, "权限认证失效，请重新登陆");
            localStorage.removeItem("Authorization");
            setTimeout(() => {
              window.location.href =
                "/#/?redirect=" + window.location.href.split("#")[1];
            }, 10);
            break;
          // 其他错误，直接抛出错误提示
          default:
            globalAPI.MessageTip(
              Number(
                responseCode
                  .toString()
                  .split("")
                  .shift()
              ),
              response.data.desc
            );
        }
      }
      // return Promise.resolve(response);
      return response;
    } else {
      // return Promise.reject(response);
      return response;
    }
  },
  error => {
    console.log(error.response); // for debug
    utils.tryHideFullScreenLoading();
    // 可以根据后端返回的状态码进行不同的操作
    if (error.response) {
      const errorCode = error.response.status;
      switch (errorCode) {
        case 400:
          globalAPI.MessageTip(5, "请求出现错误");
          break;
        case 403:
          globalAPI.MessageTip(5, "资源不可用");
          break;
        case 404:
          globalAPI.MessageTip(5, "网络请求不存在");
          break;
        case 500:
          globalAPI.MessageTip(5, "系统异常");
          break;
        case 501:
          globalAPI.MessageTip(5, "请求还没有被实现");
          break;
        case 502:
          globalAPI.MessageTip(5, "网关错误");
          break;
        case 503:
          globalAPI.MessageTip(5, "服务暂时不可用");
          break;
        case 505:
          globalAPI.MessageTip(5, "请求的 HTTP 版本不支持");
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default service;
