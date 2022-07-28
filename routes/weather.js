const experss = require('express');
let handle = require('../controller/getWheather');

let router = experss.Router();

router.get('/',handle);

module.exports = router;