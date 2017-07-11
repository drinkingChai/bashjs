var commands = require('./commands');
Object.assign(commands, require('./dirCommands'));
Object.assign(commands, require('./fileCommands'));

module.exports = commands;
