'use strict';

describe('Controller: VideoeditCtrl', function () {

  // load the controller's module
  beforeEach(module('srcApp'));

  var VideoeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoeditCtrl = $controller('VideoeditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VideoeditCtrl.awesomeThings.length).toBe(3);
  });
});
