// pages/search/search.js

Page({
  data: {
    selectlist: [{
      name: "区域",
      color: "#333333",
      fontsize: "14px",
      tap: "regionsearch",
      status: false,
      list: [{
        name: "北区",
        status: false
        }, {
        name: "东区",
        status: false
        }, {
        name: "中心区",
        status: false
        }, {
        name: "西区",
        status: false
        }, {
        name: "南区",
        status: false
        }, {
        name: "禹都",
        status: false
        }, {
        name: "空港",
        status: false
        }, {
        name: "城郊各县",
        status: false
        }]
    },{
      name: "面积",
      color: "#333333",
      fontsize: "14px",
      tap: "areasearch",
      status: false,
      list:[{
        name: "不限",
        status: false
      },{
          name: "20㎡以下",
          status: false
      },{
          name: "20-50㎡",
          status: false
      },{
          name: "50-100㎡",
          status: false
      },{
          name: "100-200㎡",
          status: false
      },{
          name: "200-500㎡",
          status: false
      },{
          name: "500㎡以上",
          status: false
      }]
    }, {
      name: "费用",
      color: "#333333",
      fontsize: "14px",
      tap: "feesearch",
      status: false,
      list:[{
        name: "不限",
        status: false
      },{
        name: "2千元以下",
        status: false
      },{
        name: "2-5千元",
        status: false
      },{
        name: "5千-1万元",
        status: false
      },{
        name: "1-2万元",
        status: false
      },{
        name: "2-5万元",
        status: false
      },{
        name: "5万元以上",
        status: false
      }]
    }, {
      name: "特征",
      color: "#333333",
      fontsize: "14px",
      tap: "speciatysearch",
      status: false,
      list: [{
        name: "无转让费",
        status: false
      },{
        name: "在商场内",
        status: false
      },{
        name: "临近学校",
        status: false
      },{
        name: "在学校内",
        status: false
      },{
        name: "证照齐全",
        status: false
      },{
        name: "租写字楼",
        status: false
      },{
        name: "空房转让",
        status: false
      },{
        name: "生意转让",
        status: false
      },{
        name: "厂房场地",
        status: false
      },{
        name: "仓库租售",
        status: false
      },{
        name: "临街商铺",
        status: false
      },{
        name: "小吃摊位",
        status: false
      }]
    }],
  rentinform: [],
  searchresults: true,
  currentTag: 0
  },
  clearall(e){
    const clearedselectlist = [{
      name: "区域",
      color: "#333333",
      fontsize: "14px",
      tap: "regionsearch",
      status: false,
      list: [{
        name: "北区",
        status: false
      }, {
          name: "东区",
          status: false
        }, {
          name: "中心区",
          status: false
        }, {
          name: "西区",
          status: false
        }, {
          name: "南区",
          status: false
        }, {
          name: "禹都",
          status: false
        }, {
          name: "空港",
          status: false
        }, {
          name: "城郊各县",
          status: false
        }]
    }, {
        name: "面积",
        color: "#333333",
        fontsize: "14px",
        tap: "areasearch",
        status: false,
        list: [{
          name: "不限",
          status: false
        }, {
            name: "20㎡以下",
            status: false
          }, {
            name: "20-50㎡",
            status: false
          }, {
            name: "50-100㎡",
            status: false
          }, {
            name: "100-200㎡",
            status: false
          }, {
            name: "200-500㎡",
            status: false
          }, {
            name: "500㎡以上",
            status: false
          }]
      }, {
        name: "费用",
        color: "#333333",
        fontsize: "14px",
        tap: "feesearch",
        status: false,
        list: [{
          name: "不限",
          status: false
        }, {
            name: "2千元以下",
            status: false
          }, {
            name: "2-5千元",
            status: false
          }, {
            name: "5千-1万元",
            status: false
          }, {
            name: "1-2万元",
            status: false
          }, {
            name: "2-5万元",
            status: false
          }, {
            name: "5万元以上",
            status: false
          }]
      }, {
        name: "特征",
        color: "#333333",
        fontsize: "14px",
        tap: "speciatysearch",
        status: false,
        list: [{
          name: "无转让费",
          status: false
        }, {
            name: "在商场内",
            status: false
          }, {
            name: "临近学校",
            status: false
          }, {
            name: "在学校内",
            status: false
          }, {
            name: "证照齐全",
            status: false
          }, {
            name: "租写字楼",
            status: false
          }, {
            name: "空房转让",
            status: false
          }, {
            name: "生意转让",
            status: false
          }, {
            name: "厂房场地",
            status: false
          }, {
            name: "仓库租售",
            status: false
          }, {
            name: "临街商铺",
            status: false
          }, {
            name: "小吃摊位",
            status: false
          }]
      }];
    const currentTag = this.data.currentTag;
    clearedselectlist[currentTag].status = true;
    this.setData({
      selectlist: clearedselectlist
    })
  },
  select(e){
    const index = e.currentTarget.dataset.index;
    const currentTag = this.data.currentTag;
    const status = this.data.selectlist[currentTag].list[index].status;
    const lists = this.data.selectlist[currentTag].list;
    const clearliststatus = item =>{
      item.status = false;
      return item;
    };
    const clearlists = lists.map(clearliststatus);
    const showName = this.data.selectlist[currentTag].list[index].name;
    if(status){
      this.setData({
        ['selectlist[' + currentTag + '].list[' + index + ']status']: false
      });
    }else{
      this.setData({
        ['selectlist[' + currentTag + '].list']: clearlists,
        ['selectlist[' + currentTag + '].list[' + index + ']status']: true,
        ['selectlist[' + currentTag + '].name']: showName,
        ['selectlist[' + currentTag + '].fontsize']: "12px",
        ['selectlist[' + currentTag + '].color']: "#dd5454"
      })
    }
  },
  selectlist(e){
    const index = e.currentTarget.dataset.item;
    const status = this.data.selectlist[index].status;
    if (status){
      this.setData({
        ['selectlist[' + index + '].status']: false,
        currentTag: index
      });
    }else{
      this.setData({
        'selectlist[0].status': false,
        'selectlist[1].status': false,
        'selectlist[2].status': false,
        'selectlist[3].status': false,
        ['selectlist[' + index + '].status']: true,
        currentTag: index
      });
    }
  },
  selectSubmit(e){
    const that = this;
    const selects = {
      region: '',
      area: '',
      fee: '',
      specialty: ''
    };
    const selectsKeys = ["region", "area", "fee", "specialty"];
    let selectIndex = 0;
    const maplists = item =>{
      const currentKey = selectsKeys[selectIndex];
      if(item.status){
        selects[currentKey] = item.name;
      }
    }
    const mapselects = num =>{
      selectIndex = num;
      return that.data.selectlist[selectIndex].list.map(maplists);
    }
    [0, 1, 2, 3].map(mapselects);
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/selects',
      data: selects,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        if (res.data[0]) {
          that.setData({
            searchresults: true,
            rentinform: res.data,
            'selectlist[0].status': false,
            'selectlist[1].status': false,
            'selectlist[2].status': false,
            'selectlist[3].status': false
          });
          wx.hideLoading();
        } else {
          that.setData({
            searchresults: false,
            rentinform: [],
            'selectlist[0].status': false,
            'selectlist[1].status': false,
            'selectlist[2].status': false,
            'selectlist[3].status': false
          });
          wx.hideLoading();
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '获取信息失败，请稍后重试',
          showCancel: false
        })
      }
    })
  },
  searchsubmit(e){
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    if(e.detail.value){
      const keyword = {
        keyword: e.detail.value
      }
      const keywordStringify = JSON.stringify(keyword);
      wx.request({
        url: 'https://lingtongzixun.cn/SAPP/searchbar',
        data: keywordStringify,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function(res){
          if(res.data[0]){
            that.setData({
              searchresults: true,
              rentinform: res.data,
              'selectlist[0].status': false,
              'selectlist[1].status': false,
              'selectlist[2].status': false,
              'selectlist[3].status': false
            });
            wx.hideLoading();
          }else{
            that.setData({
              searchresults: false,
              rentinform: [],
              'selectlist[0].status': false,
              'selectlist[1].status': false,
              'selectlist[2].status': false,
              'selectlist[3].status': false
            });
            wx.hideLoading();
          }
        },
        fail: function(res){
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '获取信息失败，请稍后重试',
            showCancel: false
          })
        }
      })
    }else{
      const that = this;
      wx.request({
        url: 'https://lingtongzixun.cn/SAPP/indexhot',
        data: '',
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            rentinform: res.data
          });
          wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '数据获取失败，请退出后重试',
          })
        }
      })
    }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const that = this;
    wx.request({
      url: 'https://lingtongzixun.cn/SAPP/indexhot',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          rentinform: res.data
        });
        wx.hideLoading();
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '数据获取失败，请退出后重试',
        })
      }
    })
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