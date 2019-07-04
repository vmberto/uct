// global
const fs = require('fs');
// lib
const configFileReader = require('../lib/config-file-reader');
const Errors = require('../lib/errors');
const Logs = require('../lib/logs');
const templateParser = require('../lib/template-parser');
// utils
const { mkdirP, hasJavascriptExtension, toKebabCase, toSnakeCase, toUpperCamelCase, toLowerCamelCase } = require('../utils');

const CONFIG_FILE = configFileReader();

module.exports = (commands, params) => {

    if (hasJavascriptExtension(commands[1])) commands[1] = commands[1].split('.js').join('');
    const INPUTED_PATH = commands[1];

    let foldersPath = getFoldersPathFrom(INPUTED_PATH);
    const fileName = getFileNameFrom(INPUTED_PATH);

    /** Simple Component = Component created outside a folder */
    if (params.simple || params.s) {
        foldersPath = foldersPath.split('/');
        foldersPath.pop();
        foldersPath = foldersPath.join('/');
    }

    const filesToBeCreated = getFilesToBeCreated(fileName, foldersPath, params);

    mkdirP(foldersPath, () => {

        filesToBeCreated.forEach(file => {
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

    let folderName = fullPathArr[fullPathArr.length - 1];
    folderName = treatNameOf('Folder', folderName);

    fullPathArr[fullPathArr.length - 1] = folderName;

    return fullPathArr.join('/');
};

/**
 * 
 * @param {string} p path inputed by user
 */
const getFileNameFrom = p => {
    let fullPathArr = p.split('/');

    let fileName = treatNameOf('File', fullPathArr[fullPathArr.length - 1]);

    return fileName;
};

/**
 * By default, the file will be UpperCamelCase style
 * 
 * @param {string} type
 * @param {string} name
 * 
 * @throws {INVALID_CASE_NAME_FOR_FILE}
 */
const treatNameOf = (type, name) => {
    if (typeof name !== 'string') return '';
    const usedCase = CONFIG_FILE ? CONFIG_FILE[`component${type}Case`] : 'default';

    // File names can't use kebab-case
    if (type === 'File' && usedCase === 'kebab-case') throw Errors.INVALID_CASE_NAME_FOR_FILE();

    switch (usedCase) {

        case 'UpperCamelCase': return toUpperCamelCase(name);
        case 'lowerCamelCase': return toLowerCamelCase(name);
        case 'kebab-case': return toKebabCase(name);
        case 'snake_case': return toSnakeCase(name);
        default: return toUpperCamelCase(name);

    }

}

/**
 * @param {string} fileName config file options 
 * @param {Object} configOptions config file options 
 * @param {Object} params cmd params
 */
const getFilesToBeCreated = (fileName, foldersPath, params) => {

    const COMPONENT_TYPE = !params.type || (params.type !== 'function' && params.type !== 'class') ? 'class' : params.type;

    const EXTENSIONS = {
        COMPONENT: (CONFIG_FILE && CONFIG_FILE.usingTypescript) ? '.ts' : '.js',
        STYLES: CONFIG_FILE ? '.' + CONFIG_FILE.styles : '.css',
        SPEC: '.spec.js'
    }

    const TEMPLATES = {
        COMPONENT: templateParser(
            fs.readFileSync(`${__dirname}/../templates/component-${COMPONENT_TYPE}`).toString(),
            { 
                ComponentName: fileName,
                UsingCSS: CONFIG_FILE && CONFIG_FILE.styles === 'none' ? false : true,
                StylesExtension: CONFIG_FILE && CONFIG_FILE.styles ? CONFIG_FILE.styles : 'css'
            }
        ),

        SPEC: templateParser(fs.readFileSync(`${__dirname}/../templates/spec-file`).toString(), { ComponentName: fileName }),
        STYLES: ''
    }

    const FILES = [
        { title: 'Component', template: TEMPLATES.COMPONENT, extension: EXTENSIONS.COMPONENT, path: `${process.cwd()}/${foldersPath}/${fileName}${EXTENSIONS.COMPONENT}` },
        { title: 'Styles', template: TEMPLATES.STYLES, extension: EXTENSIONS.STYLES, path: `${process.cwd()}/${foldersPath}/${fileName}${EXTENSIONS.STYLES}` },
        { title: 'Tests', template: TEMPLATES.SPEC, extension: EXTENSIONS.SPEC, path: `${process.cwd()}/${foldersPath}/${fileName}${EXTENSIONS.SPEC}` }
    ];

    let filesToBeCreated = FILES;

    if (params.spec === 'false') {
        filesToBeCreated = filesToBeCreated.filter(f => f.extension !== EXTENSIONS.SPEC);
    }

    if (CONFIG_FILE && CONFIG_FILE.styles === 'none') {
        filesToBeCreated = filesToBeCreated.filter(f => f.title !== 'Styles');
    }

    if (Object.keys(params).includes('simple') || Object.keys(params).includes('s')) {
        filesToBeCreated = filesToBeCreated.filter(f => f.title === 'Component');
    }

    return filesToBeCreated;

}
