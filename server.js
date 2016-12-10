var express = require('express');
var request = require("request");
var fs = require('fs');
var bodyParser = require("body-parser");
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var ip='192.168.1.9';
app.set('port', (9000));
// set static path
app.use(express.static(path.join(__dirname)));
// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//start server
app.listen(app.get('port'), function(){
    console.log('Server has started at port:'+':'+ app.get('port'));
});
