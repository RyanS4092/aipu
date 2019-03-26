// components/myrents/myrents.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myrents: {
      type: Array,
      value: [],
    },
    pageheight: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotpay:false,
    currentrentid: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.setData({
        hotpay: false
      })
    },
    toRefresh(e){
      const rentid = e.currentTarget.dataset.rentid;
      wx.showModal({
        title: '提示',
        content: '刷新需要花费2铺币,每日仅能刷新一次',
        success(res) {
          if (res.confirm) {
            wx.getStorage({
              key: 'userInfo',
              success: function (res) {
                const wechatId = res.data.wechatId;
                const infos = {
                  rentid: rentid,
                  wechatId: wechatId
                }
                const infostringify = JSON.stringify(infos);
                wx.request({
                  url: 'https://lingtongzixun.cn/SAPP/toRefresh',
                  data: infostringify,
                  header: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  success: function (res) {
                    if (res.data === "success"){
                      wx.navigateTo({
                        url: '/pages/rentmanagement/rentmanagement',
                      });
                    }else if(res.data ==="Insufficient balance"){
                      wx.showModal({
                        title: '提示',
                        content: '余额不足，是否前去充值？',
                        success: res=>{
                          if(res.confirm){
                            wx.navigateTo({
                              url: '/pages/charge/charge',
                            });
                          }else if(res.cancel){
                            wx.navigateTo({
                              url: '/pages/rentmanagement/rentmanagement',
                            });
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          } else if (res.cancel) {
            
          }
        }
      })
    },
    toHot(e){
      const rentid = e.currentTarget.dataset.rentid;
      const hot = e.currentTarget.dataset.hot;
      if (hot){
        wx.showModal({
          title: '提示',
          content: '该信息已经登上热门啦',
          showCancel: false
        })
      }else{
        this.setData({
          hotpay: true,
          currentrentid: rentid
        })
      }
    }
  }
})
