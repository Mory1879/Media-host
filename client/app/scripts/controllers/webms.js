'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:WebmsCtrl
 * @description
 * # WebmsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('WebmsCtrl', function ($scope, Webm) {
    $scope.webms = Webm.getList().$object;
  });
