'use strict';

angular.module('minhatriboApp')
  .controller('ArticleShareCtrl', function ($scope, $http) {
  
    $scope.shareArticle = function () {
      if ($scope.articleURL === '') {
        return;
      }
      $http.post('/api/articles', { url: $scope.articleURL })
      .success(function (data, status) {
        alert('TODO: ok');
      })
      .error(function (data, status) {
        alert('TODO: ko');
      });
    };
  
  });
