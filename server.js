const express = require('express');
var linebot = require('linebot');
const { parse } = require('url');
const bodyParser = require('body-parser');
const sister = require('./action/sister');
const getPM2_5 = require('./action/getPM2_5');
const getStock = require('./action/getStock');
const getBetfairInfo = require('./action/getBetfairInfo');

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
        } else if (msg.indexOf('?') === 0 || msg.indexOf('？') === 0) {
          // return event.reply('https://www.google.com.tw/search?q=' + msg.replace('?', '').replace('？', ''));
        } else if (msg.indexOf('init') === 0) {
            return event.reply(`id: ${currentId}`);
        } else if (msg.indexOf('bf=') > -1) {
          //  return getBetfairInfo(bot,msg, currentId);
        } else {
            return getPM2_5(bot, msg, currentId);
        }
  });
  
});


bot.on('join', function (event) {
  event.reply('join: ' + event.source.groupId);
});

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);
app.get('/pm25', function (req, res) {
    const parsedUrl = parse(req.url, true);
    const query = parsedUrl.query || {};
    const id = query.id;
    const msg = query.msg;
    getPM2_5(bot, msg, id);
    return res.json({});
  })
app.get('/emit_message', function (req, res) {
  const parsedUrl = parse(req.url, true);
  const query = parsedUrl.query || {};
  const ids = query.id && query.id.split(',') || [];
  const message = query.message;
  ids.map((id) => {
    bot.push(id, message);
  });
  return res.json({});
});
app.post('/emit_message', function (req, res) {
    const parsedUrl = parse(req.url, true);
    const query = parsedUrl.query || {};
    const ids = query.id && query.id.split(',') || [];
    const message = query.message;
    ids.map((id) => {
      bot.push(id, message);
    });
    return res.json({});
});

app.post('/gitwebhook', bodyParser.json(), function (req, res) {
    const body = req.body || {};
    if (body.object_kind === 'merge_request' && body.object_attributes.state.indexOf('opened') > -1) {
        const userName = body.user.name;
        const assignee = body.assignee;
        const prUrl = body.object_attributes.url;
        const source = body.object_attributes.source_branch;
        const target = body.object_attributes.target_branch;
        const description = body.object_attributes.description || '';
        const title = body.object_attributes.title;
  
        let outStr = `有人提PR喲!\n用戶：${userName}\n標題：${title}\n網址：${prUrl}`;
      //   let outStr = `用戶：${userName}\n標題：${title}\n狀態：${body.object_attributes.state}\n網址：${prUrl}`;
      
      if (target.indexOf('master') > -1) {

        if (prUrl.indexOf('snk') > -1 || prUrl.indexOf('titan-x') > -1) {

            // snk群組
            bot.push('Ccb9ab77855954cfb99951ac9a86f1d8b', outStr);
        } else {
            // 大前端群組
            bot.push('Ca795cf06d72904a3183f7d00eaacaeb0', outStr);
            
            // gapi群組
            bot.push('Cd2725b9fbeb655b5c81e5c3c8ff0f0e7', outStr);
        }
        }
        res.end();
    }
});
app.listen(process.env.PORT || 3000);
