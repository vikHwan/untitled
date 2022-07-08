const mysql = require('mysql')
const nanoID = require('nano-id')
let sql = require('../controller/sqlPool')
let {sModel,eModel} = require('../controller/model')
let dataHandle = {}
async function dataSql(sqlSTR){
    return new Promise((resolve, reject) => {
        try {
            sql.query(sqlSTR,(e,r)=>{
                if (e){
                    reject(e)
                }else {
                    r.length !== 0 ? resolve(r):reject('err r.length')
                }
            })
        }catch (e){
            reject(e)
        }
    })
}
dataHandle['getPosts'] =  function getPosts(req){
    //console.log(req.query)
    return new Promise((resolve, reject) => {
        let sqlSTR = `select * from posts`;
        dataSql(sqlSTR).then(r=>{
            resolve(new sModel(r));
        })
    })
}
async function getReply(comments){
    for (let comment of comments) {
        let str = `select * from replys where commentID = ${comment.commentID}`;
        comment.replys = await dataSql(str);
    }
    return comments;
}
dataHandle['getComments'] = async function getComments(req){
    //console.log('handle   ',req.query)
    return new Promise((resolve, reject) => {
        let sqlSTR = `select * from comments where postID = ${req.query.postsID}` ;
        // console.log(sqlSTR)
        dataSql(sqlSTR).then(r=>{
            getReply(r).then(comment=>{resolve(new sModel(comment))});
        }).catch(e=>{
            console.log(e);
        })
    });
}
dataHandle['postSearch'] = async function postSearch(req){
    return new Promise((resolve, reject) => {
        console.log(req.headers)
            let str = `select * from posts where title like '%${req.headers.keyword}%' or txt like '%${req.headers.keyword}%'`
        dataSql(str).then(r=>{
            resolve(new sModel(r));
        }).catch(e=>{
            console.log(e)
            resolve(e)
        })
    })
}
dataHandle['postEdit'] = async function (req){

    let {id,title,content,description} = req.headers
    let postID = nanoID(10)
    console.log(postID)
    return new Promise((resolve, reject) => {
        // resolve(postID)
        let str = `insert into posts (postID,userID,title,txt,description) values ('${postID}', '${id}', '${title}', '${content}', '${description}')`
        dataSql(str).then(r=>{
            resolve(r)
        }).catch(e=>{
            resolve(e)
        })

    })
}


module.exports = dataHandle