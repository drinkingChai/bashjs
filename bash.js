// load modules
var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  if (data.toString().trim() === '') {
    process.stdout.write('prompt > ');
  } else {
    var cmd = data.toString().trim().split(' '); // remove the newline

    commands[cmd[0]](cmd.slice(1));
  }
});
