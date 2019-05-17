// pages/mine/mine.js
const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    loginUserInfo:null,
    visible1: false,
    filePath:''
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
        app.globalData.userPhone = res.data.phone;
        _this.setData({
          loginUserInfo: res.data
        })
      }
    });
  },

  onImgOK(e) {
    this.setData({
      shareImgUrl: e.detail.path
    })
  },

  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImgUrl,
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
  onShareAppMessage: function (opt) {
    if (opt.from === 'button') {
      console.log(this.data.shareImgUrl, 333);
      return {
        title: '践行师，知行合一，从我做起！！',
        imageUrl: this.data.shareImgUrl
      };
    } 
  },
  showModal1() {
    this.setData({
      visible1: !this.data.visible1
    });
    this.setData({
      template1: this.paletteAttr()
    });

  },
  //画分享关注
  paletteAttr() {
    return ({
      width: '650rpx',
      height: '900rpx',
      borderRadius: "8rpx",
      background: '../../images/bg3.png',
      views: [
        {
          type: 'text',
          text: "分享小程序",
          css: [{
            top: '70rpx',
            left: '305rpx',
            color: '#fff',
            fontSize: '40rpx',
            align: 'center',
            fontWeight: 'bold',
          }],
        },
        {
          type: 'text',
          text: '践行师|邀朋友筹千里！',
          css: [{
            top: '200rpx',
            left: '145rpx',
            align: 'left',
            width: '400rpx',
            fontSize: '32rpx',
            lineHeight: '50rpx',
            color: '#302C3D'
          }],
        },
        {
          type: 'image',
          url: '../../images/code.png',
          css: {
            top: '380rpx',
            left: '145rpx',
            color: 'red',
            width: '360rpx',
            height: '360rpx',
          },
        }
      ],
    });
  }
})