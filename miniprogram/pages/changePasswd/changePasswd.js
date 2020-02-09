// miniprogram/pages/changePasswd/changePasswd.js
const md5 = require('../md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwd:['','',''],
    username:''
  },

  inputPasswd:function(e){
    //console.log(e)
    var pwd=e.detail.value;
    var id=parseInt(e.currentTarget.dataset.id);
    var passwd=this.data.passwd;
    passwd[id]=pwd;
    this.setData({
      passwd:passwd
    })
    //console.log(passwd)
  },

  confirm:function(){
    var passwd=this.data.passwd;
    var db=wx.cloud.database();
    var username=this.data.username;
    var that=this;
    if(passwd[0]=='' || passwd[1]=='' || passwd[2]==''){
      wx.showModal({
        title: '错误',
        content: '密码不能为空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }else if(passwd[0]==passwd[1]){
      wx.showModal({
        title: '错误',
        content: '原密码和新密码不能一致！',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }else if(passwd[1]!=passwd[2]){
      wx.showModal({
        title: '错误',
        content: '两次输入的新密码不一致！',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }else{
      wx.showModal({
        title: '确认',
        content: '确认修改？',
        confirmColor: '#ea5858',
        success(res){
          if(res.confirm){
            wx.showLoading({
              title: 'connecting',
            })
            let old_code = md5.hexMD5(passwd[0]);
            db.collection('users').where({
              _id:username
            }).get({
              success:function(res){
                //console.log(res.data[0].passwd)
                if (old_code==res.data[0].passwd){
                  that.changePasswd(username,passwd[1]);
                }else{
                  wx.hideLoading()
                  wx.showModal({
                    title: '修改失败',
                    content:'原密码错误',
                    showCancel: false,
                    confirmText: '我知道了',
                    confirmColor: '#ea5858'
                  })
                }
              },
              fail:function(err){
                wx.hideLoading()
                wx.showModal({
                  title: '修改失败',
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
    }

  },

  changePasswd:function(username,new_passwd){
    let code = md5.hexMD5(new_passwd);
    var that=this;
    wx.showLoading({
      title: 'connecting',
    })
    wx.cloud.callFunction({
      name: 'changePasswd',
      data: {
        username: username,
        code: code
      },
      success: function (res) {
        //!!success
        wx.hideLoading()
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 600)
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showModal({
          title: '修改失败',
          content: '请检查网络连接',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ea5858'
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username=options.username;
    this.setData({
      username:username
    })

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