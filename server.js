const express = require('express');
var linebot = require('linebot');
const { parse } = require('url');
const sister = require('./action/sister');
const getPM2_5 = require('./action/getPM2_5');
const getStock = require('./action/getStock');
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
            return sister(bot, msg, currentId);
        } else if (msg.indexOf('$') === 0) {
            return getStock(bot, msg, currentId);
        } else {
            return getPM2_5(bot, msg, currentId);
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
