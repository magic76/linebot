/**
 * Created by Administrator on 2017/2/12.
 */
var http = require("http"); //http 請求
//var https = require("https"); //https 請求
var querystring = require("querystring");
function request(path,param,callback) {
    var options = {
        hostname: 'opendata.epa.gov.tw',
        port: 80, //端口號 https默認端口 443， http默認的端口號是80
        // path: '/api/v1/AQI',
        path: '/api/v1/AQI?format=json&token=vO/+NFKaLUSSO4YTOIDrrg',
        method: 'GET',
        headers: {
            "Connection": "keep-alive",
            // "Content-Length": 111,
            // "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        }//偽造請求頭
    };
    
    var req = http.request(options, function (res) {

        var json = ""; //定義json變量來接收服務器傳來的數據
        console.log(res.statusCode);
        //res.on方法監聽數據返回這一過程，"data"參數表示數數據接收的過程中，數據是一點點返回回來的，這裏的chunk代表著一條條數據
        res.on("data", function (chunk) {
            console.log(chunk);
            json += chunk; //json由一條條數據拼接而成
        })
        //"end"是監聽數據返回結束，callback（json）利用回調傳參的方式傳給後臺結果再返回給前臺
        res.on("end", function () {
            callback(json);
        })
    })

    req.on("error", function (e) {
        console.log('error',e)
    })
//這是前臺參數的一個樣式，這裏的參數param由後臺的路由模塊傳過來，而後臺的路由模塊參數是前臺傳來的
//    var obj = {
//        query: '{"function":"newest","module":"zdm"}',
//        client: '{"gender":"0"}',
//        page: 1
//}

    req.write(querystring.stringify(param)); //post 請求傳參
    req.end(); //必須要要寫，

}
module.exports = request;