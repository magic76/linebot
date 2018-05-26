const fetch = require('isomorphic-fetch');
module.exports = (bot, msg, currentId) => {
    fetch('https://pm25.lass-net.org/data/last-all-epa.json').then(data => data.json()).then((data) => {
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
        return ;
        // return event.reply('end');
    });
}

