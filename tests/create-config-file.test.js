var fs = require('fs');
var cp = require('child_process');

describe('UCT INIT - CONFIG FILE', () => {

    it('creates config file', () => {

        cp.execSync('uct init', { cwd: __dirname });

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