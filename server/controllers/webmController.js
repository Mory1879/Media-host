var Resource = require('resourcejs');
var fs = require('fs');

module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.webm).rest({
    afterDelete: function (req, res, next) {
      var regex = /(https?:\/\/\S{1,15}\/files\/)(\S*\.\S*)/g;
      var match = regex.exec(res.resource.item.urlToVideo);
      console.log(match[2]);
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
