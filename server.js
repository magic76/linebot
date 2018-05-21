const express = require('express');
var linebot = require('linebot');
const { parse } = require('url');
const fetch = require('isomorphic-fetch');

var bot = linebot({
  channelId: '1581950485',
  channelSecret: 'b65b4c323a1350d2c19b1862c1c9e030',
  channelAccessToken: 'EJLlUxoNpvsHRwbgF+pi8QYM7EuKX+HnStVpdA99Vzw+WB3OhkUI9CPC3fIhupHCwqEFvGp1uWXQI53vQVAx/gy5JyLKQP9NI7xTKXrPpfsAggUpwjtjiNO/EEXlGEfzSigSTy2IQe/sTMchXhKr0gdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
  event.source.profile().then(function (profile) {
    fetch('https://works.ioa.tw/weather/api/weathers/39.json').then(data => data.json()).then((data) => {
        // return event.reply('Hello ' + profile.displayName + ' ' + profile.userId);
        return event.reply(data.desc + '_溫度：' + data.temperature + '度_濕度：' + data.humidity + '_');
    });
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
});
app.listen(process.env.PORT || 3000);
