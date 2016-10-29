'use strict';

/**
 * @ngdoc service
 * @name srcApp.apiWrap
 * @description
 * # apiWrap
 * Service in the srcApp.
 */
angular.module('srcApp')
  .service('apiWrap', function ($resource, urls) {
    const Users = $resource(`${urls.BASE_API}/user/:id`, {id: "me"}, {update: {method: "PUT"}});
    const Search = $resource(`${urls.BASE_API}/search`);
    const Upload = $resource();

    return {
      Users,
      Search,
      Upload
    };
  });
