var fs = require('fs');
var { rimraf, execute, changeConfigFile } = require('./test.utils');

describe('CREATE COMPONENT WITH CONFIG FILE OPTIONS', () => {

    it('Creates a component with default config (js, spec.js, css)', () => {

        execute('uct create test');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch (e) {
            //
        }

        rimraf(__dirname + '/Test');

        // component, style and test files created
        expect(!!component && !!styles && !!tests).toBeTruthy();

    });

    it('Creates a component with SCSS (SASS) stylesheets', () => {

        execute('uct init');

        changeConfigFile('"styles": "css"', '"styles": "scss"');

        execute('uct create test');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.scss');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch (e) {
            //
        }

        const properlyImportStylesheet = component.toString().search(`import './Test.scss';`) !== -1;

        rimraf(__dirname + '/Test');
        fs.unlinkSync(__dirname + '/uct.js');

        // component, style and test files created
        expect(!!component && !!styles && !!tests && properlyImportStylesheet).toBeTruthy();

    });

    it('Creates a component without Spec File and Stylesheet by default', () => {

        execute('uct init');

        changeConfigFile('"spec": true', '"spec": false');
        changeConfigFile('"style": true', '"style": false');

        execute('uct create test');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch (e) {
            //
        }

        rimraf(__dirname + '/Test');
        fs.unlinkSync(__dirname + '/uct.js');

        // component, style and test files created
        expect(!!component && !styles && !tests).toBeTruthy();

    });

    it('Creates a component with kebab-case for folder and UpperCamelCase for files', () => {

        execute('uct init');

        changeConfigFile('"componentFileCase": "UpperCamelCase"', '"componentFileCase": "UpperCamelCase"');
        changeConfigFile('"componentFolderCase": "UpperCamelCase"', '"componentFolderCase": "kebab-case"');

        execute('uct create test');

        let currentFolder, createdComponentFolder;
        
        try {
            currentFolder = fs.readdirSync(__dirname);
            createdComponentFolder = fs.readdirSync(__dirname + '/test');
        } catch (e) {
            currentFolder = [];
            createdComponentFolder = [];
        }

        const correctFolderName = currentFolder.includes('test');        
        const correctFileName = createdComponentFolder.includes('Test.js');        

        rimraf(__dirname + '/test');
        fs.unlinkSync(__dirname + '/uct.js');

        // component, style and test files created
        expect(correctFolderName && correctFileName).toBeTruthy();

    });

});
