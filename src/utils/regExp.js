/* eslint-disable */
var regExp = {
  // 验证微信
  isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  },

  // 验证用户名
  userNameReg(str) {
    const reg = /^[a-zA-Z0-9_-]{4,20}$/;
    return regFn(str, reg);
  },

  // 验证手机号
  mobileReg(str) {
    // const reg = /^[0-9\-;]*$/
    const reg = /^1[3546789]\d{9}$/;
    // const reg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
    return regFn(str, reg);
  },

  // 验证手机号+;
  mobileRegS(str) {
    const reg = /^(1[3546789]\d{9}[;]*)*$/;
    return regFn(str, reg);
  },

  // 非空校验
  notEmptyReg(str) {
    const reg = /\S/;
    return regFn(str, reg);
  },

  //验证密码
  pwdReg(str) {
    //const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]{6,20}$/
    const reg = /^(\w){6,20}$/;
    return regFn(str, reg);
  },

  // @param {string} str 待验证的数字
  decimalReg(str) {
    const reg = /^\d{1,8}\.{0,1}(\d{1,2})?$/;
    return regFn(str, reg);
  },

  // 验证邀请码
  inviteCodeReg(str) {
    const reg = /\d{8}/;
    return regFn(str, reg);
  },

  // 身份证（仅限二代18位身份证）
  idCardReg(str) {
    const reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
    return regFn(str, reg);
  },

  // 正整数
  positiveNumberReg(str) {
    const reg = /^[0-9]\d*$/;
    return regFn(str, reg);
  },
  //固定电话校验
  positionPhone(str) {
    // const reg = /^(1[3546789]\d{9}[;]*)*$/
    const reg = /^0\d{2}-?\d{8}$|^0\d{3}-?\d{7}$/;
    return regFn(str, reg);
  },
  //固定电话
  positionPhoneS(str) {
    const reg = /^[0-9\-;]*$/;
    return regFn(str, reg);
  },
  //输入带小数的的数字验证
  floatNumCheck(str, fixedNum) {
    //先检测是数字和小数点
    let reg1 = /^[\d][\d\.]*$/;
    if (regFn(str, reg1)) {
      //  数字和小数点
      let copstr = str;
      //str = str.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      copstr = copstr.replace(".", "$#$");
      if (copstr.indexOf(".") == -1) {
        //出现一次.

        let arr = copstr.split("$#$");
        //小数点后几位
        if (arr.length > 1 && arr[1].length > fixedNum) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  //传真
  fax(str) {
    const reg = /^(\d{3,4}-)?\d{7,8}$/;
    return regFn(str, reg);
  },
  //多个传真
  faxS(str) {
    const reg = /^((\d{3,4}-)?\d{7,8}[;]*)$/;
    return regFn(str, reg);
  },
  //邮编
  postalCode(str) {
    const reg = /^\d{6}$/;
    return regFn(str, reg);
  },
  //email 校验
  emailCheck(str) {
    // 邮箱验证
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return regFn(str, reg);
  },
  //多个邮箱正则
  emailCheckS(str) {
    // 邮箱验证
    const reg = /^((\w-*\.*)+@(\w-?)+(\.\w{2,})[;]*)+$/;
    return regFn(str, reg);
  },

  //整数数量
  IntNumCheck(str) {
    const reg = /^[1-9][0-9]*$/;
    return regFn(str, reg);
  }
};
function regFn(str, reg) {
  if (!str) return false;
  if (!reg) return false;
  return reg.test(str);
}

export default regExp;
