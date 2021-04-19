const express = require('express')
const app = express()
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var path = require('path');

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});
app.listen(port);
console.log('Example app listening on port: ', port);
