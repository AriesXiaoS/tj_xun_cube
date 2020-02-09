// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  return await db.collection('students').where({
    _id: event._id
  }).update({
    data: {
      name:event.name,
      grade:event.grade,
      major:event.major,
      class: event.class,
      tel: event.tel,
      dor: event.dor,
      farther_name: event.farther_name,
      farther_tel: event.farther_tel,
      mother_name: event.mother_name,
      mother_tel: event.mother_tel,
      addition: event.addition
    }
  })
}