var express = require('express');
var app = express.createServer();

app.set('view engine', 'jade');
app.set('view options', { layout: false });

app.configure('development', function() {
   app.use(express.logger('dev'));
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
   app.use(express.errorHandler());
});

app.use(require('connect-assets')());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
   res.render('index');
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('node app running port ' + port);