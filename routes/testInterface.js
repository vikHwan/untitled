const experss = require('express')
const proxy = require('express-http-proxy')
// const bodyParser = require('body-parser')6
// let request = require('request')
let city = require('../controller/getWheather')

let router = experss.Router()



// router.use(proxy('https://www.mxnzp.com'))

router.get('/',city)

/*async function handle(req,res){
    console.log(req.url)

}

router.get('/',handle)

router.post('/',((req, res) => {
    console.log(req.body)
    res.send('///')
}))*/
module.exports = router