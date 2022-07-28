const nanoID = require('nano-id');

let {sModel,eModel} = require('./model');
let dataHandle = {};
let dataSql = require('./dataSQL');


//查找所有post
dataHandle['getPosts'] =  function getPosts(req){
    //console.log(req.query)
    return new Promise((resolve, reject) => {
        let sqlSTR = `select * from posts`;
        dataSql(sqlSTR).then(r=>{
            resolve(new sModel(r));
        });
    });
}

async function getReply(comments){
    for (let comment of comments) {
        let str = `select * from replys where commentID = '${comment.commentID}'`;
        comment.replys = await dataSql(str);
    }
    return comments;
}
//查找指定post下的评论
dataHandle['getComments'] = async function getComments(req){
    //console.log('handle   ',req.query)
    return new Promise((resolve, reject) => {
        let sqlSTR = `select * from comments where postID = '${req.query.postsID}'` ;
        // console.log(sqlSTR)
        dataSql(sqlSTR).then(r=>{
            console.log(r)
            getReply(r).then(comment=>{resolve(new sModel(comment))});
        }).catch(e=>{
            console.log(e);
        });
    });
}
//查找指定post的内容
dataHandle['postSearch'] = async function postSearch(req){
    return new Promise((resolve, reject) => {
        console.log(req.headers)
            let str = `select * from posts where title like '%${req.headers.keyword}%' or txt like '%${req.headers.keyword}%'`;
        dataSql(str).then(r=>{
            resolve(new sModel(r));
        }).catch(e=>{
            console.log(e)
            resolve(e);
        });
    });
}
//发布post
dataHandle['postEdit'] = async function (req){
    console.log('create a post');
    let {id,title,content,description} = req.body;
    let postID = nanoID(10);
    let timeNow = new Date();
    return new Promise((resolve, reject) => {
        let str = `insert into posts (postID,userID,title,txt,description,time,thumbUp,view) values ('${postID}', '${id}', '${title}', '${content}', '${description}','${timeNow.toISOString()}','0','0')`;
        dataSql(str).then(()=>{
            resolve(new sModel({},'已发布'));
        }).catch(e=>{
            console.log(e);
            resolve(e);
        });
    });
}
//发送评论
dataHandle['sendReport'] = async function (req){
    let {postID,userID,txt} = req.body;
    let commentID = nanoID(10);
    let time = new Date();
    return new Promise((resolve, reject) => {
        let str = `insert into comments (postID,commentID,userID,txt,time) values ('${postID}', '${commentID}', '${userID}', '${txt}','${time.toISOString()}')`;
        dataSql(str).then(()=>{
            resolve(new sModel({},'已发送'));
        });
    });
}
//对评论回复
dataHandle['commentReport'] = async function (req){
    let {commentID,userID,txt} = req.body;
    let replyID = nanoID(10);
    let time = new Date();
    return new Promise((resolve, reject) => {
        let str = `insert into replys (commentID,userID,replyID,txt,time) values ('${commentID}','${userID}','${replyID}','${txt}','${time.toISOString()}')`;
        console.log(str)
        dataSql(str).then(()=>{
            resolve(new sModel({},'评论成功'));
        });
    });
}
//获取某一作者的所有内容
dataHandle['getCreatorPost'] = async function(req){
    let str = `select * from posts where userID = '${req.query.creator}'`;
    return new Promise((resolve, reject) => {
        dataSql(str).then(r=>{
            resolve(new sModel(r));
        });
    });

}
//推荐内容
dataHandle['getRecommendPosts'] = async function (){
    return new Promise((resolve, reject) => {
        let sqlSTR = `select * from posts order by thumbUp DESC`;
        dataSql(sqlSTR).then(r=>{

            resolve(new sModel(r.slice(0,9)));
        });
    });
}
//查找某景点的相关post
dataHandle['getScenicPosts'] = async function (req){
    console.log(req.headers)
    let str = `select * from posts where scenicId = '${req.headers.scenicid}' or title like '%${req.headers.keyword}%'`;
    return new Promise((resolve, reject) => {
        dataSql(str).then(r=>{
            resolve(new sModel(r));
        }).catch(e=>{
            resolve(new eModel(e,str));
        });
    });

}
//景点主题列表
dataHandle['getScenicSpot'] = async function (){
    let str =` select * from scenicSpot`;
    let option = [];
    return new Promise((resolve, reject) => {
        dataSql(str).then(r=>{
            for ( let ele of r){
                let temp = {value:'',label:''};
                temp.value = ele.FID;
                temp.label = ele.sceneName;
                option.push(temp);
            }
            resolve(new sModel(option));
        });
    });
}
//
dataHandle['saveJobOrder'] = function (req){
    let str = `insert into UserFeedback (id,userID,content,contacted,checked) values ('${nanoID(10)}','${req.body.id}','${req.body.content}','0','0')`;
    return new Promise((resolve, reject) => {
        dataSql(str).then(()=>{
            resolve(new sModel({},'已发送'));
        });
    });
}

dataHandle['mFeedback'] = function (req){
    let str = `select * from UserFeedback where userID = '${req.headers.id}'`;
    return new Promise((resolve, reject) => {
        dataSql(str).then(r=>{
            resolve(new sModel(r));
        });
    });
}
dataHandle['readFeedback'] = function (req){
    let str = `update UserFeedback set contacted = 0 where id = '${req.headers.id}'`;
    return new Promise((resolve, reject) => {
        dataSql(str).then(()=>{
            resolve({});
        });
    });
}

dataHandle['viewPost'] = function (req){
    let str = `update posts set view = view+1 where postID = '${req.headers.id}'`
    return new Promise(resolve => {
        dataSql(str).then(()=>{
            resolve();
        });
    });
}
//点赞
dataHandle['agreePost'] = function (req){
    let str = `update posts set thumbUp = thumbUp+1 where postID = '${req.headers.id}'`
    return new Promise(resolve => {
        dataSql(str).then(()=>{
            resolve();
        });
    });
}

module.exports = dataHandle;