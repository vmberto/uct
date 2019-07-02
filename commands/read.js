const fs = require('fs');
// lib
const configFileReader = require('../lib/config-file-reader');
const Logs = require('../lib/logs');
const templateParser = require('../lib/template-parser');
// utils
const { mkdirP, hasJavascriptExtension } = require('../utils');

const CONFIG_FILE = configFileReader();

module.exports = (commands, params) => {

    console.log(templateParser(fs.readFileSync(`${__dirname}/../templates/component-class`).toString(), { ComponentName: 'Alerta', UsingCSS: false }));
    
    

}