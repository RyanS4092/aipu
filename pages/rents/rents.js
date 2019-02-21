// pages/rents/rents.js
Page({

  data: {
    rent: {
      rentimg: ['../../image/rent/rent2.jpg', '../../image/rent/rent3.jpg', '../../image/rent/rent4.jpg', '../../image/rent/rent5.jpg', '../../image/rent/rent6.jpg', '../../image/rent/rent7.jpg'],
      numbering: "0855321",
      title: "条山街200平米店铺因事急转转让费可协商条山街旺铺",
      region: "条山街",
      location: "北区条山街xxx号xxx火锅店对面",                    
      area: 200,
      description: "此地适宜开宾馆开酒店开饭店开ktv开洗车店开服装店",
      price: 6000,
      priceunit: "元/月",
      paymentcycle: "半年付",
      transferfee: "2万元",
      taglist: ["位置优越", "开ktv", "开酒店"],
      hot: "热门",
      maplocation: {
        latitude: 35.047330,
        longitude: 110.994610
      },
      mobile: "13112345678"
    },
    currentswiper: 1,
    countrentimgs: 0,
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
    }],
    markers:[]
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      currentswiper: e.detail.current + 1
    })
  },
  mapClick: function (e) {
    let latitude = this.data.rent.maplocation.latitude;
    let longitude = this.data.rent.maplocation.longitude;
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },
  onLoad: function (options) {
    let countrentimg = this.data.rent.rentimg.length;
    let latitude = this.data.rent.maplocation.latitude;
    let longitude = this.data.rent.maplocation.longitude;
    let iconPath = '../../image/icon/location.png';
    this.setData({
      countrentimgs: countrentimg,
      markers: [{
        latitude: latitude,
        longitude: longitude,
        iconPath: iconPath
      }]
    });
  },

  onReady: function () {

  },

  onShow: function () {

  }
})