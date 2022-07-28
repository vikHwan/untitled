const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let userLogin = require('../controller/login');
let {tokenCheck} = require('../controller/check');
let {updatePassword} = require('../controller/userControl');
 //GET users listing.


router.get('/', function(req, res, next) {
    // console.log(req)
    if(!req.headers.authorization){
        // console.log(req.headers)
        userLogin(req.headers.id,req.headers.password).then(r=>{
            res.send(r);
        }).catch(e=>{
            res.send(e);
        });
    }else {
        // next()
        console.log('token login')
       // console.log(req.headers)
        tokenCheck(req.headers.authorization,req.headers.id).then(r=>{
            res.send(r);
        }).catch(e=>{
            res.send(e);
        });
    }
});
router.get('/check',function (req,res){
    console.log('check    ',req.path);
    // res.send('hello')
})

router.post("/updatePassword",(req, res) => {
    let {id,newPassword,old} = req.body;
    updatePassword(id,newPassword,old).then(r=>{
    res.send(r);
    });
})



module.exports = router;
