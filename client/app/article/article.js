'use strict';

angular.module('minhatriboApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article', {
        url: '/article',
        templateUrl: 'app/article/list/list.html',
        controller: 'ArticleListCtrl',
        authenticate: true
      })
      .state('article/share', {
        url: '/article/share',
        templateUrl: 'app/article/share/share.html',
        controller: 'ArticleShareCtrl',
        authenticate: true
      })
      .state('article/id', {
        url: '/article/:id',
        templateUrl: 'app/article/read/read.html',
        controller: 'ArticleReadCtrl',
        authenticate: true
      })
  });