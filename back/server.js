require('./api/db/db.js');// c'est le chemin vers le dossier db.js
var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 3000;
//let port = 8080;
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', PORT);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
