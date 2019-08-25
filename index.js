const Args = require('./lib/args');
const Logs = require('./lib/logs');
const create = require('./commands/create');
const init = require('./commands/init');

module.exports = () => {

    const args = new Args();

    const params = args.params;
    const commands = args.commands;

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
            process.prompt;
    }

}