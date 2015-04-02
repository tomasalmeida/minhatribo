'use strict';

angular.module('minhatriboApp')
  .factory('Article', function ($resource) {
    return $resource('/api/articles/:id', {id: '@_id'});
  });
  