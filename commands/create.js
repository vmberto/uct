// global
const fs = require('fs');
// lib
const configFileReader = require('../lib/config-file-reader');
const Logs = require('../lib/logs');
const templateParser = require('../lib/template-parser');
// utils
const {
    mkdirP,
    getFoldersFromPath,
    getFileNameFromPath,
} = require('../utils');

const CONFIG_FILE = configFileReader();

module.exports = (commands, params) => {

    const INPUTED_PATH = commands[1];

    const foldersPath = getFoldersFromPath(INPUTED_PATH, CONFIG_FILE ? CONFIG_FILE[`componentFolderCase`] : 'default');
    const fileName = getFileNameFromPath(INPUTED_PATH, CONFIG_FILE ? CONFIG_FILE[`componentFileCase`] : 'default');

    const FILES = getFilesToBeCreated(fileName, foldersPath, params);

    mkdirP(foldersPath, () => FILES.forEach(file => write(file)));

}

/**
 * Writes a file
 * 
 * @param {Object} file   
 */
const write = ({ title, path, template }) => {
    fs.writeFile(path, template, err => !err ? Logs.createSuccess(title) : Logs.createFail(title))
}

/**
 * @param {string} fileName
 * @param {string} foldersPath
 */
const getFilesToBeCreated = (fileName, foldersPath, params) => {

    let filesToBeCreated = [];

    const COMPONENT_NAME = fileName;
    const COMPONENT_TYPE = CONFIG_FILE ? CONFIG_FILE.defaults.component.type : 'class';
    const COMPONENT_EXTENSION = (CONFIG_FILE && CONFIG_FILE.usingTypescript) ? 'ts' : 'js';
    const STYLES_EXTENSION = CONFIG_FILE ? CONFIG_FILE.styles : 'css';
    const COMPONENT_HAS_STYLESHEETS = CONFIG_FILE ? CONFIG_FILE.defaults.component.style : true;
    const COMPONENT_HAS_SPEC_FILE = CONFIG_FILE ? CONFIG_FILE.defaults.component.spec : true;
    const COMPONENT_TEMPLATE = templateParser(`component-${COMPONENT_TYPE}`, { COMPONENT_NAME, COMPONENT_HAS_STYLESHEETS, STYLES_EXTENSION });
    const COMPONENT = {
        title: 'Component',
        template: COMPONENT_TEMPLATE,
        extension: COMPONENT_EXTENSION,
        path: `${process.cwd()}/${foldersPath}/${fileName}.${COMPONENT_EXTENSION}`
    };

    filesToBeCreated.push(COMPONENT);

    if (COMPONENT_HAS_STYLESHEETS) {
        const STYLES_TEMPLATE = '';
        const STYLESHEET = {
            title: 'Styles',
            template: STYLES_TEMPLATE,
            extension: STYLES_EXTENSION,
            path: `${process.cwd()}/${foldersPath}/${fileName}.${STYLES_EXTENSION}`
        };

        filesToBeCreated.push(STYLESHEET);
    }

    if (COMPONENT_HAS_SPEC_FILE) {
        const SPEC_FILE_EXTENSION = 'spec.js';
        const SPEC_FILE_TEMPLATE = templateParser('spec-file', { COMPONENT_NAME: fileName })
        const SPEC_FILE = {
            title: 'Tests',
            template: SPEC_FILE_TEMPLATE,
            extension: SPEC_FILE_EXTENSION,
            path: `${process.cwd()}/${foldersPath}/${fileName}.${SPEC_FILE_EXTENSION}`
        }

        filesToBeCreated.push(SPEC_FILE);
    }

    filesToBeCreated = filterByInputedParams(filesToBeCreated, params)

    return filesToBeCreated;

}

const filterByInputedParams = (files, params) => {

    if (params.spec === 'false') {
        files = files.filter(f => f.extension !== 'spec.js');
    }

    if ((CONFIG_FILE && CONFIG_FILE.styles === 'none') || params.styles === 'false') {
        files = files.filter(f => f.extension !== (CONFIG_FILE ? CONFIG_FILE.styles : 'css'));
    }

    if (Object.keys(params).includes('simple') || Object.keys(params).includes('s')) {
        files = files.filter(f => f.title === 'Component');
    }

    return files;

}
