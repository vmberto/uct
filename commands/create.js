const fs = require('fs');

module.exports = (commands, params) => {

    let path = commands[0].split('/');

    let foldersPath = path.slice(0, path.length - 1).join('/');    
    
    mkdir_p(foldersPath);

    const template = fs.readFileSync(__dirname + '/../templates/component-class').toString();

    fs.writeFile(commands[0], template, err => console.log(err))

}

/**
 * @from https://brunopedro.com/2010/12/15/recursive-directory-nodejs/
 * 
 * Offers functionality similar to mkdir -p
 *
 * Asynchronous operation. No arguments other than a possible exception
 * are given to the completion callback.
 */
function mkdir_p(path, mode = 0777, callback, position = 0) {
    parts = require('path').normalize(path).split('/');

    if (position >= parts.length) {
        if (callback) {
            return callback();
        } else {
            return true;
        }
    }

    var directory = parts.slice(0, position + 1).join('/');
    fs.stat(directory, function(err) {
        if (err === null) {
            mkdir_p(path, mode, callback, position + 1);
        } else {
            fs.mkdir(directory, mode, function (err) {
                if (err) {
                    if (callback) {
                        return callback(err);
                    } else {
                        throw err;
                    }
                } else {
                    mkdir_p(path, mode, callback, position + 1);
                }
            })
        }
    })
}