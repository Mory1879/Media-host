'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('VideoCtrl', function ($scope, apiWrap, $localStorage, $routeParams) {
    apiWrap.Video.get($routeParams.id, function (res) {
      console.log(res);
      $scope.video = res.webm;
      console.log($scope.video);
      if (res.webm._id !== $routeParams.id) {
        location.reload();
      }
    });
  });
