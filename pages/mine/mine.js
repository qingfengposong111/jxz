// pages/mine/mine.js
const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    loginUserInfo:null,
  },
  navTo:function(e){
    wx.navigateTo({ url: e.currentTarget.dataset.url})
  },
  switchTo:function(e){
    wx.switchTab({ url: e.currentTarget.dataset.url})
  },
  getLoginUserInfo(){
    var _this = this
    djRequest.djGet("/userInfo", {}, function (res) {
      console.log(res);
      if (res.code == 0) {
        app.globalData.loginUserInfo = res.data;
        _this.setData({
          loginUserInfo: res.data
        })
      }
    });
  },

  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
  
  },
  onReady: function () {

  },
  onShow: function () {
    this.getLoginUserInfo();
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})