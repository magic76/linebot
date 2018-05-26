const XLSX = require('xlsx');
module.exports = (bot, msg, currentId) => {
    const workbook = XLSX.readFile('action/2018-05-MOLP-Price.xlsx');
    const rawmessage = msg.replace('#', '').toLowerCase();
    if (rawmessage === 'list') {
        const listStr = workbook.SheetNames.map((item, i) => (`${i}: ${item}`)).join('\n');
        return bot.push(currentId, listStr);
    }
    const msgs = rawmessage.split('#');
    const sheetkey = msgs[0];
    const productName = msgs[1];
    
    
    let sheetName = '';
    workbook.SheetNames.map(Name => {
        if (!isNaN(sheetkey)) {
            sheetName = workbook.SheetNames[sheetkey];
        } else if (Name.toLocaleLowerCase().indexOf(sheetkey) === 0) {
            sheetName = Name;
        }
    });
    
    const worksheet = workbook.Sheets[sheetName];
    
    const sheet = XLSX.utils.sheet_to_json(worksheet);
    const wordKey = productName;
    const result = [];
    sheet.map(item => {
        Object.keys(item).some(key => {
            if (item[key].toLowerCase().indexOf(wordKey) > -1) {
                result.push(item);
                return true;
            } else {
                return false;
            }
        });
    });
    result.map(product => {
        let str = '';
        Object.keys(product).map(itemKey => {
            str += itemKey + ': ' + product[itemKey] + '\n';
        });
        bot.push(currentId, str);
    });
    return ;
}