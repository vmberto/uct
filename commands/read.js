const fs = require('fs');
const { rootPath } = require('../lib/utils');
const templateParser = require('../lib/template-parser');

module.exports = (commands, params) => {

        let template = fs.readFileSync(rootPath() + '/templates/component-function').toString();

        template = templateParser(template, { ComponentName: 'Alerts' });
        
        console.log(template);
        
        

}
