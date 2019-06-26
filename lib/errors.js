const errors = {};
errors.COMMAND_NOT_FOUND = () => new CliError('COMMAND_NOT_FOUND');

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
