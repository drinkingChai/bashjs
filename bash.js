// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  switch (cmd) {
    case 'pwd':
      process.stdout.write(process.mainModule.paths[0])
      break;
    case 'date':
      var date = new Date();
      process.stdout.write(date.toString());
      break;
    default:
      break;
  }
  // process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');

});
