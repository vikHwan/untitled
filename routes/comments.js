const express = require('express');
let router = express.Router();
let dataHandle = require('../controller/dataHandler')
/*async function handle(req,res){
    if (typeof dataHandle[req.query.data] === 'function'){
        let r = await dataHandle[req.query.data]()
        console.log(await dataHandle[req.query.data]())
        res.send(r)
    }
    //console.log(typeof req.query.data === 'function')
}*/
async function handle(req,res){
    //console.log(dataHandle[req.query.data])
    console.log(req.query.data)
    let r = await dataHandle[req.query.data](req)

    res.send(r)
}
router.get('/',handle)

module.exports = router