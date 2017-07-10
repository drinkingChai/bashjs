var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(stdin, args, done) {
    done(process.mainModule.paths[0]);
  },
  date: function(stdin, args, done) {
    var date = new Date();
    done(date.toString());
  },
  ls: function(stdin, args, done) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      var output = "";
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      done(output.trim());
    });
  },
  echo: function(stdin, args, done) {
    if (args[0].charAt(0) == '$' && process.env[args[0].slice(1)]) {
      done(process.env[args[0].slice(1)]);
    } else {
      done(args.join(' '));
    }
  },
  cat: function(stdin, args, done) {
    function read(ret) {
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

    read();
  },
  head: function(stdin, args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var firstFive = data.toString().split('\n').slice(0, 5);
      done(firstFive.join('\n'));
    })
  },
  tail: function(stdin, args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n');
      var lastFive = stringSplit.slice(stringSplit.length - 5);
      done(lastFive.join('\n'));
    })
  },
  wc: function(stdin, args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      done((data.toString().split("\n").length - 1).toString());
    })
  },
  uniq: function(stdin, args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var arrData = data.toString().split("\n"),
        uniqLines = [];
      for (var i = 0, l = arrData.length; i < l; i++) {
        if (uniqLines.length == 0 || arrData[i].trim() !== uniqLines[uniqLines.length - 1]) {
          uniqLines.push(arrData[i]);
        }
      }
      done(uniqLines.join("\n"));
    })
  },
  sort: function(stdin, args, done) {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n').map(function(item) {
        return item;
      });
      stringSplit.sort();
      done(stringSplit.join('\n'));
    });
  },
  curl: function(stdin, args, done) {
    // args[0] = args[0].slice(0, 7) === 'http://' || args[0].slice(0, 7) === 'https://' ?
    request(args[0], function(err, res, body) {
      if (err) throw err;
      done(body);
    })
  },
  find: function(stdin, args, done) {
    console.log(process);
    done("");
  }
}
