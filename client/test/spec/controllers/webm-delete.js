'use strict';

describe('Controller: WebmDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmDeleteCtrl = $controller('WebmDeleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmDeleteCtrl.awesomeThings.length).toBe(3);
  });
});
