const fs = require('fs');

module.exports = (commands, params) => {
    fs.writeFile(`./dale/${params.name}.js`, 'This is my text', 
        err => {
            if (err) throw err;
            console.log(`${params.name}.js is Created Successfully`);
        });
}