const errors = {};
errors.COMMAND_NOT_FOUND = () => new CliError('COMMAND_NOT_FOUND');
errors.UNRECOGNIZED_ARGUMENT = () => new CliError('UNRECOGNIZED_ARGUMENT');
errors.UNDEFINED_BINDER = () => new CliError('UNDEFINED_BINDER');
errors.INVALID_CASE_NAME_FOR_FILE = () => new CliError('INVALID_CASE_NAME_FOR_FILE');

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
