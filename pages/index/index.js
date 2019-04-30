const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  data: {
    banner_list: [],
    list:[],
  },
  //页面跳转
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },
  //轮播图
  getBannerData:function(){
    var _this = this
    djRequest.djGet("/getIndexBanner", {}, function (res) {
      //console.log(res);
      if (res.code == 0) {
        _this.setData({
          banner_list: res.data.banner_list,
        })
      }
    });
  },
  //赛事列表
  getMatchList: function () {
    var _this = this
    djRequest.djPost("/matchList", {"start": 0,"limit": 10}, function (res) {
     // console.log(res);
      if (res.code == 0) {
        _this.setData({
          list: res.data.list,
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function () {
   this.getBannerData();
   this.getMatchList();
  }
})