// pages/request/request.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestinform:[],
    pageNow: 0
  },
  onReachBottom() {
    wx.showLoading({
      title: '正在加载更多信息',
      mask: true
    });
    const pageNow = this.data.pageNow + 1
    console.log(pageNow);
    this.setData({
      pageNow: pageNow
    });
    const that = this;
    const info = {
      page: pageNow
    }
    const infostringify = JSON.stringify(info);
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/requestpage',
      data: infostringify,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        const requests = that.data.rentinform;
        const requestinform = requests.concat(res.data);
        console.log(rentinform);
        that.setData({
          requestinform: requestinform
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const that = this;
    const info = {
      page: 0
    }
    const infostringify = JSON.stringify(info);
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/requestpage',
      data: infostringify,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          requestinform: res.data
        });
        wx.hideLoading();
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '数据获取失败，请退出后重试',
        });
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