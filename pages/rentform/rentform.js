// pages/rentform/rentform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageheight: null,
    specialties: [
      { value: '无转让费', checked: false },
      { value: '在商场内', checked: false },
      { value: '临近学校', checked: false },
      { value: '在学校内', checked: false },
      { value: '证照齐全', checked: false },
      { value: '租写字楼', checked: false },
      { value: '空房转让', checked: false },
      { value: '生意转让', checked: false },
      { value: '厂房场地', checked: false },
      { value: '仓库租售', checked: false },
      { value: '临街商铺', checked: false },
      { value: '小吃摊位', checked: false }
    ],
    specialtiesSelected: [],
    agentinform: [{
      agentavatar: "/image/agent/douzi.jpg",
      nametitle: "商铺管家-豆子",
      words: "完善信息，会加快转出哦，速度提高5倍以上"
    },
    {
      agentavatar: "/image/agent/zhenzhen.jpg",
      nametitle: "商铺管家-珍珍",
      words: "完善信息，会加快转出哦，速度提高5倍以上"
    }],
    regionrange: ["北区", "东区", "中心区", "西区", "南区", "禹都", "空港", "城郊各县"],
    regionindex: 0,
    cycle: ["月付", "季付", "半年付", "年付"],
    cycleindex: 0,
    selectlocation: false,
    mapinfo:{
      latitude: null,
      longitude: null
    },
    uploadimg: [{
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    },
    {
      imgsrc: null,
      uploadstatus: false
    }],
    hotpay: false,
    storeinfo: null
  },
  bindPickerChangeRegion(e) {
    this.setData({
      regionindex: e.detail.value
    })
  }, 
  bindPickerChangeCycle(e) {
    this.setData({
      cycleindex: e.detail.value
    })
  },
  specialtiesSelected(e){
    this.setData({
      specialtiesSelected: e.detail.value
    })
  },
  onCancel(e) {
    this.setData({
      hotpay: false
    })
  },
  rentSubmit(e) {
    const that = this;
    const formvalue = e.detail.value;
    const mapinfostatus = this.data.mapinfo.latitude;
    let uploadedimgs = [];
    const uploadimginfo = this.data.uploadimg;
    function reduceimg(imgs){
      if(imgs.uploadstatus){
        uploadedimgs.push(imgs.imgsrc)
      }
    };
    uploadimginfo.map(reduceimg);
    switch(true){
      case !formvalue.title:
        wx.showModal({
          title: '提示',
          content: '请填写信息标题'
        });
      break;
      case !formvalue.location:
        wx.showModal({
          title: '提示',
          content: '请填写详细地址'
        });
      break;
      case !formvalue.area:
        wx.showModal({
          title: '提示',
          content: '请填写店铺面积'
        });
      break;
      case !mapinfostatus:
        wx.showModal({
          title: '提示',
          content: '请添加商铺定位（点击商铺定位右侧绿色标志添加）'
        });
      break;
      case !formvalue.description:
        wx.showModal({
          title: '提示',
          content: '请添加详情描述'
        });
      break;
      case !that.data.specialtiesSelected[1]:
        wx.showModal({
          title: '提示',
          content: '请添加至少两个商铺特点'
        });
      break;
      case !uploadedimgs[0]:
        wx.showModal({
          title: '提示',
          content: '请上传至少一张店铺照片'
        });
      break;
      default:
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            const wechatId = res.data.wechatId;
            const regioninfo = that.data.regionrange[formvalue.region];
            const specialties = that.data.specialtiesSelected;
            const cycleinfo = that.data.cycle[formvalue.paymentcycle];
            const mapinfo = that.data.mapinfo;
            let transferfeedefault = 0;
            if (formvalue.transferfee) {
              transferfeedefault = formvalue.transferfee;
            };
            let price = 0;
            if (formvalue.price) {
              price = formvalue.price;
            };
            const storeinfo = {
              wechatId: wechatId,
              title: formvalue.title,
              region: regioninfo,
              location: formvalue.location,
              area: formvalue.area,
              price: price,
              paymentcycle: cycleinfo,
              transferfee: transferfeedefault,
              specialties: specialties,
              hot: formvalue.hot,
              description: formvalue.description,
              uploadimg: uploadedimgs,
              mapinfo: mapinfo
            }
            if(formvalue.hot){
              console.log(storeinfo);
              that.setData({
                hotpay: true,
                storeinfo: storeinfo
              });
            }else{
              const storeinfoStringify = JSON.stringify(storeinfo);
              wx.showModal({
                title: '提示',
                content: '上传商铺信息需要2铺币',
                success: modalres=>{
                  if(modalres.confirm){
                    wx.showLoading({
                      title: '信息提交中',
                    });
                    wx.request({
                      url: 'https://lingtongzixun.cn/SAPP/rentformsubmit',
                      method: 'post',
                      data: storeinfoStringify,
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
                  }else if(modalres.cancel){
                  }
                }
              })
            }
          }
        })
    }
  },
  selectlocation(){
    console.log("clicked");
    const that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          selectlocation: true,
          'mapinfo.latitude': res.latitude,
          'mapinfo.longitude': res.longitude
        })
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
  uploadimg(e){
    const that = this;
    const index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['album', 'camera'],
      success: function (res) {
        if (res.tempFiles[0].size < 512000){
          wx.showLoading({
            title: '图片上传中',
          })
          wx.uploadFile({
            url: 'https://lingtongzixun.cn/SAPP/uploadimg', 
            filePath: res.tempFilePaths[0],
            header: {
              "Content-Type": "multipart/form-data"
            },
            name: 'rentimgs',
            formData: {
              user: 'rentimgs'
            },
            success(res) {
              const imgData = JSON.parse(res.data);
              if (imgData.status == 'success'){
                that.setData({
                  ["uploadimg[" + index + "].imgsrc"]: imgData.newPath,
                  ["uploadimg[" + index + "].uploadstatus"]: true
                });
                wx.hideLoading();
              } else if (imgData.info == '仅支持jpeg和png格式的图片'){
                wx.showModal({
                  title: '提示',
                  content: '仅支持jpeg和png格式的图片',
                  showCancel: false
                })
                wx.hideLoading();
              }else{
                wx.showModal({
                  title: '提示',
                  content: '图片上传失败',
                  showCancel: false
                })
                wx.hideLoading();
              }
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '图片过大',
            showCancel: false
          })
        }
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      pageheight: wx.getSystemInfoSync().windowHeight
    });
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