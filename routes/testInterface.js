const experss = require('express')
let router = experss.Router()
async function handle(req,res){
    let temp = ''
    /*req.on('data',chunk=>{
        temp += chunk.toString()
    })
    req.on('end',()=>{
        // console.log(JSON.parse(temp))
    })*/
    console.log(req.body)
    res.send('...')
}
router.get('/',handle)
router.post('/',((req, res) => {
    console.log(req.body)
    res.send('///')
}))
module.exports = router