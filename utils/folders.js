const fs = require('fs');
const { treatNameOf } = require('./string');

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

/**
 * 
 * @param {string} p path inputed by user
 * @returns path without filename (folders stack)
 */
const getFoldersFromPath = (p, nameCase) => {
    let fullPathArr = p.split('/');

    let folderName = fullPathArr[fullPathArr.length - 1];
    folderName = treatNameOf('Folder', folderName, nameCase);

    fullPathArr[fullPathArr.length - 1] = folderName;

    return fullPathArr.join('/');
};

/**
 * 
 * @param {string} p path inputed by user
 * @returns path without folders stack
 */
const getFileNameFromPath = (p, nameCase) => {
    let fullPathArr = p.split('/');

    let fileName = treatNameOf('File', fullPathArr[fullPathArr.length - 1], nameCase);

    return fileName;
};


module.exports = {
    mkdirP,
    getFoldersFromPath,
    getFileNameFromPath,
};
