// components/detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    select_data:{
      type:Object,
      value:''
    },
    role:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    changing:false,
    data:'',
    init_data:'',
    user:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * close the component
     */
    close:function(){
      this.triggerEvent('close',false)
    },
    closeUpdate: function () {
      this.triggerEvent('close', true)
    },
    /**
     * change alter
     */
    change:function(){
      this.setData({
        changing:true
      })
    },
    /**
     * deleteOneStu
     */
    deleteOneStu:function(){
      var that=this;
      wx.showModal({
        title: '确认删除',
        content: '确认删除 ' + that.data.data.name + ' ' + that.data.data._id + ' ?',
        confirmColor:'#ea5858',
        success(res){
          if(res.confirm){
            wx.showLoading({
              title: 'connecting',
            })
            wx.cloud.callFunction({
              name: 'deleteOneStu',
              data: {
                stuid: that.data.data[1]
              },
              success: function (res) {
                wx.showToast({
                  title: '删除成功',
                })
                setTimeout(function(){
                  that.closeUpdate()
                },800)
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
    /**
     * input  (i give up 'for' block)
     */
    inputName:function(e){
      //console.log(e)
      var data = this.data.data;
      data.name=e.detail.value;
      //console.log(data.name)
      this.setData({
        data: data
      })
    },
    inputSex: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.sex = e.detail.value;
      //console.log(data.sex)
      this.setData({
        data: data
      })
    },
    inputGrade: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.grade = e.detail.value;
      //console.log(data.grade)
      this.setData({
        data: data
      })
    },
    inputCollege: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.college = e.detail.value;
      //console.log(data.college)
      this.setData({
        data: data
      })
    },
    inputMajor: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.major = e.detail.value;
      //console.log(data.major)
      this.setData({
        data: data
      })
    },
    inputClass: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.class = e.detail.value;
      console.log(data.class)
      this.setData({
        data: data
      })
    },
    inputTel: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.tel = e.detail.value;
      //console.log(data.tel)
      this.setData({
        data: data
      })
    },
    inputTeacher: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.teacher = e.detail.value;
      //console.log(data.teacher)
      this.setData({
        data: data
      })
    },
    inputTeacherTel: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.teacher_tel = e.detail.value;
      //console.log(data.teacher_tel)
      this.setData({
        data: data
      })
    },
    inputCampus: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.campus = e.detail.value;
      //console.log(data.campus)
      this.setData({
        data: data
      })
    },
    inputBuilding: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.building = e.detail.value;
      //console.log(data.building)
      this.setData({
        data: data
      })
    },
    inputRoom: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.room = e.detail.value;
      //console.log(data.room)
      this.setData({
        data: data
      })
    },
    inputFather: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.father = e.detail.value;
      //console.log(data.father)
      this.setData({
        data: data
      })
    },
    inputFatherTel: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.father_tel = e.detail.value;
      //console.log(data.father_tel)
      this.setData({
        data: data
      })
    },
    inputMother: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.mother = e.detail.value;
      //console.log(data.mother)
      this.setData({
        data: data
      })
    },
    inputMotherTel: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.mother_tel = e.detail.value;
      //console.log(data.mother_tel)
      this.setData({
        data: data
      })
    },
    inputRemark: function (e) {
      //console.log(e)
      var data = this.data.data;
      data.remark = e.detail.value;
      //console.log(data.remark)
      this.setData({
        data: data
      })
    },
    /**
     * confirm
     */
    confirm:function(){
      var that=this;
      wx.showModal({
        title: 'confirm',
        content: '确认修改？',
        cancelText:'取消',
        cancelColor:'rgba(0,0,0,0.5)',
        confirmColor:'#ea5858',
        confirmText:'确定！',
        success(res){
          if(res.confirm){
            that.setData({
              changing: false
            })
            wx.showLoading({
              title: 'connecting',
            })
            var data = that.data.data;
            that.triggerEvent('alterData', data)
          }else{
            that.triggerEvent('close')
          }
        }
      })
    }
  },

  /**
   * life time
   */
  lifetimes:{
    ready:function(){
      var winH=wx.getSystemInfoSync().windowHeight;
      var winW = wx.getSystemInfoSync().windowWidth;
      var ani=wx.createAnimation({
        duration:500,
        timingFunction:'ease-out'
      })
      var ani2 = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      ani.opacity(0.6).step()
      ani2.translateY(winW/750*50).opacity(1).step()
      this.setData({
        backalpha:ani.export(),
        windowmove:ani2.export()
      })

      var select_data = this.properties.select_data;
      var user=this.properties.user;
      this.setData({
        data: select_data,
        user:user
      })
    }
  }

})
