const express = require('express');
var linebot = require('linebot');
const { parse } = require('url');
const bodyParser = require('body-parser');
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
        } else if (msg.indexOf('?') === 0) {
           return event.reply('https://www.google.com.tw/search?q=' + msg.replace('?', ''));
        } else {
            return getPM2_5(bot, msg, currentId);
        }
  });
  
});


bot.on('join', function (event) {
  event.reply('join: ' + event.source.groupId);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.post('/emit_message', function (req, res) {
    const parsedUrl = parse(req.url, true);
    const query = parsedUrl.query || {};
    const ids = query.id && query.id.split(',') || [];
    const message = query.message;
    return ids.map((id) => {
      bot.push(id, message);
    });
});
app.post('/gitwebhook', function (req, res) {
  const body = req.body || {};
  if (body.object_kind === 'merge_request') {
    const userName = body.user.name;
    const assignee = body.assignee;
    const prUrl = body.object_attributes.url;
    const source = body.object_attributes.source_branch;
    const target = body.object_attributes.target_branch;
    const description = body.object_attributes.description || '';;

    let outStr = userName;
    description.length > 0 && outStr += description + '\n';
    outStr += prUrl;
    if (target.indexOf('master') > -1) {
      bot.push('U2a4c41ed8bfd4e83f33db268b4564404', outStr);
    }
  }
});
app.listen(process.env.PORT || 3000);
