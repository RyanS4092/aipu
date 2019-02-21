// components/rentsbar/rentsbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rentsmobile: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: {
      collection: "/image/icon/collection.png",
      share: "/image/icon/wechat.png",
      call: "/image/icon/call.png"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    callrents(e){
      let mobile = e.currentTarget.dataset.mobile;
      wx.makePhoneCall({
        phoneNumber: mobile
      })
    }
  }
})
