import { Message } from "element-ui";
const globalAPI = {
  MessageTip(code, txt) {
    switch (code) {
      case 1:
        //成功
        Message({
          showClose: true,
          message: `${txt}`,
          type: "success"
        });
        break;
      case 2:
        //轻微级别
        Message({
          showClose: true,
          message: `${txt}`,
          type: "warning"
        });
        break;
      case 3:
        //一般级别
        Message({
          showClose: true,
          message: `${txt}`,
          type: "info" //之后替换成general
        });
        break;
      case 4:
        // 严重
        Message({
          showClose: true,
          message: `${txt}`,
          type: "error"
        });
        break;
      case 5:
        // 特级严重
        Message({
          showClose: true,
          message: `${txt}`,
          type: "error" // severity
        });
        break;
    }
  }
};
export default globalAPI; // this.globalAPI就能调用全局信息
