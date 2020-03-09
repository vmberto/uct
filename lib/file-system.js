const fs = require('fs');
const Logs = require('../lib/logs');

/**
 * Writes a file
 * 
 * @param {Object} file   
 */
exports.write = (file) => {
    if (!file) return;
    fs.writeFile(file.path, file.template, err => !err ? Logs.createSuccess(file.title) : Logs.createFail(file.title));
};

/**
 * Reads a file
 * 
 * @param {Object} file   
 */
exports.readFile = path => {
    return fs.readFileSync(`${__dirname}${path}`);
};