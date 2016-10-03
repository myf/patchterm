const readline = require('readline');
const spawn = require('child_process').spawn;
const s = require('./s');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('=> ');
module.exports = rl;

