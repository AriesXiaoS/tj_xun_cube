// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var xlsx=require('node-xlsx');
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    fileID
  } = event

  const res = await cloud.downloadFile({
    fileID:fileID
  })

  const buffer = res.fileContent

  const tasks=[]

  var sheets=xlsx.parse(buffer)
  sheets.forEach(function(sheet){
    console.log(sheet['name'])
    for (var rowId in sheet['data']){
      console.log(rowId)
      var row=sheet['data'][rowId];
      if (rowId>0 && row){
        const promise=db.collection('students').doc('' + row[1]).set({
          data:{
            name:''+row[0],
            
            grade: '' + row[2],
            major: '' +row[3],
            class: '' +row[4],
            tel: '' +row[5],
            dor: '' +row[6],
            farther_name: '' + row[7],
            farther_tel: '' +row[8],
            mother_name: '' +row[9],
            mother_tel: '' + row[10],
            addition: '' +row[11]
          }
        })
        tasks.push(promise)
      }
    }
  });

  let result= await Promise.all(tasks).then(res=>{
    return res
  }).catch(function(err){
    return err
  })
  return result
}