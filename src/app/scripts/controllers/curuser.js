'use strict';

angular.module('srcApp')
  .controller('CurUserCtrl', function($rootScope, $scope, $location, $localStorage, apiWrap) {
    console.log($rootScope.me._id);
    apiWrap.Me.get($rootScope.me._id, function (res) {
      console.log(res.user);
      $scope.profile = res.user.info;
      $scope.you = ($rootScope.me._id == res.user.info._id) ? true: false;
      console.log($scope.you);
      if (res.user.webms.length > 0) {
        $scope.profile.videos = res.user.webms;
      }
      console.log($scope.profile.videos);
    });

    $scope.saveUser = function() {
      // $http.post(urls.BASE_API + '/user/' + $rootScope.me._id, data).success(success).error(error);
      apiWrap.Users.update($scope.profile, function() {
        $scope.error = 'Profile updated';
      }, function() {
        $scope.error = 'Error';
      });
    };
  });
