// pages/rents/rents.js
Page({

  data: {
    rent: {},
    currentswiper: 1,
    countrentimgs: 0,
    rentinform: [],
    markers:[]
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      currentswiper: e.detail.current + 1
    })
  },
  mapClick: function (e) {
    let latitude = this.data.rent.mapinfo.latitude;
    let longitude = this.data.rent.mapinfo.longitude;
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },
  onLoad: function (options) {
    const sentdata = {
      rentid : options.rentid
    }
    const sentdatastringify = JSON.stringify(sentdata);
    const that = this;
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/rentsinfo',
      data: sentdatastringify,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          rent: res.data
        });
        let countrentimg = that.data.rent.uploadimg.length;
        let latitude = that.data.rent.mapinfo.latitude;
        let longitude = that.data.rent.mapinfo.longitude;
        let iconPath = '../../image/icon/location.png';
        that.setData({
          countrentimgs: countrentimg,
          markers: [{
            latitude: latitude,
            longitude: longitude,
            iconPath: iconPath
          }]
        });
        const getregion = {
          region: that.data.rent.region
        };
        const getregionstringfy = JSON.stringify(getregion);
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/rentrecommand',
          data: getregionstringfy,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            that.setData({
              rentinform: res.data
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '数据获取失败，请退出后重试',
            })
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '数据获取失败，请退出后重试',
        })
      }
    });
  },

  onReady: function () {

  },

  onShow: function () {

  }
})