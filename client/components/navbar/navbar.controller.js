'use strict';

angular.module('minhatriboApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.canAccess = Auth.canAccess;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return $location.path().substr(0,route.length) === route;
    };
  
    $scope.isActiveFullPath = function(route) {
      return $location.path() === route;
    };
  });