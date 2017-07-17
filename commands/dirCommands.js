var fs = require('fs');


function pwd(stdin, args, done) {
  done(process.cwd());
}

function ls(stdin, path, done) {
  path = path[0] || '.';
  fs.readdir(path, function(err, files) {
    if (err) throw err;
    var output = "";
    files.forEach(function(file) {
      output += file.toString() + "\n";
    })
    done(output.trim());
  });
}

function find(stdin, path, done) {
  // needs to be worked on
  done("");
}

module.exports = {
  pwd: pwd,
  ls: ls,
  find: find
}
