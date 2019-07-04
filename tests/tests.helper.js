var cp = require('child_process');

exports.execute = command => 
    cp.exec(command, { cwd: __dirname }, (error, stdout, stderr) => { error, stdout, stderr });
         
// console.log('stdout: ' + stdout);
// console.log('stderr: ' + stderr);
// if (error !== null) {
//     console.log('exec error: ' + error);
// }