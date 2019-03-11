// pages/search/search.js

Page({
  data: {
    selectlist: [{
      name: "区域",
      color: "#333333",
      fontsize: "14px"
    },{
      name: "面积",
      color: "#333333",
      fontsize: "14px"
    }, {
      name: "费用",
      color: "#333333",
      fontsize: "14px"
    }, {
      name: "类型",
      color: "#333333",
      fontsize: "14px"
  }],
  rentinform: []
  },
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/indexhot',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          rentinform: res.data
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '数据获取失败，请退出后重试',
        })
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  makeacall(e) {
    wx.makePhoneCall({
      phoneNumber: '0359 8888888'
    })
  }
})