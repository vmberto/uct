const errors = {};
errors.COMMAND_NOT_FOUND = () => new CliError('COMMAND_NOT_FOUND');
errors.UNRECOGNIZED_OPTION = () => new CliError('UNRECOGNIZED_OPTION');
errors.UNDEFINED_BINDER = () => new CliError('UNDEFINED_BINDER');

/**
 * Error class
 */
class CliError extends Error {

    /**
     * Constrcutor.
     * @param {String} title error title
     */
    constructor(title) {
        super(title);
        Error.captureStackTrace(this, CliError);
    }
    
}

module.exports = errors;
