const InputHandler = require('./lib/input-handler');
const Logs = require('./lib/logs');
const create = require('./commands/create');
const init = require('./commands/init');

// commands
const { CREATE, INIT, HELP } = require('./lib/commands');

module.exports = () => {

    try {

        const input = new InputHandler();
    
        const commands = input.commands;
        const args = input.args;

        switch (commands[0]) {
    
            case CREATE.cmd:
                create(commands, args);
                break;
    
            case INIT.cmd:
                init(commands, args);
                break;
    
            case HELP.cmd:
                Logs.print('Printing Help Info');
                break;
                
            default:
                Logs.defaultLog();
                process.prompt;
        }

    } catch(e) {
        Logs.error(e.message);
    }

};