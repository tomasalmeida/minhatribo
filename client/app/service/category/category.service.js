'use strict';

angular.module('minhatriboApp')
  .factory('Category', function ($resource) {
    return $resource('/api/categories/:id', {id: '@_id'});
  });
