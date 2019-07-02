const fs = require('fs');

/**
 * @from https://brunopedro.com/2010/12/15/recursive-directory-nodejs/
 * 
 * Offers functionality similar to mkdir -p
 *
 * Asynchronous operation. No arguments other than a possible exception
 * are given to the completion callback.
 */
const mkdirP = (path, callback, position = 0) => {
    if (path[0] === '/') path = path.slice(1, path.length);
    parts = require('path').normalize(path).split('/');

    if (position >= parts.length) {
        if (callback) {
            return callback();
        } else {
            return true;
        }
    }

    var directory = parts.slice(0, position + 1).join('/');
    fs.stat(directory, function (err) {
        if (err === null) {
            mkdirP(path, callback, position + 1);
        } else {
            fs.mkdir(directory, function (err) {
                if (err) {
                    if (callback) {
                        return callback(err);
                    } else {
                        throw err;
                    }
                } else {
                    mkdirP(path, callback, position + 1);
                }
            })
        }
    })
}

module.exports = {
    mkdirP
};
