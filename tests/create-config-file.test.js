var fs = require('fs');
var cp = require('child_process');
var { rimraf, execute } = require('./test.utils');

describe('UCT INIT - CONFIG FILE', () => {

    it('creates config file', () => {

        execute('uct init');

        let configFile;
        
        try {
            configFile = fs.readFileSync(__dirname + '/uct.js');
        } catch(e) {
            //
        }

        fs.unlinkSync(__dirname + '/uct.js');

        // config file created
        expect(!!configFile).toBeTruthy();

    });

});