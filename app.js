var express = require('express');
var app = express();

app.use(express.static('./dist'));

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.listen(3000, function() {
  console.log('Serving on localhost:3000');
});
