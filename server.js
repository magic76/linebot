const express = require('express');
var linebot = require('linebot');
const { parse }: any = require('url');

var bot = linebot({
  channelId: '1581950485',
  channelSecret: 'b65b4c323a1350d2c19b1862c1c9e030',
  channelAccessToken: 'EJLlUxoNpvsHRwbgF+pi8QYM7EuKX+HnStVpdA99Vzw+WB3OhkUI9CPC3fIhupHCwqEFvGp1uWXQI53vQVAx/gy5JyLKQP9NI7xTKXrPpfsAggUpwjtjiNO/EEXlGEfzSigSTy2IQe/sTMchXhKr0gdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
  event.source.profile().then(function (profile) {
    return event.reply('Hello ' + profile.displayName + ' ' + profile.userId);
  });
});


bot.on('join', function (event) {
  event.reply('join: ' + event.source.groupId);
});
// bot.listen('/linewebhook', 3000);

const app = express();
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);
app.get('/line123', function (req, res) {
  bot.push('U2a4c41ed8bfd4e83f33db268b4564404', 'test push');
});
app.get('/emit_message', function (req, res) {
  const parsedUrl = parse(req.url, true);
  const query = parsedUrl.query || {};
  const ids = query.id && query.id.split(',') || [];
  const message = query.message;
  ids.map((id) => {
    bot.push(id, message);
  });
});
app.listen(process.env.PORT || 3000);
