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
      output += file.toString() + "\t";
    })
    done(output.trim(), stdin);
  });
}

function find(stdin, args, done) {
  //incomplete
  done("", stdin);
}

module.exports = {
  pwd: pwd,
  ls: ls,
  find: find
}
