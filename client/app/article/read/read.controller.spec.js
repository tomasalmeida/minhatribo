'use strict';

describe('Controller: ArticleReadCtrl', function () {

  // load the controller's module
  beforeEach(module('minhatriboApp'));

  var ArticleReadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleReadCtrl = $controller('ArticleReadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
