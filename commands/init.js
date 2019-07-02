const fs = require('fs');
const Logs = require('../lib/logs');

module.exports = (commands, params) => {

    let template = fs.readFileSync(__dirname + '/../templates/uct-config').toString();

    fs.writeFile(process.cwd() + '/uct.js', template, err => !err ? Logs.createSuccess('Config') : Logs.createFail('Config'));

}