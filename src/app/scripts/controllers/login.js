'use strict';

/**
 * @ngdoc function
 * @name srcApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the srcApp
 */
angular.module('srcApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $location, $localStorage, Auth) {
    $scope.wrPass = false;
    function successAuth (res) {
      console.log("succes response: ",res);
      $localStorage.token = res.token;
      window.location = '/';
    }

    $scope.signin = function () {
      var formData = {
        login: $scope.auth.login,
        password: $scope.auth.pass
      };

      Auth.signin(formData, successAuth, function () {
        $rootScope.error = "Invalid Login/password";
        $scope.wrPass = true;
      });
    };

    $scope.signup = function () {
      var formData = {
        login: $scope.register.login,
        password: $scope.register.passwd,
        fname: $scope.register.fname,
        lname: $scope.register.lname
      };
      if($scope.register.course) {
        formData.course = $scope.register.course;
        formData.privelege = "teacher";
      } else if ($scope.register.group) {
        formData.group = $scope.register.group;
        formData.privelege = "student";
      }

      Auth.signup(formData, successAuth, function (err) {
        console.log("error response: ", err);
        $rootScope.error = "Failed to signup";
        $location.path('/');
        $location.replace();
      });
    };

    $scope.logout = function () {
      Auth.logout(function () {
        window.location = '/';
      });
    };
    $scope.token = $localStorage.token;
    $scope.tokenClaims = Auth.getTokenClaims();
    $rootScope.me = $scope.tokenClaims();
  });
