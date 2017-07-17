// load modules
var commands = require('./commands/index');
var chalk = require('chalk');


var prompt = 'prompt > ';
var cmdList = [];

var done = function(output) {
  if (cmdList.length) pipe(cmdList.shift(), output);
  else process.stdout.write(output.toString() + '\n' + prompt);
}

var pipe = function(cmdString, lastOutput) {
  var cmdSplit = cmdString.split(' ');
  var cmd = cmdSplit[0];
  var args = cmdSplit.slice(1);

  if (commands[cmd]) commands[cmd](lastOutput, args, done);
}

process.stdin.on('data', function (data) {
  if (data.toString().trim() === '') {
    process.stdout.write(prompt);
  } else {
    cmdList = data.toString().trim().split(/\s*\|\s*/g);
    pipe(cmdList.shift());
  }
});

process.stdout.write(prompt);
