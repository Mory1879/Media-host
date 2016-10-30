var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var morgan = require('morgan');
var multer  =   require('multer');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var User = require('./server/models/user.js');
var Webm = require('./server/models/webm.js');

var config = require('./server/config/database.js');

var UserController = require('./server/controllers/uploadController.js');

var app = express();

var fs = require('fs');
var busboy = require('connect-busboy');


var passport = require('passport');
var jwt = require('jwt-simple');
//...
app.use(busboy());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));
app.use('/files', express.static(__dirname + '/files'));
app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


var apiRoutes = express.Router();

var auth = function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      login: decoded.login
    }, function (err, user) {
      if (err) return false;

      if (!user) {
        // return false;
        return res.status(403).send({success: false, msg: 'User not found'});
      } else {
        return true;
      }
    });
  } else {
    // return false;
    return res.status(403).send({success: false, msg: 'No token provided'});
  }
}



require('./server/config/passport.js')(passport);


// app.models = require('./server/models/index');
// var routes = require('./server/routes');
// _.each(routes, function (controller, route) {
//   app.use(route, controller(app, route));
// });

apiRoutes.post('/uploadvideo', passport.authenticate('jwt', {session: false}),function(req,res){
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading: " + filename);
      fstream = fs.createWriteStream(__dirname + '/files/' + filename);
      file.pipe(fstream);
      fstream.on('close', function () {
          // res.redirect('back');
      });
  });
});

apiRoutes.get('/video', passport.authenticate('jwt', {session: false}), function (req, res) {
  // auth(req, res);
  return Webm.find(function (err, webm) {
        if (!err) {
            return res.send(webm);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});
apiRoutes.post('/video', passport.authenticate('jwt', {session: false}), function (req, res) {
  var webm = new Webm({
      title: req.body.title,
      description: req.body.description,
      urlToVideo: req.body.urlToVideo,
      uploader_id: req.body.uploader_id
    });

    webm.save(function (err) {
        if (!err) {
            // log.info("Webm created");
            return res.send({ status: 'OK', webm:webm });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});
apiRoutes.get('/video/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
  return Webm.findById(req.params.id, function (err, webm) {
        if(!webm) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ webm:webm });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});
apiRoutes.put('/video/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
  return Webm.findById(req.params.id, function (err, webm) {
        if(!webm) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        webm.title = req.body.title;
        webm.description = req.body.description;
        webm.urlToVideo = req.body.urlToVideo;
        webm.uploader_id = req.body.uploader_id;

        return webm.save(function (err) {
            if (!err) {
                log.info("Webm updated");
                return res.send({ status: 'OK', webm:webm });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});
apiRoutes.delete('/video/:id', passport.authenticate('jwt', {session: false}), function (req, res) {

  var regex = /(https?:\/\/\S{1,15}\/files\/)(\S*\.\S*)/g;
  var match = regex.exec(req.params.urlToVideo);
  var path = '/Users/mory/Documents/Учеба/курсач/Video hosting/files/' + match[2];
  fs.unlink(path, next);

  return Webm.findById(req.params.id, function (err, webm) {
        if(!webm) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return webm.remove(function (err) {
            if (!err) {
                log.info("Webm removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

apiRoutes.post('/register', function (req, res) {
  if (!req.body.login || !req.body.password) {
    res.statusCode = 411;
    res.json({success: false, msg: 'Pass name and passwd'});
  } else {
    var newUser = new User({
      login: req.body.login,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      group: req.body.group,
      course: req.body.course,
      privelege: req.body.privelege
    });

    newUser.save(function (err) {
      if (err) {
        res.statusCode = 409;
        return res.send({success: false, msg: 'Login already exists'});
      }
      res.statusCode = 200;
      var token = jwt.encode(newUser, config.secret);
      res.json({success: true, token: "JWT " + token, msg: 'user created'});
    });
  }
});

apiRoutes.post('/auth', function (req, res) {
  User.findOne({
    login: req.body.login
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.statusCode = 404;
      res.send({success: false, msg: 'User not found'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          console.log(user);
          var token = jwt.encode(user, config.secret);
          res.json({success: true, token: "JWT " + token});
        } else {
          res.statusCode = 401;
          res.send({success: false, msg: 'Wrong password'});
        }
      });
    }
  });
});

apiRoutes.get('/search', passport.authenticate('jwt', {session: false}), function (req, res) {
  switch (req.query.type) {
    case 'user':
      User.find({
        $or: [
          {login: req.query.query},
          {fname: req.query.query},
          {lname: req.query.query}
        ]
      }, function (err, query) {
        if (err) throw err;

        if (!query) {
          res.send({success: false, msg: 'Not found'});
        } else {
          res.send({success: true, msg: query});
        }
      });
      break;
    case 'video':
      Webm.find({
        $or: [
          {title: req.query.query},
          {description: req.query.query},
          {uploader_id: req.query.query}
        ]
      }, function (err, query) {
        if (err) throw err;

        if(!query) {
          res.send({success: false, msg: 'Not found'});
        } else {
          res.send({success: true, query: query});
        }
      });
      break;
    default:
      res.send({success: false, msg: 'Error'});
  }
});

apiRoutes.get('/user/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    var user = {};
    User.findById(req.params.id, function (err, resUser) {
      if (!resUser) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if (!err) {
        user.info = resUser;
        user.info.password = "";
        Webm.find({uploader_id: req.params.id}, function(err, webm) {
            if (!webm) {
                return;
            }
            if (!err) {
                user.webms = webm;
                res.send({success: true, user: user});
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        });
      } else {
          res.statusCode = 500;
          log.error('Internal error(%d): %s', res.statusCode, err.message);
          return res.send({error: 'Server error'});
      }
    });
});

apiRoutes.put('/user/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function(err, user) {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        }
        res.send(user);
    });
});


app.use('/api', apiRoutes);
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.once('open', function() {
  console.log('Listening on port 3000...');
  app.listen(3000);
});
