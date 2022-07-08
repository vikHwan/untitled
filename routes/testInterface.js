const experss = require('express')
let router = experss.Router()
async function handle(req,res){
    console.log(req.headers)
    res.send('...')
}
router.get('/',handle)
module.exports = router