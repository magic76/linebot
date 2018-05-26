const fetch = require('isomorphic-fetch');

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}
const formatHTML = (str) => {
    return str.replace(/<[\w =";#\/?-]+>/g, '').replace(/\n/g, '').replace(/ /g, '');
}
module.exports = (bot, msg, currentId) => {
    const stockId = msg.replace('$', '');
    return fetch('https://tw.stock.yahoo.com/q/q?s=' + stockId).then(data => data.text()).then((data) => {
        const str = data.split('<table border=2 width="750">')[1].split('<td align=center width=137 class="tt">')[0];
        let columnNames = str.split('<td align=center width=105><a')[0].replace(/<\/th>/g, ',');
        columnNames = formatHTML(columnNames).split(',');
        let dataValues = str.split('<td align=center width=105><a')[1].replace(/<\/td>/g, ',');
        dataValues = formatHTML(dataValues).replace(/[\w =";#\/?-]+>/g, '').replace('加到投資組合', '').split(',');
        let result = '';
        dataValues.map((value, i) => {
            result += columnNames[i] + ': ' + value.trim() + '\n';
        });
        bot.push(currentId, result);
        return;
    });
}

// module.exports = (bot, msg, currentId) => {
//     const stockId = msg.replace('$', '');
//     fetch('http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo=' + stockId).then(data => data.json()).then((data) => {
//         const infos = data.data || [];
//         const columnNames = data.fields || [];
//         const lastData = infos[infos.length-1];
//         let outputStr = data.title.replace(/  /g, '') + '\n';
//         columnNames.map((name, i) => {
//             outputStr += name + ': ' + lastData[i] + '\n';
//         });
//         bot.push(currentId, outputStr);

//         //睡10秒防止被鎖ip
//         sleep(10000);
//         return ;
//         // return event.reply('end');
//     });
// }
