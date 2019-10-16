var getPM2_5 = require('../../action/getPM2_5');
getPM2_5({push: (id, str) => {
    console.log(id, str);
}}, '台北', '123');