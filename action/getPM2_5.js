const fetch = require('isomorphic-fetch');
const fs = require('fs');

const dataPush = (bot, data, msg, currentId) => {
    const feeds = data.feeds || [];
    const arr = [];
    feeds.map(item => {
      if (item.County.indexOf(msg) > -1 || item.SiteName.indexOf(msg) > -1) {
        arr.push(item);
      }
    });
    arr.map(item => {
      bot.push(currentId, 
        item.SiteName + '的PM2.5: ' + item['PM2_5'] + ' ' + item.Status + '\n [ '+ item.PublishTime + ' ]');
    });
}
module.exports = (bot, msg, currentId) => {
    const fileData = require('./pm25.json');
    console.log(fileData, fileData.time);
    if (Date.now() - fileData.time  < 1000 * 60 * 60) {
        dataPush(bot, fileData, msg, currentId);
    } else {
        fetch('https://pm25.lass-net.org/data/last-all-epa.json').then(data => data.json()).then((data) => {

            // 將最後一筆存到file內
            data.time = Date.now();
            fs.writeFileSync('action/pm25.json', JSON.stringify(data));
            console.log(JSON.stringify(require('./pm25.json')));
            fs.writeFileSync('pm25.json', JSON.stringify(data));
            console.log(JSON.stringify(require('./pm25.json')));
            dataPush(bot, data, msg, currentId)ㄤ
            return ;
        });
    }
}


