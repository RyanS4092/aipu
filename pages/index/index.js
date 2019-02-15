// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../image/swiper/chah.jpg', '../../image/swiper/swiper2.jpg', '../../image/swiper/swiper3.jpg'],
    nav: [{
            name:"查看新铺",
            icon:"../../image/icon/dianpu.png",
            link:"../search/search"
          },
          {
            name: "求租信息",
            icon: "../../image/icon/dianpu.png",
            link: "../search/search"
          },{
            name: "我要找铺",
            icon: "../../image/icon/dianpu.png",
            link: "../search/search"
          },{
            name: "我要转铺",
            icon: "../../image/icon/dianpu.png",
            link: "../search/search"
          }],
    statistics: {
        average: 5.45,
        updown: "上涨",
        percentage: "2.75%",
        totaltoday: 369,
        total: 34652,
        totaluser: 55883
    }
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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