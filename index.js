const getParams = require('./lib/args').getParams;
const getCommands = require('./lib/args').getCommands;

module.exports = () => {
    const args = process.argv.splice(2);

    const params = getParams(args);
    const commands = getCommands(args);

    if (commands[0] === 'create') {
        console.error(`Criando um ${args[1]} de nome ${args[2]} do tipo ${params.type || 'classe'} ${params.spec === 'true' ? 'com' : 'sem'} arquivo de testes`)
    }

}