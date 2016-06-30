'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'ngSanitize',
    'restangular',
    'ngFileUpload'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/webms', {
        templateUrl: 'views/webms.html',
        controller: 'WebmsCtrl',
        controllerAs: 'webms'
      })
      .when('/webm/:id', {
        templateUrl: 'views/webm-view.html',
        controller: 'ViewWebmCtrl',
        controllerAs: 'webmView'
      })
      .when('/webm/:id', {
        templateUrl: 'views/view-webm.html',
        controller: 'ViewWebmCtrl',
        controllerAs: 'viewWebm'
      })
      .when('/webm/:id/delete', {
        templateUrl: 'views/webm-delete.html',
        controller: 'WebmDeleteCtrl',
        controllerAs: 'webmDelete'
      })
      .when('/webm/:id/edit', {
        templateUrl: 'views/webm-edit.html',
        controller: 'WebmEditCtrl',
        controllerAs: 'webmEdit'
      })
      .when('/create/webm', {
        templateUrl: 'views/webm-add.html',
        controller: 'WebmAddCtrl',
        controllerAs: 'webmAdd'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('WebmRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
  .factory('Webm', function(WebmRestangular) {
    return WebmRestangular.service('webm');
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
