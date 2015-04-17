'use strict';

angular.module('minhatriboApp')
  .controller('ArticleShareCtrl', function ($scope,$window, Category, Article) {
  
    $scope.categories = Category.query();
    
    $scope.shareArticle = function () {
      if ($scope.url === '') {
        return;
      }
      $scope.article = Article.save({
        url: $scope.url,
        category: { 
          id: $scope.selectedCategory._id,
          name: $scope.selectedCategory.name
        },
        description: $scope.description
      }, function(article){
        $window.location.href = "/article/" + article._id;
      });
    };
  
  });
