var linebot = require('linebot');
 
var bot = linebot({
  channelId: 1568830346,
  channelSecret: '9d62574bf5ae83cdba4521a084b9628b',
  channelAccessToken: 'a3p/HMWFFiGkp5IZfRIm7DKE4gqaLaxXAp0d6Xqtj2IrlcGqbJRLWZA/s7p0UbnO6vkBdNDx3keYpwhzqKVehKx0Jwb9BLXpAOKYqZYAWA5xjv3m6cfKKot843FsDIvf7qNlE9yB+IY1VhPY4u+MiAdB04t89/1O/w1cDnyilFU='
});
 
bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    // success
  }).catch(function (error) {
    // error
  });
});
 
bot.listen('/linewebhook', 3000);
