'use strict';

angular.module('minhatriboApp')
  .controller('CategoryCtrl', function ($scope, Category) {

    $scope.categories = Category.query();
    
    $scope.addCategory = function() {
      if ($scope.newCategory === '') {
        return;
      }
      var cat = Category.save({ 
        name: $scope.newCategory,
        description: $scope.newDescription
      });
      $scope.categories.push(cat);
      $scope.newCategory = '';
      $scope.newDescription = '';
    };
  
    $scope.deleteCategory = function (id) {
      //TODO
      console.log('TODO: '+ id);
    };
  });
