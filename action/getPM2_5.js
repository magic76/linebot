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
    const fileData = require('action/pm25.json');
    if (Date.now() - fileData.time  < 1000 * 60 * 60) {
        bot.push(currentId, fileData.time);
        dataPush(bot, fileData, msg, currentId);
    } else {
        fetch('https://pm25.lass-net.org/data/last-all-epa.json').then(data => data.json()).then((data) => {
            try {
              // 將最後一筆存到file內
              data.time = Date.now();
              fs.writeFileSync('action/pm25.json', JSON.stringify(data));

              dataPush(bot, data, msg, currentId);
              
              return ;
              // return event.reply('end');
            } catch (e) {
              bot.push(currentId, e.stack.toString());
            }
        
           
        });
    }
}


