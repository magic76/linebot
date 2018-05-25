const XLSX = require('xlsx');
const msg = '#office';
const productName = msg.replace('#', '').toLowerCase();
const workbook = XLSX.readFile('2018-05-MOLP_Price.xlsx');
const sheetNames = workbook.SheetNames; 
const worksheet = workbook.Sheets[sheetNames[5]];

const sheet = XLSX.utils.sheet_to_json(worksheet);
const wordKey = productName;
const result = [];
// console.log(sheet)
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
    console.log(str);
});