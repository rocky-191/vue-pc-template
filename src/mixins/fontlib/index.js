import common from "./common.json";
// 引入字库文件

let fontlist = {
  // 字库文件注册
  cm: common // 简写别名
};

function getFont(fonts) {
  let validator = function(str) {
    // 参数校验
    if (typeof str !== "string") {
      console.log('字库查询参数错误，示例："common.addnew"');
      return str;
    } else if (str == "") {
      console.log('字库查询参数错误，示例："common.addnew"');
      return "字库查询参数不能为空";
    }
  };

  // 循环取值
  let loopkeys = path =>
    path.reduce((prev, cur) => (prev && prev[cur] ? prev[cur] : null), fonts);

  return function(str) {
    let result = validator(str); // 验证参数
    if (result) return result;

    let keys = str.split(".");
    for (let i = 0; i < keys.length; i++) {
      result = validator(keys[i]); // 验证参数
      if (result) return str;
    }
    result = loopkeys(keys);

    if (!result) {
      console.log("字库查询错误，未查询到相应字段");
      return str;
    }
    return result;
  };
}
let getF = new getFont(fontlist);

export default {
  // 抛出混入对象
  methods: {
    // // 省略全名方法，只用简写别名
    // getFont(str) { // 查询字库并返回查询字串, 函数移出，降低混入函数大小
    //     return getF(str);
    // },
    // gf(str) { // 查询字库并返回查询字串 简写别名
    //     return this.getFont(str);
    // }
    gf(str) {
      // 查询字库并返回查询字串，函数移出，降低混入函数大小
      return getF(str);
    }
  }
};
