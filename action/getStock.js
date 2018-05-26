const fetch = require('isomorphic-fetch');
const XLSX = require('xlsx');

const getStockId = (companyKey) => {
    const workbook = XLSX.readFile('action/t187ap03_L.xlsx');
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['t187ap03_L']);
    let stockId = companyKey;
    sheet.some(item => {
        if (item['公司名稱'].indexOf(companyKey) > -1) {
            stockId = item['公司代號'];
            return true;
        }
    })
    return stockId;
};
const formatHTML = (str) => {
    return str.replace(/<[\w =";#\/?-]+>/g, '').replace(/\n/g, '').replace(/ /g, '');
}
module.exports = (bot, msg, currentId) => {
    const stockId = getStockId(msg.replace('$', ''));
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
