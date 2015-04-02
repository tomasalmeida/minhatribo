'use strict';

angular.module('minhatriboApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article/share', {
        url: '/article/share',
        templateUrl: 'app/article/share/share.html',
        controller: 'ArticleShareCtrl',
        authenticate: true
      });
  });