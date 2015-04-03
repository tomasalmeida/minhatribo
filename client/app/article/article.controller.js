'use strict';

angular.module('minhatriboApp')
  .controller('ArticleCtrl', function ($scope,Article) {
    
    var articles = Article.query(function() {
      $scope.articlesTable = [];
      var articlesLine = [];
      for (var index = 0; index < articles.length; index++) {
        if (index % 3 == 0 && index > 0) {
          $scope.articlesTable.push(articlesLine);
          articlesLine = [];
        }
        articlesLine.push( articles[index]);      
      }
      $scope.articlesTable.push(articlesLine);
    });
    
  });

  
