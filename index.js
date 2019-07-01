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
            commands = commands.splice(1);
            create(commands, params);
            break;
        case 'init':
            console.log('Creating config file ...');
            init(commands, params);
            break;
        case 'help':
            console.log('Printing Help Info');
            break;
        default:
            console.log(Logs.defaultLog())
    }

}