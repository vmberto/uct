const Errors = require('./errors');

class InputHandler {

    constructor() {
        let input = process.argv.splice(2);

        this.commands = input.filter(arg => !isArg(arg));
        this.args = input.filter(arg => isArg(arg));

    }

}

function isArg(string) {
    if (!string) return false;
    if (string.substring(0, 3) === '---') {
        throw Errors.UNRECOGNIZED_ARGUMENT();
    }
    return (string[0] === '-' && string[1] === '-' && string[2] !== '-') || (string[0] === '-' && string[1] !== '-');
}


module.exports = InputHandler;
