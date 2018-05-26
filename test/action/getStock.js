var getStock = require('../../action/getStock');
getStock({push: (id, str) => {
    console.log(str);
}}, '$2317', '123');