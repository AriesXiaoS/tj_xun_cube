// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  return await db.collection('students').where({
    _id: (event._id)
  }).update({
    data: {
      name:event.name,
      sex:event.sex,
      grade:event.grade,
      college:event.college,
      major:event.major,
      class:event.class,
      tel:event.tel,
      teacher:event.teacher,
      teacher_tel:event.teacher_tel,
      campus:event.campus,
      building:event.building,
      room:event.room,
      father:event.father,
      father_tel:event.father_tel,
      mother:event.mother,
      mother_tel:event.mother_tel,
      remark:event.remark
    }
  })
}