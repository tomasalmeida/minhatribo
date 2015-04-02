'use strict';

describe('Controller: ArticleShareCtrl', function () {

  // load the controller's module
  beforeEach(module('minhatriboApp'));

  var ArticleShareCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleShareCtrl = $controller('ArticleShareCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
