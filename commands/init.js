const { readFile, write } = require('../lib/file-system');

module.exports = () => {

    let template = readFile('/../templates/uct-config').toString();

    const configFile = {
        title: 'Config',
        path: `${process.cwd()}/uct.js`,
        template,
    };

    write(configFile);

};
