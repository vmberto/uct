var fs = require('fs');
var { rimraf, execute } = require('./test.utils');

describe('CREATE COMPONENT WITH PARAMS', () => {

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

        // component and test files created
        expect(!!component && !!!styles && !!tests).toBeTruthy();

    });

});
