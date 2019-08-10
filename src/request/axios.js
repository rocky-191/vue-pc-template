// 封装axios
import axios from "axios";
import router from "../router";
// import { Message } from "fw-ui";
import noLoadingList from "./noLoadingList";
import utils from "@/utils/event";
import globalAPI from "@/utils/globalAPI.js";

let axiosConfig = {
  // 设置超时时间
  timeout: 10000,
  baseURL: process.env.BASE_URL, // api 的 base_url
  withCredentials: true
};
const service = axios.create(axiosConfig);

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
    if (noLoadingList.indexOf(config.url) === -1) {
      utils.showFullScreenLoading();
    }
    //在一个ajax发送前执行一下取消操作
    removeRepeatUrl(config);
    config.cancelToken = new cancelToken(c => {
      // 自定义唯一标识
      pending.push({ u: config.url + "&" + config.method, f: c });
    });
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
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
    utils.tryHideFullScreenLoading();
    removeRepeatUrl(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    const responseCode = response.status;
    let rightCode = [10000, 10001, 10002, 10003, 10004, 200];
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
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    utils.tryHideFullScreenLoading();
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status;
    switch (responseCode) {
      case 20001:
        globalAPI.MessageTip(2, "存在敏感词");
        break;
      case 20002:
        globalAPI.MessageTip(2, "用户已存在");
        break;
      case 20003:
        globalAPI.MessageTip(2, "用户不存在");
        break;
      case 20004:
        globalAPI.MessageTip(2, "没有权限");
        break;
      case 20005:
        globalAPI.MessageTip(2, "权限验证失败");
        break;
      case 20006:
        globalAPI.MessageTip(2, "Token过期，请重新登录");
        // 清除token
        localStorage.removeItem("token");
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          router.replace({
            path: "/Login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 1000);
        break;
      case 20007:
        globalAPI.MessageTip(2, "非本机构不能操作");
        break;
      case 20008:
        globalAPI.MessageTip(2, "用户密码输入不正确");
        break;
      case 20009:
        globalAPI.MessageTip(2, "两次输入的密码不匹配");
        break;
      case 20010:
        globalAPI.MessageTip(2, "无可下载文件");
        break;
      case 20011:
        globalAPI.MessageTip(2, "文件内容为空或格式错误");
        break;
      case 30001:
        globalAPI.MessageTip(3, "登录失败");
        break;
      // 30002：未登录
      case 30002:
        // 跳转登录页
        globalAPI.MessageTip(3, "未登录");
        router.replace({
          path: "/Login",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;
      case 30003:
        globalAPI.MessageTip(3, "下载失败");
        break;
      case 30004:
        globalAPI.MessageTip(3, "验证码生成出错");
        break;
      case 30005:
        globalAPI.MessageTip(3, "验证码校验失败");
        break;
      case 30006:
        globalAPI.MessageTip(3, "获取当前用户信息失败");
        break;
      case 30007:
        globalAPI.MessageTip(3, "获取当前用户数据失败");
        break;
      case 30009:
        globalAPI.MessageTip(3, "参数格式错误");
        break;
      case 30010:
        globalAPI.MessageTip(3, "参数校验异常");
        break;
      case 30011:
        globalAPI.MessageTip(3, "文件上传失败");
        break;
      case 30012:
        globalAPI.MessageTip(3, "数据库记录不存在");
        break;
      case 40001:
        globalAPI.MessageTip(4, "生成失败");
        break;
      case 40002:
        globalAPI.MessageTip(4, "编辑失败");
        break;
      case 40003:
        globalAPI.MessageTip(4, "查询失败");
        break;
      case 40004:
        globalAPI.MessageTip(4, "插入失败");
        break;
      case 40005:
        globalAPI.MessageTip(4, "删除失败");
        break;
      case 40006:
        globalAPI.MessageTip(4, "统计错误");
        break;
      case 40007:
        globalAPI.MessageTip(4, "接口参数异常");
        break;
      case 40008:
        globalAPI.MessageTip(4, "时间段统计错误");
        break;
      case 40009:
        globalAPI.MessageTip(4, "数据库操作异常");
        break;
      case 40010:
        globalAPI.MessageTip(4, "主键为空异常");
        break;
      case 40011:
        globalAPI.MessageTip(4, "排序字段名称或格式异常");
        break;
      case 40012:
        globalAPI.MessageTip(4, "空指针异常");
        break;
      case 40013:
        globalAPI.MessageTip(4, "证书安装失败");
        break;
      case 40014:
        globalAPI.MessageTip(4, "证书无效");
        break;
      case 40015:
        globalAPI.MessageTip(4, "第三方接口调用失败");
        break;
      case 50001:
        globalAPI.MessageTip(5, "系统配置错误");
        break;
      case 50002:
        globalAPI.MessageTip(5, "系统异常");
        break;
      // 404请求不存在
      case 404:
        globalAPI.MessageTip(4, "网络请求不存在");
        break;
      // 其他错误，直接抛出错误提示
      default:
        globalAPI.MessageTip(4, error.response.data.msg);
    }
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

export default service;
