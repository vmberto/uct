var fs = require('fs');
var { rimraf, execute } = require('./utils');

describe('CREATE COMPONENT SERVICE', () => {

    it('creates a component', () => {

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

    it('creates a component without tests', () => {

        execute('uct create test --spec false');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch (e) {
            //
        }

        rimraf(__dirname + '/Test');

        // component and style files created
        expect(!!component && !!styles && !!!tests).toBeTruthy();

    });

    it('creates a component without stylesheets', () => {

        execute('uct create test --styles false');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
        } catch (e) {
            //
        }

        rimraf(__dirname + '/Test');

        // component and test files created
        expect(!!component && !!!styles && !!tests).toBeTruthy();

    });

    it('creates a component with SCSS (SASS) stylesheets', () => {

        execute('uct init');

        let configFile;

        try {
            configFile = fs.readFileSync(__dirname + '/uct.js').toString();
        } catch(e) {
            //
        }

        configFile = configFile.replace('"styles": "css"', '"styles": "scss"');
        fs.writeFileSync(__dirname + '/uct.js', configFile);

        execute('uct create test');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.scss');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch (e) {
            //
        }

        rimraf(__dirname + '/Test');
        fs.unlinkSync(__dirname + '/uct.js');

        // component, style and test files created
        expect(!!component && !!styles && !!tests).toBeTruthy();

    });

});
