/**
 * purpose: 验证
 * @User：chs
 * @Date：2019-03-25
 **/
let regular = {
  // 手机号
  phone:"^(1)[0-9]{10}$",
  // 电话号码的函数(包括验证国内区号,国际区号,分机号)
  tel: "^[0-9\-()（）]{7,18}$",
  // 整数和2位小数的正确数!
  nub_float: "^\\d{1,}(\\.?\\d{1,2})?$",
  // 正整数
  code:"^[0-9]$",
  // 密码
  password: "^[A-Za-z0-9]+$",
  // 邮箱
  email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
  // 用户名
  user_name: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",
  // 真实姓名
  real_name: "^[A-Za-z\\u4e00-\\u9fa5]+$",
  // 身份证
  idCard:"^[0-9]([0-9]{13}|[0-9]{16})[0-9|X|x]{1}$",
  // 字母
  letter: "^[A-Za-z]+$",
  // 小写字母
  letter_l: "^[a-z]+$",
  // 大写字母
  letter_u: "^[A-Z]+$",
  // QQ号码
  qq: "^[1-9]*[1-9][0-9]*$",
  // 邮编
  zipcode: "^\\d{6}$",
  // 仅ACSII字符
  ascii: "^[\\x00-\\xFF]+$",
  // 仅中文
  chinese: "^[\\u4e00-\\u9fa5]+$",
  // ip地址
  ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",
  img_format:"\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$",
  video_format:"\.(avi|mp4|3gp|flv|mov|mkv|rm|rmvb|swf|qt|ogg)$"
}
let regularState = function(id,val,inps){
  let l = {};
  switch (id){
    case ('phone'):
      l.regular = new RegExp(regular.phone).test(val)
      l.msg     = "手机号码不存在，请输入正确的手机号码！";
      return l;break;
    case ('tel'):
      l.regular = new RegExp(regular.tel).test(val)
      l.msg     = "请输入正确的电话号！";
      return l;break;
    case ('nub_float'):
      l.regular = new RegExp(regular.nub_float).test(val)
      l.msg     = "请输入数字和小数点后2位！";
      return l;break; 
    case ('code'):
      l.regular = new RegExp(regular.code).test(val)
      l.msg     = "验证码错误，请重新输入！";
      return l;break;
    case ('pwd'):
      l.regular = new RegExp(regular.pwd).test(val)
      l.msg     = "请输入为6-18位数字或字母，区分大小写！";
      return l;break;
    case ('pwd2'):
      l.regular = function(inps){
        let pwd1 = '',pwd2 = '';
        for(let i=0;i<inps.length;i++){
          if($(inps[i]).attr('regular-inp') == 'pwd'){
            pwd1 = $(inps[i]).val()
          }
          if($(inps[i]).attr('regular-inp') == 'pwd2'){
            pwd2 = $(inps[i]).val()
          }
        }
        if(pwd1 === pwd2){
          return true;
        }else{
          return false;
        }
      }(inps);
      l.msg     = "两次输入的密码不相同，请重新输入！";
      return l;break;
    case ('email'):
      l.regular = new RegExp(regular.email).test(val)
      l.msg     = "请输入正确邮箱地址！";
      return l;break;
    case ('user_name'):
      l.regular = new RegExp(regular.user_name).test(val)
      l.msg     = "用户名支持中文、字母、数字、“-”“_”的组合！";
      return l;break;
    case ('real_name'):
      l.regular = new RegExp(regular.real_name).test(val)
      l.msg     = "请输入真实姓名！";
      return l;break;
    case ('idCard'):
      l.regular = new RegExp(regular.idCard).test(val)
      l.msg     = "请输入真实身份证号！";
      return l;break;
    case ('letter'):
      l.regular = new RegExp(regular.letter).test(val)
      l.msg     = "请输入英文字母！(不区分大小写)";
      return l;break;
    case ('letter_l'):
      l.regular = new RegExp(regular.letter_l).test(val)
      l.msg     = "请输入(小写)英文字母！";
      return l;break;
    case ('letter_u'):
      l.regular = new RegExp(regular.letter_u).test(val)
      l.msg     = "请输入(大写)英文字母！";
      return l;break;
    case ('qq'):
      l.regular = new RegExp(regular.qq).test(val)
      l.msg     = "请输入qq号！";
      return l;break;
    case ('zipcode'):
      l.regular = new RegExp(regular.zipcode).test(val)
      l.msg     = "请输入邮编！";
      return l;break;
    case ('ascii'):
      l.regular = new RegExp(regular.ascii).test(val)
      l.msg     = "请输入ACSII字符！";
      return l;break;
    case ('chinese'):
      l.regular = new RegExp(regular.chinese).test(val)
      l.msg     = "请输入中文！";
      return l;break;
    case ('ip4'):
      l.regular = new RegExp(regular.ip4).test(val)
      l.msg     = "请输入ip地址！";
      return l;break;
    case ('img_format'):
      l.regular = new RegExp(regular.img_format).test(val)
      l.msg     = "图片类型必须是gif,jpeg,jpg,png中的一种！";
      return l;break;
    case ('video_format'):
      l.regular = new RegExp(regular.video_format).test(val)
      l.msg     = "视频格式支持(avi,mp4,3gp,flv,mov,mkv,rm,rmvb,swf,qt,ogg)！";
      return l;break;
    default:
      l.regular = false;
      l.msg     = '没有匹配内容';
      return l;
  }
}
// inps ==  需要验证的 input
// export default  只能返回一个方法
// import validate from '@/utils/verification' 
// new validate(inps)
// export 可以返回多个方法
// import {validate} from '@/utils/verification'
// validate(inps)
export function validate(inps){
  let result = {};
  let verification = function(inp,inps){
    let id    = $(inp).attr('regular-inp');
    let val   = $(inp).val();
    return regularState(id,val,inps)
  }
  for(let i=0;i<inps.length;i++){
    result = verification(inps[i],inps)
    if(!result.regular){
      break
    }
  }
  return result
}







