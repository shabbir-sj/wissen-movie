const express = require('express');
const path = require('path');
const port = process.env.PORT || 3010;
const app = express();

var request = require('request');

app.get('/api', function(req,res) {
  //modify the url in any way you want
  var newurl = 'http://starlord.hackerearth.com/movieslisting';
  request(newurl).pipe(res);
});

app.use('/', express.static(__dirname));


app.listen(port);
console.log('server start on port ' + port);