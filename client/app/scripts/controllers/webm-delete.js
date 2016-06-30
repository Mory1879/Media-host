'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:WebmDeleteCtrl
 * @description
 * # WebmDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('WebmDeleteCtrl', function ($scope, $routeParams, Webm, $location) {
    $scope.webm = Webm.one($routeParams.id).get().$object;
    $scope.deleteWebm = function () {
      $scope.webm.remove().then(function () {
        $location.path('/webms');
      });
    };
    $scope.back = function () {
      $location.path('/webms/'+$routeParams.id);
    };
  });
