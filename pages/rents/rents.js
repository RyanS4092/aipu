// pages/rents/rents.js
Page({

  data: {
    rent: {},
    currentswiper: 1,
    countrentimgs: 0,
    recommands: [],
    markers:[],
    ids: {},
    icon: {
      collectionfalse: "../../image/icon/collection.png",
      collectiontrue: "../../image/icon/collectiontrue.png",
      share: "../../image/icon/wechat.png",
      call: "../../image/icon/call.png"
    },
    collectionstatus: false
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      currentswiper: e.detail.current + 1
    })
  },
  callrents(e) {
    wx.makePhoneCall({
      phoneNumber: "0359 8888888"
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
  collection(){
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const rentid = this.data.rent._id;
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
         const ids = {
            rentid: rentid,
            wechatId: res.data.wechatId,
            collectionstatus: that.data.collectionstatus
         };
         const sentids = JSON.stringify(ids);
         wx.request({
           url: 'https://lingtongzixun.cn/SAPP/rentCollect',
           data: ids,
           header: {
             'content-type': 'application/json'
           },
           method: 'POST',
           success: function (res) {
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
          rentid: options.rentid,
          wechatId: userInfo.data.wechatId
        };
        const sentids = JSON.stringify(ids);
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/rentsinfo',
          data: sentids,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            let countrentimg = res.data.rentinfo.uploadimg.length;
            let latitude = res.data.rentinfo.mapinfo.latitude;
            let longitude = res.data.rentinfo.mapinfo.longitude;
            let iconPath = '../../image/icon/location.png';
            that.setData({
              rent: res.data.rentinfo,
              recommands: res.data.recommandRents,
              collectionstatus: res.data.collectionstatus,
              countrentimgs: countrentimg,
              markers: [{
                latitude: latitude,
                longitude: longitude,
                iconPath: iconPath
              }]
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
    wx.getStorage({
      key: 'historyRents',
      success: function (res) {
        const history = res.data;
        const check = history.indexOf(options.rentid);
        if (check === -1) {
          history.unshift(options.rentid);
          wx.setStorage({
            key: 'historyRents',
            data: history,
          })
        }
      },
      fail: function () {
        const newhistory = [];
        newhistory.unshift(options.rentid);
        wx.setStorage({
          key: 'historyRents',
          data: newhistory,
        })
      }
    })
  },

  onReady: function () {
  },

  onShow: function () {
  }
})