// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  return await db.collection('users').add({
    data:{
      _id:event.username,
      passwd:event.passwd,
      role:event.role
    },
    success:function(res){
      console.log(res)
    }
  })
}