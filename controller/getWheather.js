const request = require("request");
const cheerio = require("cheerio");
let {sModel} = require('../controller/model');
const weatherURL = 'https://tianqi.moji.com/weather/china/sichuan/';
let city = {};
let cityName = ['nanchong','meishan','chengdu','zigong','panzhihua','luzhou','deyang','mianyang','guangyuan','suining','neijiang','leshan','yibin','guangan','dazhou','yaan','bazhong','ziyang','aba-(ngawa)-tibetan-and-qiang-autonomous-prefecture','ganzi','liangshan-yi-autonomous-prefecture']

// 获取墨迹天气提示信息
function getWeatherTips(ad) {
    return new Promise((resolve,reject)=>{
        request(weatherURL+ad,(error,res,body)=>{
            if (!error) {
                let html = res.body || "";
                let $ =cheerio.load(html);
                city[ad] = {};
                city[ad].temp = $('.wea_weather em').text().trim()+'℃';
                city[ad].desc = $('.wea_weather b').text().trim();
                city[ad].water = $('.wea_about span').text().trim().split(' ')[1];
                city[ad].win = $('.wea_about em').text().trim();
                resolve();
            } else {
                reject(error);
            }
        });
    });
}
setInterval(()=>{
    for (let i of cityName){
        getWeatherTips(i);
    }
    let t = new Date();
    city['time'] =t.toISOString().split('T')[0]+' '+t.toTimeString().split('T')[0];
},1000*60*5);

async function handle  (req,res){
    if (Object.keys(city).length === 0){
        for (let i of cityName){
            await getWeatherTips(i);
         }
        let t = new Date();
        city['time'] =t.toISOString().split('T')[0]+' '+t.toTimeString().split('T')[0];
        res.send(new sModel(city));
    }else {
        res.send(new sModel(city));
    }


}

module.exports =handle;