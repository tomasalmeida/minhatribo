'use strict';

angular.module('minhatriboApp')
  .factory('User', function ($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  },
  {
    update: {
      method: 'PUT'
    },
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
});
