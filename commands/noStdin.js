var fs = require('fs');
var request = require('request');


function date(stdin, args, done) {
  done(Date(), stdin);
}

function echo(stdin, args, done) {
  done(args.reduce(function(acc, item) {
    if (item[0] === '$') return acc += process.env[item.slice(1)] + " "
    else return acc += item + " ";
  }, "").trim(), stdin);
}

function curl(stdin, args, done) {
  var url = args[0];
  if (url.slice(0, 7) !== 'http://' || url.slice(0, 8) !== 'https://') url = 'http://' + url
  request(url, function(err, res, body) {
    if (err) throw err;
    done(body, stdin);
  })
}


module.exports = {
  date: date,
  echo: echo,
  curl: curl,
}
