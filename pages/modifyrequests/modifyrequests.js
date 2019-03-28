// pages/modifyrequests/modifyrequests.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: ["0-50㎡", "50-100㎡", "100-500㎡", "500-1000㎡", "1000-10000㎡"],
    areaindex: 0,
    budget: ["2000元以下", "2-5千元", "5千-1万元", "1-2万元", "2-5万元", "5万元以上"],
    budgetindex: 0,
    region: ["北区", "东区", "中心区", "西区", "南区", "禹都", "空港", "城郊各县"],
    regionindex: 0,
    originRequestInfo: {}
  },
  bindPickerChangeRegion(e) {
    this.setData({
      regionindex: e.detail.value
    })
  },
  bindPickerChangeArea(e) {
    this.setData({
      areaindex: e.detail.value
    })
  },
  bindPickerChangeBudget(e) {
    this.setData({
      budgetindex: e.detail.value
    })
  },
  seekSubmit(e) {
    wx.showLoading({
      title: '信息提交中',
    });
    const that = this;
    const formvalue = e.detail.value;
    switch (true) {
      case !formvalue.title:
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请填写求租标题'
        });
        break;
      case !formvalue.plan:
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请填写计划开店的类型'
        });
        break;
      default:
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            const wechatId = res.data.wechatId;
            const areainfo = that.data.area[formvalue.area];
            const budgetinfo = that.data.budget[formvalue.budget];
            const preferlocationinfo = that.data.region[formvalue.preferlocation];
            const requestinfo = {
              title: formvalue.title,
              area: areainfo,
              budget: budgetinfo,
              preferlocation: preferlocationinfo,
              plan: formvalue.plan,
              transferfee: formvalue.transferfee,
              requestid: that.data.requestid
            }
            const requestinfoStringify = JSON.stringify(requestinfo);
            wx.request({
              url: 'https://lingtongzixun.cn/SAPP/modifyrequests',
              method: 'post',
              data: requestinfoStringify,
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '上传成功',
                  showCancel: false,
                  success(res) {
                    wx.redirectTo({
                      url: '/pages/requestmanagement/requestmanagement',
                    })
                  }
                })
              }
            })
          },
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
      success: function (userInfo) {
        const ids = {
          requestid: options.requestid,
          wechatId: userInfo.data.wechatId
        };
        const sentids = JSON.stringify(ids);
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/modifyrequestsinfo',
          data: sentids,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            const areaindex = that.data.area.indexOf(res.data.area);
            const budgetindex = that.data.budget.indexOf(res.data.budget);
            const regionindex = that.data.region.indexOf(res.data.preferlocation);
            that.setData({
              originRequestInfo: res.data,
              areaindex: areaindex,
              budgetindex: budgetindex,
              regionindex: regionindex,
              requestid: options.requestid
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