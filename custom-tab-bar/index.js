Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#dd5454",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/tabbar/index_icon.png",
      selectedIconPath: "/image/tabbar/index_icon_red.png",
      text: "首页"
    }, {
      pagePath: "/pages/search/search",
      iconPath: "/image/tabbar/search_icon.png",
      selectedIconPath: "/image/tabbar/search_icon_red.png",
      text: "商铺查询"
    }, {
      pagePath: "/pages/user/user",
      iconPath: "/image/tabbar/user_icon.png",
      selectedIconPath: "/image/tabbar/user_icon_red.png",
      text: "个人中心"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})