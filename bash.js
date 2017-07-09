// load modules
var commands = require('./commands');

var done = function(output) {
  // show the output
  process.stdout.write(output);

  // show the prompt
  process.stdout.write('\nprompt > ');
}

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  if (data.toString().trim() === '') {
    process.stdout.write('prompt > ');
  } else {
    var cmd = data.toString().trim().split(' '); // remove the newline

    if (commands[cmd[0]]) {
      commands[cmd[0]](cmd.slice(1), done);
    } else {
      process.stdout.write('Unknown command...\n');
      process.stdout.write('prompt > ');
    }
  }
});
