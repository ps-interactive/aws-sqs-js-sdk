const parse = require('minimist')(process.argv.slice(2));

module.exports = { command: parse._[0], name: parse._[1] };
