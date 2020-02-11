// miniprogram/pages/addOneStu/addOneStu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu:{
      name: '',
      _id: '',
      sex: '',
      grade: '',
      college: '',
      major: '',
      class: '',
      tel: '',
      teacher: '',
      teacher_tel: '',
      campus: '',
      building: '',
      room: '',
      father: '',
      father_tel: '',
      mother: '',
      mother_tel: '',
      remark: ''
    }
    

  },

  confirm:function(){
    var that=this;
    var db=wx.cloud.database();
    if(that.data._id==''){
      wx.showModal({
        title: '错误',
        content: '学号不能为空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ea5858'
      })
    }else{
      wx.showLoading({
        title: 'connecting',
      })
      db.collection('students').where({
        _id:that.data.stu._id
      }).get({
        success:function(res){
          if(res.data.length>0){
            wx.hideLoading()
            wx.showModal({
              title: '错误',
              content: '学号已经存在',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: '#ea5858'
            })
          }else{
            wx.hideLoading()
            that.addStu()
          }
        }
      })
    }
  },

  addStu:function(){
    var that=this;

    wx.showModal({
      title: '添加信息',
      content: '确认添加' + that.data.stu.name + ' ' + that.data.stu._id + ' ?',
      confirmColor: '#ea5858',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: 'connecting',
          })
          wx.cloud.callFunction({
            name:'addOneStu',
            data:{
              stu:that.data.stu
            },
            success:function(res){
              wx.hideLoading()
              wx.showToast({
                title: '添加成功',
              })
              //console.log(res)
              setTimeout(function(){
                wx.navigateBack()
              },600)
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
      }
    })
  },

  inputName:function(e){
    //console.log(e.detail.value)
    var stu=this.data.stu;
    stu.name = e.detail.value
    this.setData({
      stu:stu
    })
  },
  inputID: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu._id = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputSex: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.sex = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputGrade: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.grade = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputCollege: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.college = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputMajor: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.major = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputClass: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.class = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputTel: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.tel = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputTeacher: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.teacher = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputTeacherTel: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.teacher_tel = e.detail.value
    this.setData({
      stu: stu
    })
  }, inputCampus: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.campus = e.detail.value
    this.setData({
      stu: stu
    })
  }, inputBuilding: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.building = e.detail.value
    this.setData({
      stu: stu
    })
  }, inputRoom: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.room = e.detail.value
    this.setData({
      stu: stu
    })
  }, inputFather: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.father = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputFatherTel: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.father_tel = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputMother: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.mother = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputMotherTel: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.mother_tel = e.detail.value
    this.setData({
      stu: stu
    })
  },
  inputRemark: function (e) {
    //console.log(e.detail.value)
    var stu = this.data.stu;
    stu.remark = e.detail.value
    this.setData({
      stu: stu
    })
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