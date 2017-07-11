var fs = require('fs');


function cat (stdin, args, done) {
  function read(ret) {
    var ret = ret || "";
    fs.readFile(args.shift(), function(err, data) {
      if (err) throw err;
      ret += data;
      if (args.length > 0) read(args, done, ret);
      else done(ret, stdin);
    });
  }

  read();
}

function head(stdin, args, done) {
  if (!done) return args.toString().split('\n').slice(0, 5).join('\n')

  fs.readFile(args[0], function(err, data) {
    if (err) throw err;
    var firstFive = data.toString().split('\n').slice(0, 5);
    done(firstFive.join('\n'), stdin);
  })
}

function tail(stdin, args, done) {
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
}

function wc(stdin, args, done) {
  if (!done) return (args.split("\n").length).toString();

  fs.readFile(args[0], function(err, data) {
    if (err) throw err;
    done((data.toString().split("\n").length - 1).toString(), stdin);
  })
}

function uniq(stdin, args, done) {
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
}

function sort(stdin, args, done) {
  function sortLines(fileData) {
    var stringSplit = fileData.toString().split('\n').map(function(item) {
      return item;
    });
    stringSplit.sort();
    return stringSplit.join('\n');
  }

  if (!done) return sortLines(args)

  fs.readFile(args[0], function(err, data) {
    if (err) throw err;
    done(sortLines(data.toString()), stdin);
  });
}

function grep(stdin, args, done) {
  function matchLines(fileData, str) {
    return fileData.toString().split('\n').filter(function(item) {
      if (item.includes(str)) return item;
    }).join('\n')
  }

  if (!done) return matchLines(args, stdin.shift());

  var searchStr = args[0],
    file = args[1];
  fs.readFile(file, function(err, data) {
    if (err) throw err;
    done(matchLines(data, searchStr), stdin);
  })
}


module.exports = {
  cat: cat,
  head: head,
  tail: tail,
  wc: wc,
  uniq: uniq,
  sort: sort,
  grep: grep
}
