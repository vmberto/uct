const cp = require('child_process');
const fs = require('fs');
const path = require('path');

exports.execute = command => 
    cp.exec(command, { cwd: __dirname }, (error, stdout, stderr) => { error, stdout, stderr });
         
// console.log('stdout: ' + stdout);
// console.log('stderr: ' + stderr);
// if (error !== null) {
//     console.log('exec error: ' + error);
// }

/**
 * Remove directory recursively
 * @param {string} dir_path
 * @see https://stackoverflow.com/a/42505874/3027390
 */
exports.rimraf = dir_path => {
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