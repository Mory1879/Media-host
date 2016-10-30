'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('UserCtrl', function ($scope, $location, $routeParams, apiWrap, $rootScope) {
    $scope.profile = {};
    apiWrap.Users.get($routeParams.id, function (res) {
      $scope.profile = res.user.info;
      if (res.user.webms.length > 0) {
        $scope.profile.videos = res.user.webms;
      }
      if (res.user.info._id != $routeParams.id) {
        location.reload();
      }
    });
    $scope.you = ($rootScope.me._id === $routeParams.id) ? true: false;
  });
