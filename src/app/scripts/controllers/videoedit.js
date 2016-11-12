'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:VideoeditCtrl
 * @description
 * # VideoeditCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('VideoEditCtrl', function ($scope, $location, $routeParams, apiWrap) {
    apiWrap.Video.get($routeParams.id, function (video) {
      $scope.video = video.webm;
      console.log($scope.video);
    });

    $scope.saveWebm = function () {
      apiWrap.Video.update($scope.video, function () {
        console.log("success");
        $location.path('/video/' + $scope.video._id);
      }, function () {
        console.log("error");
      });
    };
  });
