            const productName = '#Office'.replace('#', '');
            const XLSX = require('xlsx');
            const workbook = XLSX.readFile('2018-05-MOLP_Price.xlsx');
            const sheetNames = workbook.SheetNames; 
            const worksheet = workbook.Sheets[sheetNames[5]];

            const sheet = XLSX.utils.sheet_to_json(worksheet);
            const wordKey = productName;
            const result = [];
            sheet.map(item => {
                Object.keys(item).some(key => {
                    if (item[key].indexOf(wordKey) > -1) {
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
                // bot.push(currentId, str);
              });
            // console.log(result);
// const columns = ['A','B','C','D','E','F','G'];
// const itemNames = columns.map((column, i) => {
//     const num = i+1;
//     return worksheet[columns + num];
// });
// let rowLength = 1;
// while(worksheet['A' + rowLength]) {
//     rowLength ++;
// }
// console.log(sheetNames);
