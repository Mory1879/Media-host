'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('UserCtrl', function ($scope, $location, $routeParams, apiWrap, $rootScope, $http) {
    $scope.profile = {};
    $scope.myProfile = true;

    $http.post('http://localhost:3001/api/subscribtions', {_id: $rootScope.me._id}).success(function (res) {
      res.forEach(function (item) {
        console.log("subs", item._id);
        if (item._id == $routeParams.id) {
          $scope.subscribed = true;
          console.log('subscribed', $scope.subscribed);
        }
        if ($scope.subscribed !== true) {
          $scope.subscribed = false;
          console.log('subscribed', $scope.subscribed);
        }
      });
    });
    // $scope.subscribed = true;


    $scope.subscribe = function () {
      $http.put('http://localhost:3001/api/user/' + $routeParams.id + '/subscribtions?you=' + $rootScope.me._id).success(function (res) {
        console.log(res);
      });
      location.reload();
    };

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
