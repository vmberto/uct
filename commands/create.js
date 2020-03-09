// lib
const configFileReader = require('../lib/config-file-reader');
const Logs = require('../lib/logs');
const templateParser = require('../lib/template-parser');
const { write } = require ('../lib/file-system');
const { CREATE } = require ('../lib/commands');
// utils
const {
    mkdirP,
    mountFoldersPath,
    mountFileName,
} = require('../lib/folders');

const CONFIG_FILE = configFileReader();

module.exports = (commands, args) => {

    if (!commands[1] || args.includes('--help')) {
        Logs.printCreateHelp();
        return;
    }

    const INPUTED_PATH = commands[1];

    let fileName = mountFileName(INPUTED_PATH, CONFIG_FILE);
    let foldersPath = mountFoldersPath(INPUTED_PATH, args, CONFIG_FILE);

    let FILES = getFilesToBeCreated(fileName, foldersPath);

    CREATE.args.filter(arg => args.includes(arg.title)).map(a => a.action).forEach(action => action(FILES));

    mkdirP(foldersPath, () => FILES.forEach(file => write(file)));

};

/**
 * @param {string} fileName
 * @param {string} foldersPath
 */
const getFilesToBeCreated = (fileName, foldersPath) => {

    let filesToBeCreated = [];
    
    const COMPONENT_NAME = fileName;
    const COMPONENT_TYPE = CONFIG_FILE ? CONFIG_FILE.defaults.component.type : 'class';
    const COMPONENT_EXTENSION = (CONFIG_FILE && CONFIG_FILE.usingTypescript) ? 'tsx' : 'js';
    const COMPONENT_HAS_STYLESHEETS = CONFIG_FILE ? CONFIG_FILE.defaults.component.style : true;
    const COMPONENT_HAS_SPEC_FILE = CONFIG_FILE ? CONFIG_FILE.defaults.component.spec : true;
    const STYLES_EXTENSION = CONFIG_FILE ? CONFIG_FILE.styles : 'css';
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
        const SPEC_FILE_TEMPLATE = templateParser('spec-file', { COMPONENT_NAME: fileName });
        const SPEC_FILE = {
            title: 'Tests',
            template: SPEC_FILE_TEMPLATE,
            extension: SPEC_FILE_EXTENSION,
            path: `${process.cwd()}/${foldersPath}/${fileName}.${SPEC_FILE_EXTENSION}`
        };

        filesToBeCreated.push(SPEC_FILE);
    }

    return filesToBeCreated;

};