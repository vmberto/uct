const fs = require('fs');
const { rootPath, mkdir_p, isJavascriptFile } = require('../lib/utils');
const templateParser = require('../lib/template-parser');

module.exports = (commands, params) => {

    /** @refactor this commands array, maybe change to an object */
    let fullPathStr = commands[0];
    let fullPathArr = commands[0].split('/');
    let fileName = fullPathArr[fullPathArr.length - 1];

    let foldersPath = fullPathArr.slice(0, fullPathArr.length - 1).join('/');

    mkdir_p(foldersPath, () => {
        
        let template = fs.readFileSync(rootPath() + '/templates/component-class').toString();

        /** @byDefault the file created is capitalized, could be changed in uct's config file */
        template = templateParser(template, { ComponentName: capitalize(fileName) });

        if (!isJavascriptFile(fullPathStr)) fullPathStr = fullPathStr + '.js';

        fs.writeFile(process.cwd() + '/' + fullPathStr, template, err => console.log(err));

    });

}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  