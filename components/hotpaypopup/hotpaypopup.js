// components/hotpaypopup/hotpaypopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageheight:{
      type: Number,
      value: 0
    },
    rentid:{
      type: String,
      value: ""
    },
    storeinfo:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    popCheckitem:[{
      name: "1天（15铺币）",
      value: 1,
      checked: true,
      coins: 15
    },{
      name: "3天（40铺币）",
      value: 3,
      checked: false,
      coins: 40
    },{
      name: "7天（90铺币）",
      value: 7,
      checked: false,
      coins: 90
    },{
      name: "30天（349铺币）",
      value: 30,
      checked: false,
      coins: 349
    }],
    selectedValue: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange(e){
      const days = e.detail.value - 0;
      this.setData({
        selectedValue: days
      });
    },
    cancel(){
      this.setData({
        selectedValue: 1
      })
      const cancelDetail = {} // detail对象，提供给事件监听函数
      const cancelOption = {} // 触发事件的选项
      this.triggerEvent('cancel', cancelDetail, cancelOption)
    },
    hotpay(e) {
      console.log(e);
      const that = this;
      const data = e.currentTarget.dataset;
      const days = this.data.selectedValue;
      let coins = 0;
      console.log(days);
      switch (true) {
        case days === 1:
          coins = 15
          break;
        case days === 3:
          coins = 40
          break;
        case days === 7:
          coins = 90
          break;
        case days === 30:
          coins = 349
          break;
      };
      console.log(coins);
      if(data.rentid){
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            const wechatId = res.data.wechatId;
            const infos = {
              rentid: data.rentid,
              days: days,
              coins: coins,
              wechatId: wechatId
            }
            const infostringify = JSON.stringify(infos);
            console.log(infostringify);
            wx.request({
              url: 'https://lingtongzixun.cn/SAPP/toHot',
              data: infostringify,
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success: function (res) {
                if (res.data === "Insufficient balance") {
                  wx.showModal({
                    title: '提示',
                    content: '余额不足，是否前去充值？',
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/charge/charge',
                        })
                      } else if (res.cancel) {
                        that.setData({
                          selectedValue: 1
                        })
                        const cancelDetail = {} // detail对象，提供给事件监听函数
                        const cancelOption = {} // 触发事件的选项
                        that.triggerEvent('cancel', cancelDetail, cancelOption)
                      }
                    }
                  })
                } else if (res.data === "success") {
                  wx.showModal({
                    title: '提示',
                    content: '成功登上热门！',
                    showCancel: false,
                    success: res => {
                      const cancelDetail = {}; // detail对象，提供给事件监听函数
                      const cancelOption = {}; // 触发事件的选项
                      that.triggerEvent('cancel', cancelDetail, cancelOption);
                      wx.navigateTo({
                        url: '/pages/rentmanagement/rentmanagement',
                      });
                    }
                  })
                }
              }
            })
          }
        })
      }else if (data.storeinfo){
        const infos = {
          days: days,
          coins: coins,
          storeinfo: data.storeinfo
        }
        const infoStringify = JSON.stringify(infos);
        console.log(infoStringify);
        wx.showLoading({
          title: '信息提交中',
        })
        wx.request({
          url: 'https://lingtongzixun.cn/SAPP/rentformsubmit',
          method: 'post',
          data: infoStringify,
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
                  url: '/pages/rentmanagement/rentmanagement',
                })
              }
            })
          }
        })
      }
    }
  }
})
