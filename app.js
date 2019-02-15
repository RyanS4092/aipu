//app.js
App({
  onLaunch: function () {
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
                  if (data.data.unionId) {
                    wx.setStorage({
                      key: 'userInfo',
                      data: data.data
                    });
                    wx.getStorage({
                      key: 'userInfo',
                      success(res) {
                        console.log(res.data)
                      }
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})