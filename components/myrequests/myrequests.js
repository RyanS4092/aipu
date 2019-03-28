// components/myrequests/myrequests.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myrequests: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toModify(e){
      const requestid = e.currentTarget.dataset.requestid;
      wx.navigateTo({
        url: '/pages/modifyrequests/modifyrequests?requestid=' + requestid
      })
    },
    toRefresh(e){
      const requestid = e.currentTarget.dataset.requestid;
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
                  requestid: requestid,
                  wechatId: wechatId
                }
                const infostringify = JSON.stringify(infos);
                wx.request({
                  url: 'https://lingtongzixun.cn/SAPP/toRefreshRequest',
                  data: infostringify,
                  header: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  success: function (res) {
                    if (res.data === "success") {
                      wx.navigateTo({
                        url: '/pages/requestmanagement/requestmanagement',
                      });
                    } else if (res.data === "Insufficient balance") {
                      wx.showModal({
                        title: '提示',
                        content: '余额不足，是否前去充值？',
                        success: res => {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: '/pages/charge/charge',
                            });
                          } else if (res.cancel) {
                            wx.navigateTo({
                              url: '/pages/requestmanagement/requestmanagement',
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
    toDelete(e){
      const requestid = e.currentTarget.dataset.requestid;
      const info = {
        requestid: requestid
      }
      const infostringify = JSON.stringify(info);
      wx.showModal({
        title: '提示',
        content: '确定要删除本条信息吗？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: 'https://lingtongzixun.cn/SAPP/toDeleteRequest',
              data: infostringify,
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success: function (res) {
                console.log(res.data);
                if (res.data === 'success') {
                  wx.showModal({
                    title: '提示',
                    content: '信息删除成功',
                    showCancel: true,
                    success(res) {
                      wx.navigateTo({
                        url: '/pages/requestmanagement/requestmanagement',
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '删除失败，请稍后重试',
                    showCancel: true
                  })
                }
              }
            });
          } else if (res.cancel) {

          }
        }
      })
    }
  }
})
