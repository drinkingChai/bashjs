// load modules
var commands = require('./commands');

var done = function(output, stdin) {
  // show the output
  while(stdin.length) {
    var pipeCmdList = stdin.shift().split(' ');
    if (pipeCmdList.length > 1) stdin.unshift(pipeCmdList[1]);
    output = commands[pipeCmdList[0]](stdin, output);
  }
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
    var cmdString = data.toString().trim();
    var cmdList = cmdString.split(/\s*\|\s*/g); // any amount of whitespace, pipe, any amount of whitespace

    var initCmd = cmdList[0].split(' ')[0];
    var args = cmdList[0].split(' ').slice(1);

    if (commands.hasOwnProperty(initCmd)) {
      commands[initCmd](cmdList.slice(1), args, done);
    } else {
      process.stdout.write(initCmd + ' unknown command...\n');
      process.stdout.write('prompt > ');
    }
  }
});
