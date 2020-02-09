// components/detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    select_data:{
      type:Array,
      value:''
    },
    user:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists:['姓名','学号','年级','专业','班级',
      '联系方式', '宿舍号', '父亲姓名', '练习方式',
      '母亲姓名', '联系方式', '备注'],
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
      this.triggerEvent('close')
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
     * input in textarea
     */
    input:function(e){
      //console.log(e)
      var data = this.data.data;
      data[e.currentTarget.dataset.id]=e.detail.value;
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
