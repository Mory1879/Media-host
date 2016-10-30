'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('SearchCtrl', function (apiWrap, $scope) {
    $scope.search = {};
    $scope.search.query = "";
    $scope.searchUser = function () {
      $scope.search.type = 'user';
      console.log($scope.search);
    };

    $scope.searchVideo = function () {
      $scope.search.type = 'video';
      console.log($scope.search);
    };

    $scope.find = function () {
      apiWrap.Search.get({type: $scope.search.type, query: $scope.search.query}, res => {
        $scope.items = res;
        console.log($scope.items);
      });
    };
  });
