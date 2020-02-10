// miniprogram/pages/updateFile/updateFile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file_name:'',
    error:''
  },

  chooseExcel:function(){
    var that=this;
    wx.chooseMessageFile({
      count:1,
      type:'file',
      success(res){
        //console.log(res)
        var file_name=res.tempFiles[0].name
        let path=res.tempFiles[0].path;
        var file_type,file_split;
        file_split=path.split('.');
        file_type = file_split[file_split.length - 1];
        //console.log(file_type)
        if(file_type=='xls' || file_type=='xlsx'){
          that.setData({
            file_name: file_name
          })
          
          that.uploadExcel(path, file_type)
        }else{
          wx.showModal({
            title: '错误',
            content: '请选择正确的excel文件',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#ea5858'
          })
        }
      }
    })
  },

  uploadExcel:function(path,file_type){
    var that=this;
    wx.showLoading({
      title: '正在上传',
    })
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.' + file_type,
      filePath:path,
      success:res=>{
        that.uploadFileID(res.fileID)
      },
      fail:err=>{
        wx.hideLoading()
        wx.showModal({
          title: '上传失败',
          content: '请检查网络连接',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor:'#ea5858'
        })
      }
    })
  },

  uploadFileID:function(fileID){
    var db=wx.cloud.database();
    var that=this;
    db.collection('files').add({
      data:{
        fileID:fileID,
        clean:true
      },
      success:function(res){
        that.dealExcel(fileID)
      },
      fail:function(res){
        wx.hideLoading()
        wx.showModal({
          title: '上传失败',
          content: '请检查网络连接',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ea5858'
        })
      }
    })

  },

  dealExcel:function(fileID){
    var that=this;
    wx.showLoading({
      title: '正在解析',
    })
    wx.cloud.callFunction({
      name:'dealExcel',
      data:{
        fileID:fileID
      },
      success(res){
        //console.log(res)
        if(typeof(res.result==Array)){
          //console.log(res.result.length)
          wx.hideLoading()
          wx.showToast({
            title: '成功导入' + res.result.length +'条',
            duration:1500
          })
        }else{
          that.setData({
            error:res.result.errMsg
          })
        }
        
      },
      fail(res){
        wx.hideLoading()
        console.log(res)
        wx.showModal({
          title: '解析失败',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ea5858'
        })
      }
    })
  },


  clean:function(){
    var db=wx.cloud.database();
    var that=this;
    wx.showLoading({
      title: 'connecting',
    })
    db.collection('files').get({
      success:function(res){
        //console.log(res.data)
        var n=res.data.length;
        var files=[];
        for(var i=0;i<n;i++){
          files.push(res.data[i].fileID)
        }
        //
        wx.cloud.deleteFile({
          fileList: files,
          success:res=>{
            that.clearDatabase()
          },
          fail:err=>{
            wx.hideLoading()
            wx.showModal({
              title: '清理失败',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: '#ea5858'
            })
          }
        })
      },
      fail:function(res){
        wx.hideLoading()
        wx.showModal({
          title: '清理失败',
          content:'请检查网络连接',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ea5858'
        })
      }
    })

  },

  clearDatabase:function(){
    wx.cloud.callFunction({
      name:'cleanFiles',
      success:function(res){
        wx.hideLoading()
        wx.showToast({
          title: '清理成功',
        })
      },
      fail:function(res){
        wx.hideLoading()
        wx.showModal({
          title: '数据库清理失败',
          content: '请联系后台手动清理',
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