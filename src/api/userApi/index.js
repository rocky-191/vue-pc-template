import request from "@/request/axios";

const user = {
  //获取userInfo
  _getUserInfo() {
    // url请求地址需要根据实际调整
    return request.get("/mock/login.json");
  }
};

export default user;
