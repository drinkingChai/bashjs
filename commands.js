var fs = require('fs');

module.exports = {
  pwd: function() {
    process.stdout.write(process.mainModule.paths[0]);
    process.stdout.write('\nprompt > ');
  },
  date: function() {
    var date = new Date();
    process.stdout.write(date.toString());
    process.stdout.write('\nprompt > ');
  },
  ls: function() {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      })
      process.stdout.write("prompt > ");
    });
  },
  echo: function(args) {
    if (args[0].charAt(0) == '$' && process.env[args[0].slice(1)]) {
      process.stdout.write(process.env[args[0].slice(1)]);
    } else {
      process.stdout.write(args.join(' '));
    }
    process.stdout.write('\nprompt > ');
  },
  cat: function(args) {
    for (var i = 0; i < args.length; i++) {
      fs.readFile(args[i], function(err, data) {
        if (err) throw err;
        process.stdout.write(data);
        process.stdout.write('\nprompt > ');
      });
    }
  },
  head: function(args) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var firstFive = data.toString().split('\n').slice(0, 5);
      process.stdout.write(firstFive.join('\n'));
      process.stdout.write('\nprompt > ')
    })
  },
  tail: function(args) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n');
      var lastFive = stringSplit.slice(stringSplit.length - 5);
      process.stdout.write(lastFive.join('\n'));
      process.stdout.write('\nprompt > ')
    })
  },
  sort: function(args) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n').map(function(item) {
        return item.trim();
      });
      stringSplit.sort();
      process.stdout.write(stringSplit.join('\n'));
      process.stdout.write('\nprompt > ');
    });
  }
}
