const Errors = require('./errors');

function isParam(arg) {
    if (!arg) return false;
    return (arg[0] === '-' && arg[1] === '-' && arg[2] !== '-') || (arg[0] === '-' && arg[1] !== '-');
}

exports.getParams = args => {
    const paramsObj = {};
    args.forEach((arg, index) => {
        
        if (isParam(arg)) {
            paramsObj[arg.replace(/[-]/g,'')] = args[index + 1];
        }

        if (arg.substring(0, 3) === '---') {
            throw Errors.UNRECOGNIZED_OPTION();
        }

    });

    return paramsObj;
};

exports.getCommands = args => {
    const commandsArr = [];
    args.forEach((arg, index) => {
        
        if (!isParam(arg) && !isParam(args[index - 1])) {
            commandsArr.push(arg);
        }

    });

    return commandsArr;
}
