// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingstatus: false,
    pageheight: 0
  },

  gotUserAuthorize(){
    this.setData({
      loadingstatus: true
    });
    wx.login({
      success: res => {
        const code = res.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: res => {
              //3.解密用户信息 获取unionId
              wx.request({
                url: 'https://lingtongzixun.cn/SAPP/decodeUserInfo',
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: function (data) {

                  //4.解密成功后 获取自己服务器返回的结果
                  if (data.data.wechatId) {
                    wx.setStorage({
                      key: 'userInfo',
                      data: data.data
                    });
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                  } else {
                    console.log('解密失败')
                  }

                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: () => {
              console.log('获取用户信息失败')
            }
          })

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      }, fail: () => {
        callback(false)
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      pageheight: wx.getSystemInfoSync().windowHeight
    });
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res);
        wx.switchTab({
          url: '/pages/home/home',
        })
      },
      fail: function (err) {
        console.log(err)
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