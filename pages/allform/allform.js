// pages/allform/allform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/application-all-data',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: data => {
        this.setData({
          userForm: data.data
        },function(){
          console.log("成功:",this.data.userForm)
        })
      }
    })
  }
})