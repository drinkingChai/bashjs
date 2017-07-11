var fs = require('fs');


function pwd(stdin, args, done) {
  done(process.mainModule.paths[0], stdin);
}

function ls(stdin, path, done) {
  path = path[0] || '.';
  fs.readdir(path, function(err, files) {
    if (err) throw err;
    var output = "";
    files.forEach(function(file) {
      output += file.toString() + "\n";
    })
    done(output.trim(), stdin);
  });
}

function find(stdin, path, done) {
  // run find on the first layer
  // if the length of find is > 1 run find again
  var output = [], i = 0;

  function readAll(filePath) {
    fs.readdir(filePath = filePath[0] || '.', function(err, files) {
      output[i++] = filePath;
      if (files) {
        files.forEach(function(item, index) {
          output[i++] = item;
          readAll([item]);
          // if (index + 1 == files.length) done(output.join('\n'), stdin);
        })
      }
      done(output.join('\n'), stdin)
    })
  };

  readAll(path);
}

module.exports = {
  pwd: pwd,
  ls: ls,
  find: find
}
