require('dotenv').load();
const fs = require('fs');

// Use Babel for server runtime transpilation.
const babelrc = fs.readFileSync('./.babelrc');
var config;
try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}
require('babel-core/register')(config);

// Start the server.
const server = require('./servers/client');
server.start()
