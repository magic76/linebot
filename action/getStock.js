const fetch = require('isomorphic-fetch');

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}

module.exports = (bot, msg, currentId) => {
    const stockId = msg.replace('$', '');
    fetch('http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo=' + stockId).then(data => data.json()).then((data) => {
        const infos = data.data || [];
        const columnNames = data.fields || [];
        const lastData = infos[infos.length-1];
        let outputStr = data.title.replace(/  /g, '') + '\n';
        columnNames.map((name, i) => {
            outputStr += name + ': ' + lastData[i] + '\n';
        });
        bot.push(currentId, outputStr);

        //睡10秒防止被鎖ip
        sleep(10000);
        return ;
        // return event.reply('end');
    });
}
