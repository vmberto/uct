const folders = require('./folders');
const string = require('./string');
const commands = require('./commands');

module.exports = {
    ...folders,
    ...string,
    ...commands,
}