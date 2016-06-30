'use strict';

describe('Controller: WebmViewCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmViewCtrl = $controller('WebmViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmViewCtrl.awesomeThings.length).toBe(3);
  });
});
