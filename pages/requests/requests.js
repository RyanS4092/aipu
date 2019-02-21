// pages/requests/requests.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request: {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前",
      viewcount: 253,
      plan: "开火锅店",
      type: "店铺",
      transferfee: "同行业可接受",
      mobile: "13215475454"
    }
  },
  makeacall(e) {
    wx.makePhoneCall({
      phoneNumber: '13215475454'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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