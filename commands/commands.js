var fs = require('fs');
var request = require('request');


function date(stdin, args, done) {
  done(Date(), stdin);
}

function echo(stdin, args, done) {
  if (!done) return args

  if (args[0].charAt(0) == '$' && process.env[args[0].slice(1)]) {
    done(process.env[args[0].slice(1)], stdin);
  } else {
    done(args.join(' '), stdin);
  }
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
