const fs = require('fs');

const rootPath = () => {
    let rootPath = __dirname;
    rootPath = rootPath.split('/');
    rootPath.pop();
    rootPath = rootPath.join('/');
    return rootPath;
}

/**
 * 
 * Check if is a Javascript File
 * 
 */
const hasJavascriptExtension = (str) => {
    return str.substring(str.length - 3, str.length) === '.js';
}

/**
 * @from https://brunopedro.com/2010/12/15/recursive-directory-nodejs/
 * 
 * Offers functionality similar to mkdir -p
 *
 * Asynchronous operation. No arguments other than a possible exception
 * are given to the completion callback.
 */
const mkdir_p = (path, callback, mode = 0777, position = 0) => {
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
            mkdir_p(path, callback, mode, position + 1);
        } else {
            fs.mkdir(directory, mode, function (err) {
                if (err) {
                    if (callback) {
                        return callback(err);
                    } else {
                        throw err;
                    }
                } else {
                    mkdir_p(path, callback, mode, position + 1);
                }
            })
        }
    })
}

module.exports = {
    mkdir_p,
    rootPath,
    hasJavascriptExtension
};
