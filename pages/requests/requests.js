// pages/requests/requests.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request: {},
    collectionstatus: false
  },
  callrequests(e) {
    wx.makePhoneCall({
      phoneNumber: '0359 8888888'
    })
  },
  collection() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const requestid = this.data.request._id;
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
         const ids = {
            requestid: requestid,
            wechatId: res.data.wechatId,
            collectionstatus: that.data.collectionstatus
         };
         const sentids = JSON.stringify(ids);
         console.log(sentids);
         wx.request({
           url: 'https://lingtongzixun.cn/SAPP/requestCollect',
           data: ids,
           header: {
             'content-type': 'application/json'
           },
           method: 'POST',
           success: function (res) {
              console.log(res.data);
              if (res.data == "collection success"){
                that.setData({
                  collectionstatus: true
                });
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '收藏成功',
                  showCancel: false
                })
              }else if (res.data == "remove success"){
                that.setData({
                  collectionstatus: false
                });
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '删除收藏成功',
                  showCancel: false
                })
              }else{
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '网络异常，请稍后重试',
                  showCancel: false
                })
              }
           },
           fail: function(){
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '收藏失败，请稍后再试',
                showCancel: false
              })
           }
         })
      },
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
    wx.getStorage({
      key: 'userInfo',
      success: function (userInfo) {
        const ids = {
          requestid: options.requestid,
          wechatId: userInfo.data.wechatId
        };
        const sentids = JSON.stringify(ids);
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/requestsinfo',
          data: sentids,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            that.setData({
              request: res.data.requestinfo,
              collectionstatus: res.data.collectionstatus
            });
            console.log(that.data)
            wx.hideLoading();
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '数据获取失败，请退出后重试',
            })
          }
        });
      }
    })
    wx.getStorage({
      key: 'historyRequests',
      success: function (res) {
        const history = res.data;
        const check = history.indexOf(options.requestid);
        if(check === -1){
          history.unshift(options.rentid);
          wx.setStorage({
            key: 'historyRequests',
            data: history,
          })
        }
      },
      fail: function () {
        const newhistory = [];
        newhistory.unshift(options.requestid);
        wx.setStorage({
          key: 'historyRequests',
          data: newhistory,
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