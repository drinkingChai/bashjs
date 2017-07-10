// load modules
var commands = require('./commands');

var done = function(output, stdin) {
  // show the output
  var finalOutput = output;
  while(stdin.length) {
    // console.log(stdin.shift().toString());
    finalOutput = commands[stdin.shift()](stdin, finalOutput);
  }
  process.stdout.write(finalOutput);

  // show the prompt
  process.stdout.write('\nprompt > ');
}

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  // if (data.toString().trim() === '') {
  //   process.stdout.write('prompt > ');
  // } else {
    // var cmd = data.toString().trim().split(' '); // remove the newline
    var cmdString = data.toString().trim();
    var cmdList = cmdString.split(/\s*\|\s*/g); // any amount of whitespace, pipe, any amount of whitespace

    var initCmd = cmdList[0].split(' ')[0];
    var args = cmdList[0].split(' ').slice(1);

    // console.log(cmdList, initCommand, args, cmdList.slice(1));
    commands[initCmd](cmdList.slice(1), args, done);

    // if (commands[cmdList[0]]) {
    //   commands[cmdList[0]]("",cmdList.slice(1), done);
    // } else {
    //   process.stdout.write('Unknown command...\n');
    //   process.stdout.write('prompt > ');
    // }
  // }
});
