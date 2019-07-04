var tests = require('./tests.helper');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

describe('test create', () => {

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

        rimraf(__dirname + '/Test');

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

        rimraf(__dirname + '/Test');

        expect(!!component && !!styles && !!!tests).toBeTruthy();

    });

});

/**
 * Remove directory recursively
 * @param {string} dir_path
 * @see https://stackoverflow.com/a/42505874/3027390
 */
const rimraf = dir_path => {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(entry => {
            const entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}