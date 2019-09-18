var fs = require('fs');
var { rimraf, execute } = require('./test.utils');

describe('CREATE COMPONENT WITH ARGUMENTS', () => {

    it('creates a component without tests', () => {

        execute('uct create test --no-spec');

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

        execute('uct create test --no-style');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
        } catch (e) {
            //
        }

        rimraf(__dirname + '/Test');

        expect(!!component && !!!styles && !!tests).toBeTruthy();

    });

    it('creates a component without a folder', () => {

        execute('uct create test --outside-folder');

        let component, styles, tests;

        try {
            component = fs.readFileSync(__dirname + '/Test.js');
            tests = fs.readFileSync(__dirname + '/Test.spec.js');
            styles = fs.readFileSync(__dirname + '/Test.css');
        } catch (e) {
            //
        }

        fs.unlinkSync(__dirname + '/Test.js');
        fs.unlinkSync(__dirname + '/Test.spec.js');
        fs.unlinkSync(__dirname + '/Test.css');
        
        expect(!!component && !!styles && !!tests).toBeTruthy();

    });

});
