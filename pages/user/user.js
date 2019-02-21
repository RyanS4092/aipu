const app = getApp();

Page({
  data: {
    pageheight: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mobile:{
      number: '18210001000',
      status: '更换手机号'
    },
    usernav:[{
      name: "我的收藏",
      description: "查看收藏的信息",
      url: "../collection/collection"
      }, {
        name: "浏览记录",
        description: "我浏览过的信息",
        url: "../history/history"
      }, {
        name: "关于我们",
        description: "关于灵通商铺",
        url: "../collection/collection"
      }, {
        name: "联系客服",
        description: "0359-8888888",
        url: "../collection/collection"
      }]
  },
  onLoad: function () {
    this.setData({
      pageheight: wx.getSystemInfoSync().windowHeight
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
