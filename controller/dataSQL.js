let sql = require('./sqlPool');

async function dataSql(sqlSTR){
    console.log(sqlSTR)
    return new Promise((resolve, reject) => {
        try {
            sql.query(sqlSTR,(e,r)=>{
                if (e){
                    console.log(e)
                    reject(e);
                }else {
                    r.length !== 0 ? resolve(r):resolve({});
                }
            })
        }catch (e){
            console.log(e)
            reject(e);
        }
    })
}

module.exports = dataSql;