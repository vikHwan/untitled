const mysql = require('mysql')
let sql = mysql.createPool({
    host:'152.136.103.77',
    port:'3306',
    user:'root',
    password:'Wq465433',
    database:'test'
});
module.exports = sql