// pages/rentform/rentform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agentinform: [{
      agentavatar: "/image/agent/douzi.jpg",
      nametitle: "商铺管家-豆子",
      words: "完善信息，会加快转出哦，速度提高5倍以上"
    },
    {
      agentavatar: "/image/agent/zhenzhen.jpg",
      nametitle: "商铺管家-珍珍",
      words: "完善信息，会加快转出哦，速度提高5倍以上"
    }],
    region: ["北区", "东区", "中区", "西区", "南区", "禹都", "空港", "城郊各县"],
    regionindex: 0,
    cycle: ["月付", "季付", "半年付", "年付"],
    cycleindex: 0,
    selectlocation: false
  },
  bindPickerChangeRegion(e) {
    this.setData({
      regionindex: e.detail.value
    })
  }, 
  bindPickerChangeCycle(e) {
    this.setData({
      cycleindex: e.detail.value
    })
  },
  rentSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  selectlocation(){
    const that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          selectlocation: true
        })
      },
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