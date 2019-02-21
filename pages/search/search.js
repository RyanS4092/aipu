// pages/search/search.js

Page({
  data: {
    selectlist: [{
      name: "区域",
      color: "#333333",
      fontsize: "14px"
    },{
      name: "面积",
      color: "#333333",
      fontsize: "14px"
    }, {
      name: "费用",
      color: "#333333",
      fontsize: "14px"
    }, {
      name: "类型",
      color: "#333333",
      fontsize: "14px"
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
    taglist: ["位置优越", "开ktv", "开酒店"]
  }, {
    rentimg: "../../image/rent/rent1.jpg",
    region: "条山街",
    area: 200,
    description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
    price: 6000,
    priceunit: "元/月",
    taglist: ["位置优越", "开ktv", "开酒店"]
  }, {
    rentimg: "../../image/rent/rent1.jpg",
    region: "条山街",
    area: 200,
    description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
    price: 6000,
    priceunit: "元/月",
    taglist: ["位置优越", "开ktv", "开酒店"]
  }]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  makeacall(e) {
    wx.makePhoneCall({
      phoneNumber: '0359 8888888'
    })
  }
})