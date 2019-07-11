var fs = require('fs');
var cp = require('child_process');
var utils = require('./utils');

describe('CREATE COMPONENT SERVICE', () => {

    it('creates a component', () => {

        cp.execSync('uct create test', { cwd: __dirname });

        let component, styles, tests;
        
        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch(e) {
            //
        }

        utils.rimraf(__dirname + '/Test');

        // component, style and test files created
        expect(!!component && !!styles && !!tests).toBeTruthy();

    });

    it('creates a component without tests', () => {

        cp.execSync('uct create test --spec false', { cwd: __dirname });

        let component, styles, tests;
        
        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
        } catch(e) {
            //
        }

        utils.rimraf(__dirname + '/Test');

        // component and style files created
        expect(!!component && !!styles && !!!tests).toBeTruthy();

    });

    it('creates a component without stylesheets', () => {

        cp.execSync('uct create test --styles false', { cwd: __dirname });

        let component, styles, tests;
        
        try {
            component = fs.readFileSync(__dirname + '/Test/Test.js');
            tests = fs.readFileSync(__dirname + '/Test/Test.spec.js');
            styles = fs.readFileSync(__dirname + '/Test/Test.css');
        } catch(e) {
            //
        }

        utils.rimraf(__dirname + '/Test');

        // component and test files created
        expect(!!component && !!!styles && !!tests).toBeTruthy();

    });

});
