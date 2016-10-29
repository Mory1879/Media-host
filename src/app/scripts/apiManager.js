'use strict';

angular.module('srcApp.auth', [])
  .factory('Auth', function ($http, $localStorage, urls) {
    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    function getClaimsFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
    }

    var tokenClaims = getClaimsFromToken;

    return {
      signin: function (data, success, error) {
        $http.post(urls.BASE_API + '/auth', data).success(success).error(error);
      },
      logout: function (success) {
        tokenClaims = {};
        delete $localStorage.token;
        success();
      },
      signup: function (data, success, error) {
        $http.post(urls.SUPER_BASE + '/register', data).success(success).error(error);
      },
      getTokenClaims: (function () {
        return tokenClaims;
      })
    };
  });
