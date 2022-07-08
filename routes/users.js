const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let userLogin = require('../controller/login')
let {tokenCheck} = require('../controller/check')

 //GET users listing.


router.get('/', function(req, res, next) {
    if(!req.headers.authorization){
        //console.log(req.headers)
        userLogin(req.headers.id,req.headers.password).then(r=>{
            res.send(r)
        }).catch(e=>{
            res.send(e)
        })
    }else {
        console.log('token login')
       // console.log(req.headers)
        tokenCheck(req.headers.authorization,req.headers.id).then(r=>{

            res.send(r)
        }).catch(e=>{
            res.send(e)
        })
    }



  //res.send('respond with a resource');
});





module.exports = router;
