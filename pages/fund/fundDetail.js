const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');

Page({
  imagePath: '',
  data: {
    current: 'tab1',
    visible: false,
    visible1: false,
    order_sn:null,
    order:null,
    resetTime:"",
    supportList:[],
    rangeList1:[],
    rangeList2: [],
    rangeList3: [],
    my_rank:null,
    erCodeUrl:'',
    erCodeImageUrl:'',
    shareImgUrl:'',
    type:'1'
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
   if(detail.key == "tab1"){
     this.getRangeList("speed");
   } else if (detail.key == "tab2") {
     this.getRangeList("pupular");
   } else if (detail.key == "tab3") {
     this.getRangeList("rich");
   }
  },

  showModal() {
    this.setData({
      visible: !this.data.visible
    });
    this.setData({
      template: this.palette()
    });

    if (this.data.visible == false){
      this.showModal1();
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
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getOrderDetail: function () {
    var _this = this
    djRequest.djPost("/activityOrderDetail", { "order_sn": _this.data.order_sn}, function (res) {
      if (res.code == 0) {
        //console.log(res);
        var date3 = new Date(res.data.end_date).getTime() - new Date().getTime()  //时间差的毫秒数
        var days = Math.floor(date3 / (24 * 3600 * 1000))
        _this.setData({
          order: res.data,
          resetTime: days
        })
        _this.getRangeList("speed");
      }
    });
  },

  getSupportList: function () {
    var _this = this
    djRequest.djPost("/getSupportList", {"start": 0, "limit": 5,"order_sn": _this.data.order_sn }, function (res) {
      if (res.code == 0) {
        console.log(res);
        _this.setData({
          supportList: res.data.list,
        })
      }
    });
  },

  getRangeList: function (type) {
    var _this = this
    djRequest.djPost("/getActivityRankList", { "start": 0, "limit": 5, "type": type, "activity_id": _this.data.order.activity_id}, function (res) {
      if (res.code == 0) {
      //  console.log(res);
        if (_this.data.current == "tab1") {
          _this.setData({
            rangeList1: res.data.list,
            my_rank: res.data.my_rank
          })
        } else if (_this.data.current == "tab2") {
          _this.setData({
            rangeList2: res.data.list,
            my_rank: res.data.my_rank
          })
        } else if (_this.data.current == "tab3") {
          _this.setData({
            rangeList3: res.data.list,
            my_rank: res.data.my_rank
          })
        }
      }
    });
  },

  onImgOK(e) {
    this.setData({
      shareImgUrl: e.detail.path
    })
   // console.log(e.detail.path);
  },

  onErCodeImgOK(e) {
    this.setData({
     erCodeImageUrl:e.detail.path
    })
   // console.log(e);
  },

  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
    });
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {

    let path = '/pages/fund/fundShared';
    let param = encodeURIComponent('order_sn=' + options.order_sn);
    let url = "https://act.yingtxx.cn/getReferQrcode?path=" + path + "&totalImg=1" + "&param=" + param + '&time=' + Date.parse(new Date());
    this.setData({
      erCodeUrl: url,
      order_sn: options.order_sn,
      type:options.type
    })

    this.setData({
      erCodeTemplate: this.paletteErCodeImg()
    })

    this.getOrderDetail();
    this.getSupportList();
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
  onShareAppMessage: function (opt) {
    if(opt.from === 'button'){
      console.log(this.data.shareImgUrl,333);
      return {
        title: '践行师邀请您参与' + this.data.order.title + '的众筹活动，知行合一，从我做起！！',
        path: 'pages/fund/fundShared?order_sn=' + this.data.order_sn,
        imageUrl:this.data.shareImgUrl
      };

    }else{
      return {
        title: '践行师邀请您参与' + this.data.order.title + '的众筹活动，知行合一，从我做起！！',
        path: 'pages/fund/fundShared?order_sn=' + this.data.order_sn,
      }
    } 
  },

 /**--------------------分享画板---------------------------*/
   //画二维码
  paletteErCodeImg() {
    return ({
      width: '650rpx',
      height: '900rpx',
      views: [
        {
          type: 'image',
          url: this.data.erCodeUrl,
          css: {
            color: 'red',
            width: '650rpx',
            height: '900rpx',
          },
        }
      ],
    });
  },

  //画分享界面
  palette() {
    return ({
      width: '650rpx',
      height: '900rpx',
      borderRadius: "8rpx",
      background: '../../images/bg2.png',
      views: [
        {
          type: 'text',
          text: "分享众筹",
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
          text: '保存图片,分享给朋友和朋友圈，让更多助您完成活动！',
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
          url: this.data.erCodeImageUrl,
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
          text: "关注我们",
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
          text: '后续为您带来更多的服务！',
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