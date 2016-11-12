'use strict';

/**
 * @ngdoc overview
 * @name srcApp
 * @description
 * # srcApp
 *
 * Main module of the application.
 */
angular
  .module('srcApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngFileUpload',
    // 'srcApp.apiWrap',
    'srcApp.auth'
  ])
  .constant('urls', {
    // BASE: 'http://localhost:9000',
    BASE_API: 'http://localhost:3001/api',
    SUPER_BASE: '127.0.0.1:300'
  })
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'

      })
      .when('/me', {
        templateUrl: 'views/me.html',
        controller: 'CurUserCtrl',
        controllerAs: 'cuc'
      })
      .when('/user/:id', {
        templateUrl: 'views/me.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/video/:id', {
        templateUrl: 'views/video.html',
        controller: 'VideoCtrl',
        controllerAs: 'video'
      })
      .when('/video/:id/edit', {
        templateUrl: 'views/video-edit.html',
        controller: 'VideoEditCtrl',
        controllerAs: 'videoEdit'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push(function ($q, $location, $localStorage) {
      return {
        'request': function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.Authorization = $localStorage.token;
          }
          return config;
        },
        'responseError': function (response) {
          if (response.status === 401 || response.status === 403 || response.status === 405) {
            $location.path("/login");
          }
          return $q.reject(response);
        }
      };
    });
  })
  .directive('player',function () {
    return {
      restrict: 'E',
      scope: {
        src: '='
      },
      templateUrl: 'views/player.html'
    };
  })
  .filter('trusted', function ($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
