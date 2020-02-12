// miniprogram/pages/account/account.js
const md5 = require('../md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts:[],
    show_delete: [
      [false, false, false, false],
      [true, false, false, false],
      [true, true, false, false],
      [true, true, true, false]],
    roles:['user','admin'],
    role_names:['普通用户','管理员','root','su'],
    adding:false,
    selected:0,
    role_style:['background-color:#ea5858;font-weight:bold;color:white;',
      'background-color:rgba(0,0,0,0); font-weight: regular; color: #ea5858;'],
    role_true:'background-color:#ea5858;font-weight:bold;color:white;',
    role_false:'background-color:rgba(0,0,0,0); font-weight: regular; color: #ea5858;',
    username:'',
    passwd:'',



  },
  /**
   * tap delete
   */
  deleteAccount:function(e){
    //console.log(e.currentTarget.dataset.id)
    var i = e.currentTarget.dataset.id;
    var that=this;
    var username = this.data.accounts[e.currentTarget.dataset.id]._id;
    //console.log(username)
    wx.showModal({
      title: '确认删除？',
      content: '确认删除用户：' + username+' ?',
      confirmColor:'#ea5858',
      cancelColor:'rgba(50,50,50,0.6)',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: 'connecting',
          })
          wx.cloud.callFunction({
            name: 'deleteAccount',
            data: {
              username: username
            },
            success: function (res1) {
              //console.log(res1)
              wx.hideLoading()
              wx.showToast({
                title: '删除成功！',
              })
              that.getAccounts()
            },
            fail: function (err) {
              wx.hideLoading()
              wx.showModal({
                title: '删除失败',
                content: '请检查网络连接',
                showCancel: false,
                confirmText: '我知道了',
                confirmColor: '#ea5858'
              })
            }
          })
        }
      }
    })
    
  },

  choseRole:function(e){
    //console.log(e.currentTarget.dataset.id)
    var role_style = this.data.role_style;
    var selected = e.currentTarget.dataset.id
    var roles=this.data.roles;
    for (var i = 0; i < roles.length;i++){
      if(i==selected){
        role_style[i]=this.data.role_true
      }else{
        role_style[i] = this.data.role_false
      }
    }
    this.setData({
      role_style:role_style,
      selected:selected
    })
  },
  /**
   * addAccount
   */
  addBtn:function(){
    this.setData({
      adding:true
    })
  },
  cancelAdd:function(){
    this.setData({
      adding: false
    })
  },
  createAccount:function(username,passwd,role){
    var that=this;
    let code = md5.hexMD5(passwd);
    wx.showLoading({
      title: 'connecting',
    })
    wx.cloud.callFunction({
      name: 'createAccount',
      data: {
        username: username,
        passwd: code,
        role: role
      },
      success: function (res1) {
        //console.log(res1)
        wx.hideLoading()
        wx.showToast({
          title: '添加成功！',
        })
        that.getAccounts()
        that.setData({
          adding: false
        })
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showModal({
          title: '添加失败',
          content: '请检查网络连接',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ea5858'
        })
      }
    })
  },
  confirmAdd:function(){
    var username=this.data.username;
    var passwd=this.data.passwd
    var role = this.data.selected;
    var that=this;
    if(username==''){
      wx.showModal({
        title: '注意',
        content: '请填写用户名',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }else if (passwd==''){
      wx.showModal({
        title: '注意',
        content: '请输入密码',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }else{
      var db=wx.cloud.database();
      wx.showLoading({
        title: 'connecting',
      })
      db.collection('users').where({
        _id:username
      }).get({
        success:function(res){
          //console.log(res.data.length)
          if (res.data.length!=0){
            wx.hideLoading()
            wx.showModal({
              title: '用户名重复!',
              content: '请修改用户名',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: '#ea5858'
            })
          }else{
            //start to create new account into database
            that.createAccount(username,passwd,role)
          }
        },
        fail:function(res){
          wx.hideLoading()
          wx.showModal({
            title: '添加失败',
            content: '请检查网络连接',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#ea5858'
          })
        }
      })

    }

    
  },

  /**
   * get account
   */
  getAccounts:function(){
    
    var db=wx.cloud.database();
    var that=this;
    db.collection('users').orderBy('role','asc').get({
      success:function(res){
        //console.log(res.data)
        wx.hideLoading()
        that.setData({
          accounts:res.data
        })
      },
      fail:function(err){
        wx.hideLoading()
        wx.showModal({
          title: '查询失败',
          content: '请检查网络连接',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ea5858'
        })
      }
    })

  },

  inputUsername:function(e){
    //console.log(e.detail.value)
    this.setData({
      username: e.detail.value
    })
  },

  inputPasswd:function(e){
    //console.log(e.detail.value)
    this.setData({
      passwd: e.detail.value
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var role=parseInt(options.role);
    var roles=['普通用户','管理员','root'];
    roles=roles.slice(0,role);
    //console.log(roles)
    this.setData({
      roles:roles,
      my_role:role
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: 'connecting',
    })
    this.getAccounts()
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