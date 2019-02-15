// pages/myform/myform.js
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
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(r) {
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/application-user-data',
          data: r.data,
          header: {
            'content-type': 'application/json'
          },
          success: data => {
            that.setData({
              userForm: data.data
            }, function () {
              console.log("成功:", that.data.userForm)
            })
          }
        })
      }
    })
  }
})