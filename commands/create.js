// global
const fs = require('fs');
// lib
const configFileReader = require('../lib/config-file-reader');
const Logs = require('../lib/logs');
const templateParser = require('../lib/template-parser');
// utils
const { mkdirP, hasJavascriptExtension } = require('../utils');

const CONFIG_FILE = configFileReader();

module.exports = (commands, params) => {

    if (hasJavascriptExtension(commands[1])) commands[1] = commands[1].split('.js').join('');
    const INPUTED_PATH = commands[1];

    const foldersPath = getFoldersPathFrom(INPUTED_PATH);
    const fileName = getFileNameFrom(INPUTED_PATH);

    mkdirP(foldersPath, () => {

        const FILES = [];

        getFilesToBeCreated(fileName, params).forEach(f => {
            FILES.unshift({ ...f, path: `${process.cwd()}/${foldersPath}/${fileName}${f.extension}` });
        });

        FILES.forEach(file => {
            fs.writeFile(file.path, file.template, err => !err ? Logs.createSuccess(file.title) : Logs.createFail(file.title));
        });

    });

}

/**
 * 
 * @param {string} p path inputed by user
 */
const getFoldersPathFrom = p => {
    let fullPathArr = p.split('/');

    let folderName = fullPathArr[fullPathArr.length - 2] || fullPathArr[fullPathArr.length - 1];
    folderName = treatNameOf('Folder', folderName);

    if (fullPathArr[fullPathArr.length - 2]) {
        fullPathArr[fullPathArr.length - 2] = folderName;
    } else {
        fullPathArr[fullPathArr.length - 1] = folderName;
    }

    return fullPathArr.join('/');
};

/**
 * 
 * @param {string} p path inputed by user
 */
const getFileNameFrom = p => {
    let fullPathArr = p.split('/');

    let fileName = treatNameOf('File', fullPathArr[fullPathArr.length - 1]);

    fullPathArr[fullPathArr.length - 1] = fileName;

    return fullPathArr.join('/');
};

/**
 * By default, the file will be UpperCamelCase style
 * 
 * @param {string} type
 * @param {string} name
 */
const treatNameOf = (type, name) => {
    if (typeof name !== 'string') return '';

    if (CONFIG_FILE) {

        const usedCase = CONFIG_FILE[`component${type}Name`];

        switch (usedCase) {

            case 'UpperCamelCase': break;
            case 'lowerCamelCase': break;
            case 'kebab-case': break;
            case 'snake_case': break;
            default: break;

        }

    }

    const dividedString = name.split('-');
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
const getFilesToBeCreated = (fileName, params) => {

    const COMPONENT_TYPE = !params.type || (params.type !== 'function' && params.type !== 'class') ? 'class' : params.type;

    const EXTENSIONS = {
        COMPONENT: (CONFIG_FILE && CONFIG_FILE.usingTypescript) ? '.ts' : '.js',
        STYLES: CONFIG_FILE ? '.' + CONFIG_FILE.styles : '.css',
        SPEC: '.spec.js'
    }

    const TEMPLATES = {
        COMPONENT: templateParser(fs.readFileSync(`${__dirname}/../templates/component-${COMPONENT_TYPE}`).toString(), { ComponentName: fileName, UsingCSS: CONFIG_FILE && CONFIG_FILE.styles === 'none' ? false : true }),
        SPEC: templateParser(fs.readFileSync(`${__dirname}/../templates/spec-file`).toString(), { ComponentName: fileName }),
        STYLES: ''
    }

    const FILES = [
        { title: 'Component', extension: EXTENSIONS.COMPONENT, template: TEMPLATES.COMPONENT },
        { title: 'Styles', extension: EXTENSIONS.STYLES, template: TEMPLATES.STYLES },
        { title: 'Tests', extension: EXTENSIONS.SPEC, template: TEMPLATES.SPEC }
    ];

    let filesToBeCreated = FILES;

    if (params.spec === 'false') {
        filesToBeCreated = filesToBeCreated.filter(f => f.extension !== '.spec.js');
    }

    if (CONFIG_FILE && CONFIG_FILE.styles === 'none') {
        filesToBeCreated = filesToBeCreated.filter(f => f.title !== 'Styles');
    }

    if (Object.keys(params).includes('simple') || Object.keys(params).includes('s')) {
        filesToBeCreated = filesToBeCreated.filter(f => f.title === 'Component');
    }

    return filesToBeCreated;

}
