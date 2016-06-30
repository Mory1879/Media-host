'use strict';

describe('Controller: WebmPlayCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmPlayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmPlayCtrl = $controller('WebmPlayCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmPlayCtrl.awesomeThings.length).toBe(3);
  });
});
