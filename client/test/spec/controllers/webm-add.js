'use strict';

describe('Controller: WebmAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmAddCtrl = $controller('WebmAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmAddCtrl.awesomeThings.length).toBe(3);
  });
});
