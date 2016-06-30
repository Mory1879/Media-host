'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:WebmAddCtrl
 * @description
 * # WebmAddCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('WebmAddCtrl', function (
   $scope,
   Webm,
   $location
 ) {
   $scope.webm = {};
   $scope.saveWebm = function() {
     Webm.post($scope.webm).then(function() {
       $location.path('/webms');
     });
   };
 });
