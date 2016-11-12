'use strict';

angular.module('srcApp')
  .controller('CurUserCtrl', function($rootScope, $scope, $location, $localStorage, apiWrap, $http) {
    $scope.editProfile = false;
    $scope.subs = false;
    $scope.myProfile = true;

    $scope.subscribe = function () {
      $scope.subs = true;
      $scope.myProfile = false;
      $scope.editProfile = false;
      $http.post('http://localhost:3001/api/subscribtions', {_id: $rootScope.me._id}).success(function (res) {
        $scope.subscribtions = res;
        console.log($scope.subscribtions);
      });
    };

    $scope.unsub = function (user) {
      console.log('User to delete: ', user);
      var formData = {
        delUser: user,
        curUser: $rootScope.me._id
      };
      console.log(formData);
      $http.delete('http://localhost:3001/api/subscribtions?delUser='+ user + '&curUser=' + $rootScope.me._id).success(function (res) {
        $scope.subscribtions = res;
        console.log($scope.subscribtions);
      });
      $location.path('/me');
      $scope.subscribe();
    };

    $scope.me = function () {
      $scope.subs = false;
      $scope.editProfile = false;
      $scope.myProfile = true;
    };

    $scope.edit = function () {
      $scope.subs = false;
      $scope.editProfile = true;
      $scope.myProfile = false;
      console.log($scope.editProfile);
    };

    console.log($rootScope.me._id);
    apiWrap.Me.get($rootScope.me._id, function (res) {
      console.log(res.user);
      $scope.profile = res.user.info;
      $scope.you = ($rootScope.me._id === res.user.info._id) ? true: false;
      console.log($scope.you);
      if (res.user.webms.length > 0) {
        $scope.profile.videos = res.user.webms;
      }
      console.log($scope.profile.videos);
    });

    $scope.saveUser = function() {
      console.log($scope.profile);
      // $http.post(urls.BASE_API + '/user/' + $rootScope.me._id, data).success(success).error(error);
      apiWrap.Me.update($scope.profile, function() {
        $scope.error = 'Profile updated';
        $location.path('/me');
      }, function() {
        $scope.error = 'Error';
      });
    };
  });
