const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  data: {
    comlist: [],
    start: 0,
    limit: 100,
    haveNext: 1,
  },

  getMomentList: function () {
    var _this = this
    djRequest.djPost("/myMoment", { "start": _this.data.start, "limit": _this.data.limit }, function (res) {
      if (res.code == 0) {
        console.log(res);
        var tempArr = _this.data.comlist.concat(res.data.list)
        _this.setData({
          comlist: tempArr,
          haveNext: res.data.have_next,
        })
      }
    });
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
     this.getMomentList();
  },
  onReady: function () {

  },
  onShow: function () {

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