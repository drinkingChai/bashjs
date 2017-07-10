var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(args, done) {
    done(process.mainModule.paths[0]);
  },
  date: function(args, done) {
    var date = new Date();
    done(date.toString());
  },
  ls: function(args, done) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      var output = "";
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      done(output.trim());
    });
  },
  echo: function(args, done) {
    if (args[0].charAt(0) == '$' && process.env[args[0].slice(1)]) {
      done(process.env[args[0].slice(1)]);
    } else {
      done(args.join(' '));
    }
  },
  cat: function(args, done) {
    function read(args, done, ret) {
      var ret = ret || "";
      fs.readFile(args.shift(), function(err, data) {
        if (err) throw err;
        ret += data;
        if (args.length > 0) {
          read(args, done, ret);
        } else {
          done(ret);
        }
      });
    }

    read(args, done);
  },
  head: function(args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var firstFive = data.toString().split('\n').slice(0, 5);
      done(firstFive.join('\n'));
    })
  },
  tail: function(args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n');
      var lastFive = stringSplit.slice(stringSplit.length - 5);
      done(lastFive.join('\n'));
    })
  },
  sort: function(args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n').map(function(item) {
        return item.trim();
      });
      stringSplit.sort();
      done(stringSplit.join('\n'));
    });
  },
  curl: function(args, done) {
    // args[0] = args[0].slice(0, 7) === 'http://' || args[0].slice(0, 7) === 'https://' ?
    request(args[0], function(err, res, body) {
      if (err) throw err;
      done(body);
    })
  }
}
