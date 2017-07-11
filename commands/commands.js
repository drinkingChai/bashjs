var fs = require('fs');
var request = require('request');


function date(stdin, args, done) {
  done(Date(), stdin);
}

function echo(stdin, args, done) {
  if (!done) return args

  done(args.reduce(function(acc, item) {
    if (item[0] === '$') return acc += process.env[args[0].slice(1)] + " "
    else return acc += item + " ";
  }, "").trim(), stdin);
}

function curl(stdin, args, done) {
  request(args[0], function(err, res, body) {
    if (err) throw err;
    done(body, stdin);
  })
}


module.exports = {
  date: date,
  echo: echo,
  curl: curl,
}
