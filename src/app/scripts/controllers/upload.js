'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('UploadCtrl', function ($scope, Upload, $timeout, apiWrap, $location, $rootScope) {

    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.file = {};
      $scope.file.title = $scope.name;
      $scope.file.description = $scope.desc;
      $scope.file.urlToVideo = 'http://localhost:3000/files/' + $scope.f.name;
      $scope.file.uploader_id = $rootScope.me._id;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: 'http://localhost:3000/api/uploadvideo',
          method: 'POST',
          data: {
            file: file
          }
        });

        $scope.saveWebm = function() {
          apiWrap.AddVideo.upload($scope.file, function (res) {
            console.log(res);
            $location.path('/me');
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

  });
