'use strict';

angular.module('clientApp')
  .controller('UploadCtrl', ['$scope', 'Upload', '$timeout', 'Webm', '$location', function($scope, Upload, $timeout, Webm, $location) {

    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.file = {};
      $scope.file.title = $scope.f.name;
      $scope.file.urlToVideo = 'http://localhost:3000/files/'+$scope.f.name;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: 'http://localhost:3000/',
          method: 'POST',
          data: {
            file: file
          }
        });

        $scope.saveWebm = function() {
          Webm.post($scope.file).then(function () {
            $location.path('/webms');
          });
        };

        file.upload.then(function(response) {
          $timeout(function() {
            file.result = response.data;
          });
        }, function(response) {
          if (response.status > 0){
            $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function(evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    };
  }]);
