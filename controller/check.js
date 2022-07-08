const userMap = new Map
const jwt = require('jsonwebtoken')
let {sModel,eModel} = require('../controller/model')

function tokenSave(token,userID){
    userMap.set(userID,token)
    //console.log(userMap)
}
function tokenCheck(token,userID){
    return new Promise((resolve, reject) => {
        if (userMap.get(userID) === token)
        {
            jwt.verify(token,'esri',(e,r)=>{
                if(e)
                    reject(new eModel('登录过期'))
                //console.log(r)
            })
            resolve (new sModel('验证成功'))
        }
        reject(new eModel('验证错误'))

    })


}
module.exports = {tokenCheck,tokenSave}