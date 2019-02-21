// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar:[{
      name: "转铺",
      status: true,
    },{
      name: "求租",
      status: false
    }],
    rentinform: [{
      rentimg: "../../image/rent/rent1.jpg",
      region: "条山街",
      area: 200,
      description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
      price: 6000,
      priceunit: "元/月",
      taglist: ["位置优越", "开ktv", "开酒店"],
      hot: "热门"
    }, {
      rentimg: "../../image/rent/rent1.jpg",
      region: "条山街",
      area: 200,
      description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
      price: 6000,
      priceunit: "元/月",
      taglist: ["位置优越", "开ktv", "开酒店"],
      hot: "热门"
    }, {
      rentimg: "../../image/rent/rent1.jpg",
      region: "条山街",
      area: 200,
      description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
      price: 6000,
      priceunit: "元/月",
      taglist: ["位置优越", "开ktv", "开酒店"],
      hot: "热门"
    }, {
      rentimg: "../../image/rent/rent1.jpg",
      region: "条山街",
      area: 200,
      description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
      price: 6000,
      priceunit: "元/月",
      taglist: ["位置优越", "开ktv", "开酒店"],
      hot: "热门"
    }, {
      rentimg: "../../image/rent/rent1.jpg",
      region: "条山街",
      area: 200,
      description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
      price: 6000,
      priceunit: "元/月",
      taglist: ["位置优越", "开ktv", "开酒店"],
      hot: "热门"
    }],
    requestinform: [{
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }, {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }, {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }, {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }, {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }, {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }, {
      title: "求租条山街火锅门面",
      preferlocation: "条山街",
      area: "500~1000",
      budget: "2000~10000",
      time: "1小时前"
    }]
  },
  barclick(e){
    var index = e.currentTarget.dataset.index;
    if( index === 0 ){
      this.setData({
        'bar[0].status':true,
        'bar[1].status':false
      })
    }else{
      this.setData({
        'bar[0].status': false,
        'bar[1].status': true
      })
    }
    
  },
  onLoad: function (options) {

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