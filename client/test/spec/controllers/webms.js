'use strict';

describe('Controller: WebmsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmsCtrl = $controller('WebmsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmsCtrl.awesomeThings.length).toBe(3);
  });
});
