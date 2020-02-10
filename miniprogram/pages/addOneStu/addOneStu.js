// miniprogram/pages/addOneStu/addOneStu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    _id:'',
    sex:'',
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
    remark: '',

  },

  confirm:function(){
    

  },

  inputName:function(e){
    //console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  inputID: function (e) {
    //console.log(e.detail.value)
    this.setData({
      _id: e.detail.value
    })
  },
  inputSex: function (e) {
    //console.log(e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  inputGrade: function (e) {
    //console.log(e.detail.value)
    this.setData({
      grade: e.detail.value
    })
  },
  inputCollege: function (e) {
    //console.log(e.detail.value)
    this.setData({
      college: e.detail.value
    })
  },
  inputMajor: function (e) {
    //console.log(e.detail.value)
    this.setData({
      major: e.detail.value
    })
  },
  inputClass: function (e) {
    //console.log(e.detail.value)
    this.setData({
      class: e.detail.value
    })
  },
  inputTel: function (e) {
    //console.log(e.detail.value)
    this.setData({
      tel: e.detail.value
    })
  },
  inputTeacher: function (e) {
    //console.log(e.detail.value)
    this.setData({
      teacher: e.detail.value
    })
  },
  inputTeacherTel: function (e) {
    //console.log(e.detail.value)
    this.setData({
      teacher_tel: e.detail.value
    })
  }, inputCampus: function (e) {
    //console.log(e.detail.value)
    this.setData({
      campus: e.detail.value
    })
  }, inputBuilding: function (e) {
    //console.log(e.detail.value)
    this.setData({
      building: e.detail.value
    })
  }, inputRoom: function (e) {
    //console.log(e.detail.value)
    this.setData({
      room: e.detail.value
    })
  }, inputFather: function (e) {
    //console.log(e.detail.value)
    this.setData({
      father: e.detail.value
    })
  },
  inputFatherTel: function (e) {
    //console.log(e.detail.value)
    this.setData({
      father_tel: e.detail.value
    })
  },
  inputMother: function (e) {
    //console.log(e.detail.value)
    this.setData({
      mother: e.detail.value
    })
  },
  inputMotherTel: function (e) {
    //console.log(e.detail.value)
    this.setData({
      mother_tel: e.detail.value
    })
  },
  inputRemark: function (e) {
    //console.log(e.detail.value)
    this.setData({
      remark: e.detail.value
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