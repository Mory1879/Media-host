'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewWebmCtrl
 * @description
 * # ViewWebmCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ViewWebmCtrl', function($scope, $routeParams, Webm) {
    $scope.viewWebm = true;
    $scope.webm = Webm.one($routeParams.id).get().$object;
  });
