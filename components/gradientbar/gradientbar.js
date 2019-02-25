// components/gradientbar/gradientbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    agentinform: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentagent:{
      agentavatar: "/image/agent/douzi.jpg",
      nametitle: "商铺管家-豆子",
      words: "完善信息，会加快转出哦，速度提高5倍以上"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      const randomnum = Math.floor(Math.random() * 2);
      const currentagent = this.data.agentinform[randomnum];
      this.setData({
        currentagent: currentagent
      })
    }
  }
})
