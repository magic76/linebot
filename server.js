const express = require('express');
var linebot = require('linebot');
const { parse } = require('url');
const fetch = require('isomorphic-fetch');
{
  "gps_num": 9,
  "app": "AirBox",
  "gps_alt": 2,
  "fmt_opt": "1",
  "device": "臺南市龍山街",
  "s_d2": 17,
  "s_d0": 23,
  "s_d1": 25,
  "s_h0": 100,
  "SiteName": "74DA38AF4812",
  "gps_fix": 1,
  "ver_app": "0.35.2",
  "gps_lat": 22.982,
  "s_t0": 39.12,
  "timestamp": "2018-05-23T03:28:14Z",
  "gps_lon": 120.222,
  "date": "2018-05-23",
  "tick": 1527046094,
  "device_id": "74DA38AF4812",
  "s_1": 100,
  "s_0": 15,
  "s_3": 0,
  "s_2": 1,
  "ver_format": "3",
  "time": "03:28:14"
  },
var bot = linebot({
  channelId: '1581950485',
  channelSecret: 'b65b4c323a1350d2c19b1862c1c9e030',
  channelAccessToken: 'EJLlUxoNpvsHRwbgF+pi8QYM7EuKX+HnStVpdA99Vzw+WB3OhkUI9CPC3fIhupHCwqEFvGp1uWXQI53vQVAx/gy5JyLKQP9NI7xTKXrPpfsAggUpwjtjiNO/EEXlGEfzSigSTy2IQe/sTMchXhKr0gdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
  event.source.profile().then(function (profile) {
    fetch('https://pm25.lass-net.org/data/last-all-epa.json').then(data => data.json()).then((data) => {
        const msg = event.message.text;

        const feeds = data.feeds || [];
        const arr = [];
        feeds.map(item => {
          if (item.device.indexOf(msg) > -1) {
            arr.push(item);
          }
        });
        return arr.map(t1 => {
          event.reply('PM2.5: ', t1.PM2_5);
        });
        // return event.reply('Hello ' + profile.displayName + ' ' + profile.userId);
         
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
