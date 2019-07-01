const fs = require('fs');
const Logs = require('../lib/logs');
const { rootPath } = require('../lib/utils');
const templateParser = require('../lib/template-parser');

module.exports = (commands, params) => {

    let template = fs.readFileSync(rootPath() + '/templates/uct-config').toString();

    fs.writeFile(process.cwd() + '/uct.js', template, err => !err ? Logs.createSuccess('Config') : Logs.createFail('Config'));

}