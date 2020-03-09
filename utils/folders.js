const fs = require('fs');
const path = require('path');
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
    let parts;
    if (path[0] === '/') path = path.slice(1, path.length);
    parts = require('path').normalize(path).split('/');

    if (position >= parts.length) {
        if (callback) {
            return callback();
        } else {
            return true;
        }
    }

    let directory = parts.slice(0, position + 1).join('/');
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
            });
        }
    });
};

/**
 * 
 * @param {string} p path inputed by user
 * @returns path without filename (folders stack)
 */
const mountFoldersPath = (p, args, CONFIG_FILE) => {
    let folderName = path.basename(p);
    let foldersPath = path.format({
        dir: p === folderName ? '' : p.replace(folderName, ''),
        base: treatNameOf('Folder', folderName, CONFIG_FILE ? CONFIG_FILE[`componentFolderCase`] : 'default'),
    });

    if (args.includes('--outside-folder')) {
        foldersPath = foldersPath.split('/');
        foldersPath.pop();
        foldersPath = foldersPath.join('/');
    }
    
    return foldersPath;
};

/**
 * 
 * @param {string} p path inputed by user
 * @returns path without folders stack
 */
const mountFileName = (p, CONFIG_FILE) => {
    let fullPathArr = p.split('/');

    let fileName = fullPathArr[fullPathArr.length - 1];

    fileName = treatNameOf('File', fileName, CONFIG_FILE ? CONFIG_FILE[`componentFileCase`] : 'default');


    return fileName;
};


module.exports = {
    mkdirP,
    mountFoldersPath,
    mountFileName,
};
