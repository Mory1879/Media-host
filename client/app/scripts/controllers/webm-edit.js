'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:WebmEditCtrl
 * @description
 * # WebmEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('WebmEditCtrl', function(
    $scope,
    $routeParams,
    Webm,
    $location
  ) {
    $scope.editWebm = true;
    $scope.webm = {};
    Webm.one($routeParams.id).get().then(function(webm) {
      $scope.webm = webm;
      $scope.saveWebm = function() {
        $scope.webm.save().then(function() {
          $location.path('/webm/' + $routeParams.id);
        });
      };
    });
  });
