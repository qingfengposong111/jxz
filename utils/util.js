var djRequest = require('request.js');
var config = require('config.js');
const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTodayDateInfo = function getTodayDateInfo() {
  const time = new Date;
  const m = time.getMonth() + 1; /*月份*/
  const t = time.getDate(); /*天数*/
  var d = time.getDay(); /*星期X*/
  if (d == 0) {
    d = "周天";
  } else if (d == 1) {
    d = "周一";
  } else if (d == 2) {
    d = "周二"
  } else if (d == 3) {
    d = "周三";
  } else if (d == 4) {
    d = "周四";
  } else if (d == 5) {
    d = "周五";
  } else if (d == 6) {
    d = "周六";
  }
  return { "month": m, "day": t, "week": d };
}

const getCurrentDateTime = function getCurrentDateTime() {
  const date = new Date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

const getCurrentDate = function getCurrentDate() {
  const date = new Date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '-' + month + '-' + day;
}

const getResetDHMS = interval => {
  var days = Math.floor(interval / (24 * 3600 * 1000))
  //计算出小时数
  var leave1 = interval % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  return days + "天    " + [hours, minutes, seconds].map(formatNumber).join(':'); 
}

const djToast = text => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000
  })
}

const login = function Login() {
  var params = {
    "code": app.globalData.userCode, //wx.login接口返回参数,
    "encryptedData": app.globalData.encryptedData, //微信获取用户信息接口返回,对应button组件 open-type="getUserInfo" bindgetuserinfo="getInfo"
    "iv": app.globalData.iv, //微信获取用户信息接口返回,对应button组件 open-type="getUserInfo" bindgetuserinfo="getInfo"
    "name": app.globalData.userInfo.nickName, //用户昵称 :对应接口用户信息里的 nickName
    "header_img": app.globalData.userInfo.avatarUrl, //用户头像: 对应接口用户信息的 avatarUrl
    "sex": app.globalData.userInfo.gender, //用户性别: 对应接口用户信息的 gender
  }
  //console.log(params);
  djRequest.djPost("/xcxLogin", params, function(res) {
    console.log(res);
    if (res.code == 0) {
      config.Auth = res.data.auth
      wx.reLaunch({
        url: '../index/index'
      })
    } else {
      wx.reLaunch({
        url: '../index/index'
      })
    }
  })
}

const availablePhone = num => {
  var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  if (!reg.test(num)) {
    wx.showToast({
      title: '电话号码格式有误，请重新输入',
      icon: "none",
      mask: true,
      duration: 2500
    })
    return false;
  }
  return true;
}

const isNotNull = (text,title) => {
  if (text==null || text==undefined || text.length==0 || text =="") {
    wx.showToast({
      title: title+'不可为空',
      icon: "none",
      mask: true,
      duration: 2500
    })
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  djToast: djToast,
  login: login,
  availablePhone: availablePhone,
  isNotNull: isNotNull,
  getCurrentDate: getCurrentDate,
  getResetDHMS: getResetDHMS
}