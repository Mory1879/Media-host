'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('VideoCtrl', function ($scope, apiWrap, $localStorage, $routeParams, $http, $location) {
    $scope.video = {};
    // $scope.video.id = $route.current.params.id;
    console.log($scope.video.id);
    $http.get('http://localhost:3001/api/video/' + $routeParams.id).success(function (res) {
      $scope.video = res.webm;
      console.log($scope.video);
      $http.get('http://localhost:3001/api/user/' + $scope.video.uploader_id).success(function (res) {
        $scope.uploader = res.user.info;
        console.log($scope.uploader);
      });
    });

    $scope.delete = function () {
      $http.delete('http://localhost:3001/api/video/' + $routeParams.id + '?urlToVideo=' + $scope.video.urlToVideo)
        .then(function (res) {
          console.log("succ: ", res);
          $location.path("/me");
        }, function (err) {
          console.log("error: ", err);
        });
    };
  });
