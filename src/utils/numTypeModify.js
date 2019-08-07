//数据格式化 去除全部空格
const allTrim = function(str) {
  if (str == undefined || str == null) {
    return str;
  }
  let newstr = str.replace(/\s+/g, "");
  return newstr;
};
//数据格式化 去除前后空格
const spaceTrim = function(str) {
  if (str == undefined || str == null) {
    return str;
  }
  let newstr = str.replace(/^\s+|\s+$/g, "");
  return newstr;
};
//只能输入浮点数和小数
const intFloadNum = function(str) {
  // if(str == undefined  || str == null){
  //   return ;
  // }
  console.log(str);
  str = str.replace(/[^\d\.]/g, "");
  str = str.replace(/^\./g, ""); //开头不得为点

  str = str
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  console.log(str);
  return str;
};
//只能输入浮点数和小数
const intFloadNumLast = function(str) {
  // if(str == undefined  || str == null){
  //   return;
  // }
  console.log(str);
  str = str.replace(/[^\d\.]/g, "");
  str = str.replace(/^\./g, ""); //开头不得为点
  str = str.replace(/\.$/g, ""); //结束不得为点
  str = str
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  console.log(str);
  return str;
};
/**
 * 接口入参去掉收尾空格
 * @param obj
 * @returns {any}
 */
const replaceBlank = function(obj) {
  let param = JSON.parse(JSON.stringify(obj));
  Object.keys(param).forEach(function(key) {
    if (typeof param[key] == "string") {
      param[key] = spaceTrim(param[key]);
    }
  });
  return param;
};

Date.prototype.format = function() {
  var s = "";
  var mouth =
    this.getMonth() + 1 >= 10
      ? this.getMonth() + 1
      : "0" + (this.getMonth() + 1);
  var day = this.getDate() >= 10 ? this.getDate() : "0" + this.getDate();
  s += this.getFullYear() + "-"; // 获取年份。
  s += mouth + "-"; // 获取月份。
  s += day; // 获取日。
  return s; // 返回日期。
};

const fugetYearAndMonthAndDay = function(begin, end) {
  var arr = [];
  var ab = begin.split("-");
  var ae = end.split("-");
  var db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  var de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
  var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
  for (var k = unixDb; k <= unixDe; ) {
    //console.log((new Date(parseInt(k))).format());
    k = k + 24 * 60 * 60 * 1000;
    arr.push(new Date(parseInt(k)).format());
  }
  return arr;
};

const selectTable = function(selection, row) {
  selection.forEach(item => {
    if (item.id == row.id) {
      //that.$set(row, 'selected', true)
      row.selected = true;
    } else {
      //that.$set(row, 'selected', false)
      row.selected = false;
    }
  });
  if (selection.length == 0) row.selected = false;
};

const tableRowClassName = function({ row, rowIndex }) {
  if (row.selected) {
    return "selected-row";
  }
  return "";
};

//数据校验 验证特殊字符存在
const htmlTrim=function(str) {
  if (str == undefined || str == null) {
    return str;
  }
  let newstr = str.match(
    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im
  );
  return (newstr && true) || false;
}

//数据校验 验证只存在数字及小数点
const numTrim=function(str) {
  if (str == undefined || str == null) {
    return true;
  }
  let newstr = str.match(/^([1-9][0-9]*)+(.[0-9]*)?$|^0.([0-9]*)?$/im);
  return (newstr && true) || false;
},

//日期格式化yyyy-mm-dd hh-mm-dd
const formatTime = function(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var second = date.getSeconds();
  second = minute < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}

export default {
  allTrim,
  spaceTrim,
  intFloadNum,
  intFloadNumLast,
  replaceBlank,
  fugetYearAndMonthAndDay,
  selectTable,
  tableRowClassName,
  htmlTrim,
  numTrim,
  formatTime
};
