'use strict';

angular.module('minhatriboApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin/user', {
        url: '/admin/user',
        templateUrl: 'app/admin/user/user.html',
        controller: 'UserCtrl',
        verifyAdmin: true
      })
      .state('admin/category', {
        url: '/admin/category',
        templateUrl: 'app/admin/category/category.html',
        controller: 'CategoryCtrl',
        verifyAdmin: true
      });
  });