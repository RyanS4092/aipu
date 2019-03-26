// pages/requestmanagement/requestmanagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar: [{
      name: "审核中",
      status: true,
    }, {
      name: "已通过",
      status: false
    }],
    myauthRequests:[],
    myunauthRequests: []
  },
  barclick(e) {
    var index = e.currentTarget.dataset.index;
    if (index === 0) {
      this.setData({
        'bar[0].status': true,
        'bar[1].status': false
      })
    } else {
      this.setData({
        'bar[0].status': false,
        'bar[1].status': true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        const wechatId = res.data.wechatId;
        const wechatIdjson = {
          wechatId: wechatId
        };
        const wechatIdstringify = JSON.stringify(wechatIdjson);
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/myrequests',
          data: wechatIdstringify,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            const authRequests = [];
            const unauthRequests = [];
            const sortRequests = item => {
              if (item.authorization) {
                authRequests.push(item);
              } else {
                unauthRequests.push(item);
              }
            };
            res.data.map(sortRequests);
            that.setData({
              myauthRequests: authRequests,
              myunauthRequests: unauthRequests
            });
            wx.hideLoading();
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '数据获取失败，请退出后重试',
            })
          }
        })
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '获取用户信息失败',
          showCancel: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})