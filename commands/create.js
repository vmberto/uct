const fs = require('fs');
const Logs = require('../lib/logs');
const { mkdirP, hasJavascriptExtension } = require('../utils');
const templateParser = require('../lib/template-parser');
const configFileReader = require('../lib/config-file-reader');

module.exports = (commands, params) => {

    const CONFIG_FILE = configFileReader();

    if (hasJavascriptExtension(commands[1])) commands[1] = commands[1].split('.js').join('');
    const FILE_PATH = commands[1];
    const FILES = [];


    let fullPathArr = FILE_PATH.split('/');
    /** @byDefault the file created is capitalized, could be changed in uct's config file */
    let fileName = treatFileName(fullPathArr[fullPathArr.length - 1]);
    
    fullPathArr[fullPathArr.length - 1] = fileName;
    let fullPathStr = fullPathArr.join('/');


    mkdirP(fullPathStr, () => {

        getFilesToBeCreated(fileName, CONFIG_FILE, params).forEach(f => {
            FILES.unshift({ ...f, path: `${process.cwd()}/${fullPathStr}/${fileName}${f.extension}` });
        });

        FILES.forEach(file => {
            fs.writeFile(file.path, file.template, err => !err ? Logs.createSuccess(file.title) : Logs.createFail(file.title));
        });

    });

}

/**
 * By default, the file will be UpperCamelCase style
 * 
 * @param {*} s 
 */
const treatFileName = s => {
    if (typeof s !== 'string') return ''

    const dividedString = s.split('-');
    dividedString.forEach((part, index) => {
        dividedString[index] = part.charAt(0).toUpperCase() + part.slice(1)
    });

    return dividedString.join('');
}

/**
 * @param {string} fileName config file options 
 * @param {Object} configOptions config file options 
 * @param {Object} params cmd params
 */
const getFilesToBeCreated = (fileName, configFile, params) => {

    const COMPONENT_TYPE = !params.type || (params.type !== 'function' && params.type !== 'class') ? 'class' : params.type;

    const COMPONENT_EXTENSION = (configFile && configFile.usingTypescript) ? '.ts' : '.js';;
    const STYLES_EXTENSION = configFile ? '.' + configFile.styles : '.css';
    const SPEC_EXTENSION = '.spec.js'

    const TEMPLATES = {
        COMPONENT: templateParser(fs.readFileSync(`${__dirname}/../templates/component-${COMPONENT_TYPE}`).toString(), { ComponentName: fileName }),
        SPEC: templateParser(fs.readFileSync(`${__dirname}/../templates/spec-file`).toString(), { ComponentName: fileName }),
        STYLES: ''
    }

    const FILES = [
        { title: 'Component', extension: COMPONENT_EXTENSION, template: TEMPLATES.COMPONENT },
        { title: 'Styles', extension: STYLES_EXTENSION, template: TEMPLATES.STYLES },
        { title: 'Tests', extension: SPEC_EXTENSION, template: TEMPLATES.SPEC }
    ];

    let filesToBeCreated = FILES;

    if (params.spec === 'false') {
        filesToBeCreated = filesToBeCreated.filter(f => f.extension !== '.spec.js');
    }

    return filesToBeCreated;

}
