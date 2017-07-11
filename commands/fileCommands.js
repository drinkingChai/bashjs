var fs = require('fs');


function cat (stdin, args, done) {
  var contentArr = [], i = 0;
  (function read() {
    fs.readFile(args.shift(), function(err, data) {
      if (err) throw err;
      contentArr[i++] = data;
      if (args.length > 0) read();
      else done(contentArr.join(''), stdin);
    });
  })();
}

function head(stdin, args, done) {
  if (stdin && !args.length) return returnOutput(null, stdin);
  fs.readFile(args[0], returnOutput);

  function returnOutput(err, data) {
    if (err) throw err;
    done(data.toString().split('\n').slice(0, 5).join('\n'), stdin);
  }
}

function tail(stdin, args, done) {
  if (stdin && !args.length) return returnOutput(null, stdin);
  fs.readFile(args[0], returnOutput)

  function returnOutput(err, data) {
    if (err) throw err;
    done(data.toString().split('\n').slice(-5).join('\n'), stdin);
  }
}

function wc(stdin, args, done) {
  if (stdin && !args.length) return returnOutput(null, stdin);
  fs.readFile(args[0], returnOutput);

  function returnOutput(err, data) {
    if (err) throw err;
    done((data.toString().split("\n").length), stdin);
  }
}

function uniq(stdin, args, done) {
  if (stdin && !args.length) return returnOutput(null, stdin);
  fs.readFile(args[0], returnOutput);

  function returnOutput(err, data) {
    done(data.toString().split("\n").filter(function(item, i, arr) {
      if (i == 0 || item !== arr[i - 1]) return item;
    }).join("\n"), stdin);
  }
}

function sort(stdin, args, done) {
  if (stdin && !args.length) return returnOutput(null, stdin);
  fs.readFile(args[0], returnOutput);

  function returnOutput(err, data) {
    if (err) throw err;
    done(data.toString().split('\n').sort().join('\n'), stdin);
  }
}

function grep(stdin, args, done) {
  var searchStr = args[0],
    file = args[1];

  if (stdin && !args[1]) return returnOutput(null, stdin);
  fs.readFile(file, returnOutput);

  function returnOutput(err, data) {
    if (err) throw err;
    done(matchLines(data, searchStr), stdin);
  }

  function matchLines(data, str) {
    return data.toString().split('\n').filter(function(item) {
      if (item.includes(str)) return item;
    }).join('\n')
  }
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
