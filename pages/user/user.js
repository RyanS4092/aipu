const app = getApp();

Page({
  data: {
    pageheight: null,
    userInfo: {},
    currentCoin: 0,
    checkInStatus: 0,
    loadingstatus: false,
    mobile:{
      number: '18210001000',
      status: '更换手机号'
    },
    usernav:[{
      name: "我的收藏",
      description: "查看收藏的信息",
      func: "collect"
      }, {
        name: "我发布的商铺",
        description: "管理商铺信息",
        func: "managerentinform"
      }, {
        name: "我的选址需求",
        description: "管理我的需求信息",
        func: "managerequestinform"
      }, {
        name: "浏览记录",
        description: "我浏览过的信息",
        func: "history"
      }, {
        name: "关于我们",
        description: "关于灵通商铺",
        func: "about"
      }, {
        name: "联系客服",
        description: "0359-8888888",
        func: "callserve"
      }]
  },
  closereminder(){
    this.setData({
      checkInStatus: 0
    })
  },
  collect(){
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
  managerentinform(){
    wx.navigateTo({
      url: '../rentmanagement/rentmanagement'
    })
  },
  managerequestinform() {
    wx.navigateTo({
      url: '../requestmanagement/requestmanagement'
    })
  }, 
  history() {
    wx.navigateTo({
      url: '../history/history'
    })
  }, 
  about() {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  callserve(){
    wx.makePhoneCall({
      phoneNumber: '0359 8888888',
    })
  },
  checkIn(){
    this.setData({
      loadingstatus: true
    });
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(userInfoData) {
        const unionId = userInfoData.data.wechatId;
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/checkin',
          method: 'post',
          data: { unionId: unionId },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log(res);
            if (res.data == "alreadyCheckIn"){
              that.setData({
                checkInStatus: 1,
                loadingstatus: false
              })
            }else{
              that.setData({
                checkInStatus: 2,
                currentCoin:  res.data.coin,
                loadingstatus: false
              })
            }
          }
        })
      }
    })
  },
  onLoad: function () {
    this.setData({
      pageheight: wx.getSystemInfoSync().windowHeight
    })
    const that = this;
    wx.getStorage({
        key: 'userInfo',
        success(res) {
          console.log(res.data);
          that.setData({
            userInfo: res.data,
            currentCoin: res.data.wechatcoin
          })
        }
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
})
