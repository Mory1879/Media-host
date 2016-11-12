'use strict';

/**
 * @ngdoc service
 * @name srcApp.apiWrap
 * @description
 * # apiWrap
 * Service in the srcApp.
 */
angular.module('srcApp')
  .service('apiWrap', function ($resource, urls, $rootScope, $routeParams) {
    const Me = $resource(`${urls.BASE_API}/user/:id`, {id: $rootScope.me._id}, {update: {method: "PUT"}});
    const Users = $resource(`${urls.BASE_API}/user/:id`, {id: $routeParams.id});
    const Search = $resource(`${urls.BASE_API}/search`);
    const AddVideo = $resource(`${urls.BASE_API}/video`, {} , {upload: {method: "POST"}});
    const Video = $resource(`${urls.BASE_API}/video/:id`, {id: $routeParams.id}, {update: {method: "PUT"}});
    const Subs = $resource(`${urls.BASE_API}/subscribtions`);

    return {
      Me,
      Users,
      Search,
      AddVideo,
      Video,
      Subs
    };
  });
