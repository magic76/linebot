const XLSX = require('xlsx');
const msg = '#MOLP#SQL';


const rawmessage = msg.replace('#', '').toLowerCase();
const msgs = rawmessage.split('#');
const sheetkey = msgs[0];
const productName = msgs[1];

const workbook = XLSX.readFile('2018-05-MOLP-Price.xlsx');
let sheetName = '';
workbook.SheetNames.map(Name => {
    if(Name.toLocaleLowerCase().indexOf(sheetkey) === 0) {
        sheetName = Name;
    }
});
console.log(workbook.SheetNames.join(' , '))
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
    console.log(str);
});