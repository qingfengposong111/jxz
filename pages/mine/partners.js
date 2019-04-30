const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');

Page({
  data: {
    visible: false,
    current: 'tab1',
    sum:0,
    list1: [],
    list2: [],
  },
  showModal() {
   if (this.data.sum == 0) {util.djToast("您暂时没有可提现的积分！"); return;} 
   var _this = this;
   if(_this.data.visible == false){
     wx.showModal({
       title: '申请积分提现',
       content: '本次提现积分：'+_this.data.sum + '积分',
       success(res) {
         if (res.confirm) {
          _this.applyWithDraw();
         } else if (res.cancel) {
           // console.log('用户点击取消')
         }
       }
     })
   }else{
     _this.setData({
       visible: !_this.data.visible
     });
   }
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab1") {
      this.getLogList()
    } else if (detail.key == "tab2") {
      this.getPromotionCashLog()
    } 
  },
  applyWithDraw: function () {
    var _this = this
    djRequest.djGet("/newPromotionCash", {"amount": _this.data.sum}, function (res) {
      console.log(res);
      if (res.code == 0) {
        _this.setData({
          sum:0,
          visible: !_this.data.visible
        });
      }
    });
  },
  getLogList: function () {
    var _this = this
    djRequest.djGet("/promotionLog", { "start": "0", "limit": "10" }, function (res) {
      console.log(res);
      if (res.code == 0) {
        _this.setData({
          list1: res.data.list,
          sum:res.data.sum
        })
      }
    });
  },
  getPromotionCashLog: function () {
    var _this = this
    djRequest.djGet("/promotionCashLog", { "start": "0", "limit": "10" }, function (res) {
      console.log(res);
      if (res.code == 0) {
        _this.setData({
          list2: res.data.list
        })
      }
    });
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    this.getLogList()
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