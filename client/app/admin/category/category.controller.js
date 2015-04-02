'use strict';

angular.module('minhatriboApp')
  .controller('CategoryCtrl', function ($scope, $http) {

    $http.get('/api/categories')
    .success(function (data, status) {
      console.log(data);
      $scope.categories = data;
      
    })
    .error(function (data, status) {
      alert('TODO: ko');
    });    

    $scope.addCategory = function() {
      if ($scope.newCategory === '') {
        return;
      }
      $http.post('/api/categories', { 
        name: $scope.newCategory,
        description: $scope.newDescription
      })
      .success(function (data, status) {
        console.log(data);
        $scope.categories.push(data);
      })
      .error(function (data, status) {
        alert('TODO: ko');
      });
    };
  
    $scope.deleteCategory = function (id) {
      alert("TODO");
    };
  });
