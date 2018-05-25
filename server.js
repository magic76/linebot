const express = require('express');
var linebot = require('linebot');
const { parse } = require('url');
const fetch = require('isomorphic-fetch');
const XLSX = require('xlsx');
var bot = linebot({
    channelId: '1581950485',
    channelSecret: 'b65b4c323a1350d2c19b1862c1c9e030',
    channelAccessToken: 'EJLlUxoNpvsHRwbgF+pi8QYM7EuKX+HnStVpdA99Vzw+WB3OhkUI9CPC3fIhupHCwqEFvGp1uWXQI53vQVAx/gy5JyLKQP9NI7xTKXrPpfsAggUpwjtjiNO/EEXlGEfzSigSTy2IQe/sTMchXhKr0gdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
    const msg = event.message.text;
    event.source.profile().then(function (profile) {
        const currentId = profile.roomId || profile.groupId || profile.userId;
        if (msg.indexOf('#') === 0) {
            return event.reply(msg);
            const productName = msg.replcae('#', '').toLowerCase();
            const workbook = XLSX.readFile('2018-05-MOLP_Price.xlsx');
            const sheetNames = workbook.SheetNames; 
            const worksheet = workbook.Sheets[sheetNames[5]];

            const sheet = XLSX.utils.sheet_to_json(worksheet);
            const wordKey = productName;
            const result = [];
            sheet.map(item => {
                Object.keys(item).some(key => {
                    if (item[key].indexOf(wordKey) > -1) {
                        result.push(item);
                        return true;
                    } else {
                        return false;
                    }
                });
            });
            result.map(product => {
              let str = '';
              Object.keys(product).map(itemKey => {
                  str += itemKey + ': ' + product[itemKey] + '\n';
              });
              bot.push(currentId, str);
            });
        } else {
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
  });
  
});


bot.on('join', function (event) {
  event.reply('join: ' + event.source.groupId);
});

const app = express();
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);
app.get('/emit_message', function (req, res) {
  const parsedUrl = parse(req.url, true);
  const query = parsedUrl.query || {};
  const ids = query.id && query.id.split(',') || [];
  const message = query.message;
  return ids.map((id) => {
    bot.push(id, message);
  });
  // fetch('https://pm25.lass-net.org/data/last-all-epa.json').then(data => data.json()).then((data) => {
  //   // const msg = event.message.text;

  //   const feeds = data.feeds || [];
  //   const arr = [];
  //   feeds.map(item => {
  //     if (item.SiteName.indexOf('土城') > -1) {
  //       arr.push(item);
  //     }
  //   });
  //   return arr.map(t1 => {
  //     console.log('PM2.5: ', t1.PM2_5);
  //     event.reply('PM2.5: ', t1.PM2_5);
  //   });
});
app.listen(process.env.PORT || 3000);
