var express = require('express'),
  path = require('path'),
  fs = require('fs'),
  http = require('http'),
  path = require('path'),
  morgan = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  sample = './samples/',
  app = express(),
  port = 4202;
var request = require('request');
app.use(cors());
app.use(bodyParser());

var example = {
  data: require(sample + 'data.json'),
};

app.post('/user/data', function (req, res) {
  setTimeout( function() {
    res.setHeader('Content-Type', 'application/json');
    res.send(example.data);
  }, 0);
});

app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
