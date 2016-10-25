var Resource = require('resourcejs');
var fs = require('fs');
var jwt = require('jwt-simple');
var User = require('../models/user.js');
var passport = require('passport');
require('../config/passport')(passport);


function getToken (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length == 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// function (req, res) {
//   passport.authenticate('jwt', {session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     var decoded = jwt.decode(token, config.secret);
//     User.findOne({
//       login: decoded.login
//     }, function (err, user) {
//       if (err) return false;
//
//       if (!user) {
//         // return false;
//         return res.status(403).send({success: false, msg: 'User not found'});
//       } else {
//         return true;
//       }
//     });
//   } else {
//     // return false;
//     return res.status(403).send({success: false, msg: 'No token provided'});
//   }
// }
// }


module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.webm).rest({
    before: passport.authenticate('jwt', {session: false}),
    afterDelete: function (req, res, next) {
      var regex = /(https?:\/\/\S{1,15}\/files\/)(\S*\.\S*)/g;
      var match = regex.exec(res.resource.item.urlToVideo);
      var path = '/Users/mory/Documents/Учеба/курсач/Video hosting/files/' + match[2];
      fs.unlink(path, next);
      next();
    }
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
