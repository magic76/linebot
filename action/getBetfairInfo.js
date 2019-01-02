
const betfairInfo = require('./betfairInfo');
const getBetfairInfo = (bot, msg = '') => {
    const keyword = msg.replace('bf=', '');
    const results = Object.keys(betfairInfo).map(key => {
        const value = betfairInfo[key];
        if (key.indexOf(keyword) > -1 || value.indexOf(keyword) > -1) {
            return `${key}: ${value}`;
        }
    });
    const message = results.filter(_ => _).push('https://docs.developer.betfair.com/display/1smk3cen4v3lu3yomq5qye0ni/API+Overview').join('\\n');
    bot.push(message);
}

module.exports = getBetfairInfo;


