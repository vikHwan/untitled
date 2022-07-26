let jwt = require('jsonwebtoken')
let mysql = require('mysql')
let {tokenSave} = require('../controller/check')
let {sModel,eModel} = require('../controller/model')
let sql = require('./sqlPool')

function userLogin(...user){
    //console.log(user[0])
    //console.log('111')
    return new Promise((resolve, reject) => {

        let sqlTxt = `select * from users where id = '${user[0]}' and password = ${user[1]}`
        // console.log(sqlTxt)
        // let sqlTxt = 'select * from users where id = 001 and password = 123'
        sql.query(sqlTxt,(e,r)=>{
            if(e){
               //console.log(e)
                reject(new eModel('未知错误'))
            }else {
                //console.log(r)
                if(r.length === 1){
                   let token = jwt.sign({id: user[0]},'esri',{expiresIn: 5})
                    tokenSave(token,user[0])
                   // console.log(r[0].grade)
                    delete r[0].password
                    resolve(new sModel({token,...r[0]},'验证成功'))
                }
                reject(new eModel('登录信息错误'))
            }
        })

    })

}
function tokenCreate(user){

}
module.exports = userLogin
