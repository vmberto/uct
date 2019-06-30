const fs = require('fs');
const { rootPath } = require('../lib/utils');
const templateParser = require('../lib/template-parser');

module.exports = (commands, params) => {

    let template = fs.readFileSync(rootPath() + '/templates/uct-json').toString();

    fs.writeFile(process.cwd() + '/uct.json', template, err => console.log(err));

}