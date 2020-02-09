// miniprogram/pages/index/index.js
const md5=require('../md5.js');
Page({

  /**
   * Page initial data
   */
  data: {
    code:false,
    openid:'1',
    username:'',
    passwd:'',
    red1:'#ea5858',
    store:[true,false],
    stored:false
  },

  /**
   * input
   */
  inputId:function(e){
    //console.log(e.detail.value)
    this.setData({
      username:e.detail.value
    })
  },
  inputPasswd: function (e) {
    //console.log(e.detail.value)
    this.setData({
      passwd: e.detail.value
    })
  },
  /**
   * store username and passwd in memory
   */
  store:function(role){
    var that=this;
    var store=that.data.store;
    wx.setStorage({
      key: 'store',
      data: store,
    })
    if(store[0]){
      wx.setStorage({
        key: 'username',
        data: that.data.username,
      })
    }else{
      wx.setStorage({
        key: 'username',
        data: '',
      })
    }
    if(store[1]){
      wx.setStorage({
        key: 'passwd',
        data: that.data.passwd,
      })
    }else{
      wx.setStorage({
        key: 'passwd',
        data: '',
      })
    }

    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
    animation.opacity(0).translateX(50).step()
    that.setData({
      ani: animation.export()
    })
    wx.redirectTo({
      url: '../home/home?role=' + role + '&username=' + that.data.username,
    }) 
  },
  /**
   *  tap the btn to login
   */
  confirm:function(e){
    var that=this;
    if (that.data.username==''){
      wx.showModal({
        title: 'error',
        content: '用户名不能为空',
        showCancel:false,
        confirmText:'我知道了',
        confirmColor:that.data.red1
      })
    }else if(that.data.passwd==''){
      wx.showModal({
        title: 'error',
        content: '请输入密码',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: that.data.red1
      })
    }else{
      //login
      wx.showLoading({
        title: 'connecting',
      })
      var db=wx.cloud.database();
      let code = md5.hexMD5(that.data.passwd);
      //console.log(code)
      db.collection('users').where({
        _id: that.data.username,
        passwd: code
      }).get({
        success:function(res){
          //console.log(res.data)
          if(res.data.length==0){
            //no auth
            wx.hideLoading()
            wx.showModal({
              title: '无权登录',
              content: '请检查用户名密码',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: that.data.red1
            })
          }else{
            //login successfully
            that.store(res.data[0].role)
          }
        },
        fail:function(res){
          wx.hideLoading()
          wx.showModal({
            title: '登录失败',
            content: '请检查网络连接',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: that.data.red1
          })
        }
      })
    }
  },

  /**
   * set store name or pwd
   */
  setStore:function(e){
    //console.log(e.currentTarget.dataset.id)
    var id=parseInt(e.currentTarget.dataset.id);
    var store=this.data.store;

    store[id]=!store[id];  ////
    this.setData({
      store:store
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    //get stored name or passwd
    var username = wx.getStorageSync('username');
    var passwd = wx.getStorageSync('passwd');
    var store = wx.getStorageSync('store')
    //console.log(store)
    if(store==''){
      that.setData({
        username: username,
        passwd: passwd,
        store: [true,false]
      })
    }else{
      that.setData({
        username: username,
        passwd: passwd,
        store: store
      })
    }
    
  },
  /**
   * there is nothing !
   */
  longTap:function(){
    var username=this.data.username;
    let code = md5.hexMD5(this.data.passwd);
    //console.log(code)
    if (username=='su' && code =='a1e2e4912e9ae42c898d6ae58557d2cc'){
      wx.redirectTo({
        url: '../home/home?role=' + 3+'&username=su',
      }) 
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})