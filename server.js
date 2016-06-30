var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var morgan = require('morgan');
var multer  =   require('multer');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var UserController = require('./server/controllers/uploadController.js');

var app = express();

var fs = require('fs');
var busboy = require('connect-busboy');
//...
app.use(busboy());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));
app.use('/files', express.static(__dirname + '/files'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/',function(req,res){
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading: " + filename);
      fstream = fs.createWriteStream(__dirname + '/files/' + filename);
      file.pipe(fstream);
      fstream.on('close', function () {
          res.redirect('back');
      });
  });
  res.header('Access-Control-Allow-Origin', '*');
});

// app.post('/', multipartyMiddleware, UserController.uploadFile, function () {
//   console.log('upload req');
// });

// app.use('/h', function (req, res, next) {
//   res.render('Hello m\'fucka');
//   next();
// });

mongoose.connect('mongodb://localhost/webmhost');;
mongoose.connection.once('open', function() {

  app.models = require('./server/models/index');

  var routes = require('./server/routes');

  _.each(routes, function (controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 3000...');
  app.listen(3000);
});
