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
  if (!done) return args.toString().split('\n').slice(0, 5).join('\n')

  fs.readFile(args[0], function(err, data) {
    if (err) throw err;
    done(data.toString().split('\n').slice(0, 5).join('\n'), stdin);
  })
}

function tail(stdin, args, done) {
  if (!done) {
    return args.toString().split('\n').slice(-5).join('\n');
  }

  fs.readFile(args[0], function(err, data) {
    if (err) throw err;
    done(data.toString().split('\n').slice(-5).join('\n'), stdin);
  })
}

function wc(stdin, args, done) {
  if (stdin && !args.length) return getWordCount(null, stdin);
  fs.readFile(args[0], getWordCount);

  function getWordCount(err, data) {
    if (err) throw err;
    done((data.toString().split("\n").length), stdin);
  }
}

function uniq(stdin, args, done) {
  function findUniq(fileData) {
    return fileData.split("\n").filter(function(item, i, arr) {
      if (i == 0 || item !== arr[i - 1]) return item;
    }).join("\n");
  }

  if (!done) return findUniq(args)

  fs.readFile(args[0], function(err, data) {
    if (err) throw err;
    done(findUniq(data.toString()), stdin);
  })
}

function sort(stdin, args, done) {
  function sortLines(fileData) {
    return fileData.split('\n').sort().join('\n');
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
