'use strict';

angular.module('minhatriboApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return $location.path().substr(0,route.length) === route;
    };
  });