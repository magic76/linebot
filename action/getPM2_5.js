const fetch = require("isomorphic-fetch");
const dataPush = (bot, data, msg, currentId) => {
  const feeds = data || [];
  const arr = [];
  msg = msg.replace(/台/g, "臺");
  feeds.map((item) => {
    if (item.SiteName.indexOf(msg) > -1 || item.County.indexOf(msg) > -1) {
      arr.push(item);
    }
  });
  const botMessageList = arr.map((item) => {
    return `${item.County}${item.SiteName}${item.Status} \nPM2.5/PM10/AQI: ${item["PM2.5"]}/${item["PM10"]}/${item["AQI"]}\n[${item.PublishTime}]`;
  });
  bot.push(currentId, botMessageList.join("\n\n"));
};

module.exports = (bot, msg, currentId) => {
  // request('https://opendata.epa.gov.tw/api/v1/AQI?format=json&token=vO/+NFKaLUSSO4YTOIDrrg',{},(data)=>{console.log(data)});
  fetch(
    "http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json",
    { rejectUnauthorized: false }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      // 將最後一筆存到file內
      dataPush(bot, data, msg, currentId);
      return;
    })
    .catch((_) => console.log(_));
};
