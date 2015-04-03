'use strict';

angular.module('minhatriboApp')
  .controller('ArticleReadCtrl', function ($scope, $stateParams, Article) {
    
    $scope.article = Article.get({id: $stateParams.id});  
  
  });

  
