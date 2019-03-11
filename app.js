//app.js
App({
  onLaunch: function () {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']){
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
        }else{
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  }
})