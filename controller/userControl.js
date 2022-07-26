let {sModel,eModel} = require('../controller/model')
let dataSql = require('./dataSQL')
async function updatePassword(id,newPassword,old){
    return new Promise((resolve, reject) => {
        let str = `update users set password = '${newPassword}' where password = '${old}' and id = '${id}'`
        dataSql(str).then(()=>{
            resolve(new sModel({},'修改成功'))
        }).catch(e=>{
            resolve(e)
            console.log(e)
        })
    })
}

module.exports = {updatePassword}