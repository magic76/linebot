const fetch = require('isomorphic-fetch');
const dataPush = (bot, data, msg, currentId) => {
    const feeds = data || [];
    const arr = [];
    msg = msg.replace(/台/g, '臺');
    feeds.map(item => {
      if (item.SiteName.indexOf(msg) > -1 || item.County.indexOf(msg) > -1) {
        arr.push(item);
      }
    });
    const botMessageList = arr.map(item => {
      return `${item.County}${item.SiteName} ${item.Status}\nAQI: ${item['AQI']}\nPM2.5: ${item['PM2.5']} \nPM10: ${item['PM10']}\n[${item.PublishTime}]`; 
    });
    bot.push(currentId, botMessageList.join('\n\n'));
}

module.exports = (bot, msg, currentId) => {
    // request('https://opendata.epa.gov.tw/api/v1/AQI?format=json&token=vO/+NFKaLUSSO4YTOIDrrg',{},(data)=>{console.log(data)});
    fetch('http://opendata.epa.gov.tw/api/v1/AQI?format=json&token=vO/+NFKaLUSSO4YTOIDrrg',{rejectUnauthorized: false}).then(data => {
      return data.json();
    }).then((data) => {

        // 將最後一筆存到file內
        dataPush(bot, data, msg, currentId);
        return ;
    }).catch(_=>console.log(_));
}


