// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    red1: '#ea5858',
    show:[true,false],
    nothing:true,
    input_value:'',
    tarbar_style:[
      'opacity:1;height:40px;width:100px;',
      'opacity:0.5'
    ],
    res:[],
    detail:false,
    select_data:'',
    select_i:'',
    role:0,
    username:'none',
    max_limit:10,
    skip:0,
    last_input:'',
    show_more:false


  },

  openDetail:function(e){
    this.setData({
      detail:!this.data.detail
    })
  },
  /**
   * select detail
   */
  select:function(e){
    var i = parseInt(e.currentTarget.dataset.id)
    var res=this.data.res;

    this.setData({
      select_data:res[i],
      select_i:i
    })

    this.openDetail()
  },
  /**
   * close detail
   */
  closeDetail:function(e){
    //console.log(e.detail)
    if(e.detail){
      this.sql(this.data.input_value)
    }
    this.setData({
      detail:false
    })
  },
  /**
   * alter detail
   */
  alterData:function(e){
    var that=this;
    //console.log(e.detail)
    var input_value=this.data.input_value;
    //console.log(res)
    wx.showLoading({
      title: 'connecting',
    })
    wx.cloud.callFunction({
      name:'alterOneStu',
      data:e.detail,
      success:function(res1){
        wx.hideLoading()
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(function(){
          that.sql(input_value)
        },600)
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
    
  },  
  /**
   * input
   */
  inputSearch:function(e){
    //console.log(e.detail.value)
    this.setData({
      input_value: e.detail.value
    })
  },

  /**
   * search
   */
  confirmInput:function(e){
    //console.log(this.data.input_value)
    var input_value=this.data.input_value;
    var db=wx.cloud.database();
    var that=this;
    var _=db.command
    if(input_value==''){
      wx.showModal({
        title: '无效',
        content: '输入内容不能为空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: that.data.red1
      })
      that.setData({
        nothing:true
      })
    }else{
      that.sql(input_value)
    }
    
  },

  /**
   * search in database
   */

  sql:function(input_value){
    var db = wx.cloud.database();
    var that = this;
    var show_more=false;
    var max_limit = this.data.max_limit;
    var _ = db.command
    wx.showLoading({
      title: '查询中',
    })
    db.collection('students').where(_.or([
    {
        _id: parseInt(input_value)
    },
    {
      name: db.RegExp({
        regexp: input_value,
        option: 'isg'
      })
    },
    {
      _id: db.RegExp({
        regexp: input_value,
        option: 'isg'
      })
    }
    ])).limit(max_limit).get({
      success: function (res) {
        //console.log(res.data)
        if (res.data.length == 0) {
          that.setData({
            nothing: true
          })
          wx.hideLoading()
          wx.showToast({
            title: '无匹配',
            image: '../../images/error.png'
          })
        } else {
          //success!
          if(res.data.length<max_limit){
            show_more=false
          }else{
            show_more=true
          }
          that.setData({
            res: res.data,
            skip:0,
            last_input:input_value,
            show_more: show_more,
            nothing: false
          })
          wx.hideLoading()
        }
      },
      fail: function (res) {
        //console.log('error')
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

  /**
   * tarbar part
   */
  switch:function(e){
    var id = parseInt(e.currentTarget.dataset.id)
    //console.log(e.currentTarget.dataset.id)
    var show=this.data.show;
    var tarbar_style = this.data.tarbar_style;
    for(var i=0;i<show.length;i++){
      if(i==id){
        show[i]=true;
        tarbar_style[i] = 'opacity:1;height:40px;';
      }else{
        show[i]=false;
        tarbar_style[i] = 'opacity:0.5;height:35px;';
      }
    }
    this.setData({
      show:show,
      tarbar_style: tarbar_style
    })
  },

  /**
   * setAccount
   */
  setAccount:function(e){
    var role=this.data.role;
    wx.navigateTo({
      url: '../account/account?role='+role,
    })
  },
  changePasswd:function(e){
    var username=this.data.username;
    wx.navigateTo({
      url: '../changePasswd/changePasswd?username=' + username,
    })
  },
  /**
   * uploadFile
   */
  addOneStu:function(e){
    wx.navigateTo({
      url: '../addOneStu/addOneStu'
    })
  },
  deleteStudents:function(){
    wx.navigateTo({
      url: '../deleteStudents/deleteStudents',
    })
  },

  /**
   * exit
   */
  exit:function(){
    wx.showModal({
      title: 'exit',
      content: '确认退出？', 
      confirmColor: '#ea5858',
      cancelColor: 'rgba(50,50,50,0.6)',
      success(res) {
        if(res.confirm){
          wx.reLaunch({
            url: '../index/index',
          })
        }
      }
    })
  },

  /**
   * showMore
   */
  showMore:function(){
    var last_input = this.data.last_input;
    var that=this;
    var db=wx.cloud.database();
    var _ = db.command;
    var max_limit = this.data.max_limit;
    var skip=this.data.skip;
    skip = skip + max_limit;
    wx.showLoading({
      title: '查询中',
    })
    db.collection('students').where(_.or([
      {
        _id: parseInt(last_input)
      },
      {
        name: db.RegExp({
          regexp: last_input,
          option: 'isg'
        })
      },
      {
        _id: db.RegExp({
          regexp: last_input,
          option: 'isg'
        })
      }
    ])).skip(skip).limit(max_limit).get({
      success: function (res) {
        console.log(res.data)
        if (res.data.length == 0) {
          wx.hideLoading()
          wx.showToast({
            title: '没有更多了',
            image: '../../images/error.png'
          })
          that.setData({
            show_more:false
          })
        } else {
          //success!
          that.setData({
            res: that.data.res.concat(res.data),
            skip:skip,
            show_more: (res.data.length < max_limit) ? false : true 
          })
          wx.hideLoading()
        }
      },
      fail: function (res) {
        //console.log('error')
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(typeof(options.role))
    var role_names=['普通用户','管理员','root','su'];

    this.setData({
      role: parseInt(options.role),
      role_name: role_names[parseInt(options.role)],
      username: options.username
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
    wx.hideHomeButton()
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