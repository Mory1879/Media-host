'use strict';

describe('Controller: WebmEditCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmEditCtrl = $controller('WebmEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmEditCtrl.awesomeThings.length).toBe(3);
  });
});
