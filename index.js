const getParams = require('./lib/args').getParams;
const getCommands = require('./lib/args').getCommands;
const Logs = require('./lib/logs');
const create = require('./commands/create');
const init = require('./commands/init');

module.exports = () => {
    const args = process.argv.splice(2);

    const params = getParams(args);
    let commands = getCommands(args);

    switch (commands[0]) {
        case 'create':
            create(commands, params);
            break;
        case 'init':
            init(commands, params);
            break;
        case 'help':
            console.log('Printing Help Info');
            break;
        default:
            console.log(Logs.defaultLog())
    }

}