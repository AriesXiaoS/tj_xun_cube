// miniprogram/pages/deleteStudents/deleteStudents.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grades: [{"_id":'加载中'}],
    grade_i:0,
    choose_grade:false,
    majors: [{ "_id": '加载中' }],
    major_i: 0,
    choose_major: false,

  },

  deleteBtn:function(){
    var that=this;
    var choose_grade = this.data.choose_grade;
    var choose_major = this.data.choose_major;
    var grades=this.data.grades;
    var majors = this.data.majors;
    var grade_i = this.data.grade_i;
    var major_i = this.data.major_i;
    if (choose_grade && !choose_major){
      //grade
      var where_object = { 'grade': grades[grade_i]._id}
      wx.showModal({
        title: '删除',
        content: '确认删除所有 ' + grades[grade_i]._id +' 的信息？',
        confirmColor:'#ea5858',
        success(res){
          if(res.confirm){
            that.deleteStudents(where_object)
          }
        }
      })
    } else if (!choose_grade && choose_major){
      //major
      var where_object = { 'major': majors[major_i]._id }
      wx.showModal({
        title: '删除',
        content: '确认删除所有 ' + majors[major_i]._id + ' 的信息？',
        confirmColor: '#ea5858',
        success(res) {
          if (res.confirm) {
            that.deleteStudents(where_object)
          }
        }
      })
    } else if (choose_grade && choose_major){
      //grade and major
      var where_object = { 
        'major': majors[major_i]._id,
        'grade': grades[grade_i]._id
        }
      wx.showModal({
        title: '删除',
        content: '确认删除所有 ' + grades[grade_i]._id+' & '+ majors[major_i]._id + ' 的信息？',
        confirmColor: '#ea5858',
        success(res) {
          if (res.confirm) {
            that.deleteStudents(where_object)
          }
        }
      })
    } else{
      wx.showModal({
        title: '错误',
        content: '请先选择分类',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }
  },

  deleteStudents:function(where_object){
    var that=this;
    wx.showLoading({
      title: 'connecting',
    })
    wx.cloud.callFunction({
      name:'deleteStudents',
      data:{
        'where_object': where_object
      },
      success:function(res){
        //console.log(res.result.stats.removed)
        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
        })
        setTimeout(function(){
          that.getGrades();
          that.getMajors();
        },600)
      },
      fail:function(err){
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

  },

  changeGrade:function(e){
    this.setData({
      grade_i:parseInt(e.detail.value)
    })
  },
  changeMajor: function (e) {
    this.setData({
      major_i: parseInt(e.detail.value)
    })
  },

  chooseGrade:function(){
    if(!this.data.choose_grade){
      this.getGrades()
    }
    this.setData({
      choose_grade:! this.data.choose_grade
    })
  },
  chooseMajor: function () {
    if (!this.data.choose_major) {
      this.getMajors()
    }
    this.setData({
      choose_major: !this.data.choose_major
    })
  },
  /**
   * getClasses
   */
  getGrades: function () {
    wx.showLoading({
      title: 'connecting',
    })
    var db = wx.cloud.database();
    var that = this;
    var _ = db.command
    var $ = _.aggregate
    db.collection('students')
      .aggregate().group({
        _id: '$grade',
        count: $.sum(1)
      }).end().then(
        res => {
          wx.hideLoading()
          that.setData({
            grades: res.list
          })
          //console.log(res)
        },
        err => {
          wx.hideLoading()
          wx.showToast({
            title: '网络连接失败',
            image: '../../images/error.png'
          })
        }
      )
  },
  getMajors: function () {
    wx.showLoading({
      title: 'connecting',
    })
    var db = wx.cloud.database();
    var that = this;
    var _ = db.command
    var $ = _.aggregate
    db.collection('students')
      .aggregate().group({
        _id: '$major',
        count: $.sum(1)
      }).end().then(
        res => {
          wx.hideLoading()
          that.setData({
            majors: res.list
          })
          //console.log(res)
        },
        err=>{
          wx.hideLoading()
          wx.showToast({
            title: '网络连接失败',
            image:'../../images/error.png'
          })
        }
      )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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