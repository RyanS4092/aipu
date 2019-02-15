// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(userInfoData) {
        var userFormData = e.detail.value;
        userFormData.unionId = userInfoData.data.unionId;
        console.log(userFormData);
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/application-form-data',
          method: 'post',
          data: userFormData,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: () => {
            wx.redirectTo({
              url: '../allform/allform',
            })
          }
        })
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})