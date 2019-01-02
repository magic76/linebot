
const betfairInfo = require('./betfairInfo');
const getBetfairInfo = (bot, msg = '', currentId) => {
    const keyword = msg.replace('bf=', '');
    const results = Object.keys(betfairInfo).map(key => {
        const value = betfairInfo[key];
        if (key.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || value.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
            return `${key}: ${value}`;
        }
    });
    results.push('https://docs.developer.betfair.com/display/1smk3cen4v3lu3yomq5qye0ni/API+Overview');
    const message = results.filter(_ => _).join('\\n');
    bot.push(currentId, message);
}

module.exports = getBetfairInfo;


