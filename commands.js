var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(stdin, args, done) {
    done(process.mainModule.paths[0], stdin);
  },
  date: function(stdin, args, done) {
    var date = new Date();
    done(date.toString(), stdin);
  },
  ls: function(stdin, path, done) {
    path = path[0] || '.';
    fs.readdir(path, function(err, files) {
      if (err) throw err;
      var output = "";
      files.forEach(function(file) {
        output += file.toString() + "\t";
      })
      done(output.trim(), stdin);
    });
  },
  echo: function(stdin, args, done) {
    if (!done) { return args; }
    if (args[0].charAt(0) == '$' && process.env[args[0].slice(1)]) {
      done(process.env[args[0].slice(1)], stdin);
    } else {
      done(args.join(' '), stdin);
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
          done(ret, stdin);
        }
      });
    }

    read();
  },
  head: function(stdin, args, done) {
    if (!done) {
      return args.toString().split('\n').slice(0, 5).join('\n');
    }
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var firstFive = data.toString().split('\n').slice(0, 5);
      done(firstFive.join('\n'), stdin);
    })
  },
  tail: function(stdin, args, done) {
    if (!done) {
      var stringSplit = args.toString().split('\n');
      return stringSplit.slice(stringSplit.length - 5).join('\n');
    }
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      var stringSplit = data.toString().split('\n');
      var lastFive = stringSplit.slice(stringSplit.length - 5);
      done(lastFive.join('\n'), stdin);
    })
  },
  wc: function(stdin, args, done) {
    if (!done) {
      return (args.split("\n").length).toString();
    }
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      done((data.toString().split("\n").length - 1).toString(), stdin);
    })
  },
  uniq: function(stdin, args, done) {
    function findUniq(fileData) {
      fileData = fileData.split("\n");
      var uniqLines = [];
      for (var i = 0, l = fileData.length; i < l; i++) {
        if (uniqLines.length == 0 || fileData[i].trim() !== uniqLines[uniqLines.length - 1]) {
          uniqLines.push(fileData[i]);
        }
      }
      return uniqLines.join("\n");
    }

    if (!done) {
      return findUniq(args);
    }
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      done(findUniq(data.toString()), stdin);
    })
  },
  sort: function(stdin, args, done) {
    function sortLines(fileData) {
      var stringSplit = fileData.toString().split('\n').map(function(item) {
        return item;
      });
      stringSplit.sort();
      return stringSplit.join('\n');
    }

    if (!done) {
      return sortLines(args);
    }
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      done(sortLines(data.toString()), stdin);
    });
  },
  curl: function(stdin, args, done) {
    // args[0] = args[0].slice(0, 7) === 'http://' || args[0].slice(0, 7) === 'https://' ?
    request(args[0], function(err, res, body) {
      if (err) throw err;
      done(body, stdin);
    })
  },
  find: function(stdin, args, done) {
    done("", stdin);
  },
  grep: function(stdin, args, done) {
    function matchLines(fileData, str) {
      return fileData.toString().split('\n').filter(function(item) {
        if (item.includes(str)) return item;
      }).join('\n')
    }

    if (!done) {
      return matchLines(args, stdin.shift());
    }

    var searchStr = args[0],
      file = args[1];
    fs.readFile(file, function(err, data) {
      if (err) throw err;
      done(matchLines(data, searchStr), stdin);
    })
  }
}
