'use strict';

describe('Controller: ViewWebmCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ViewWebmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewWebmCtrl = $controller('ViewWebmCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewWebmCtrl.awesomeThings.length).toBe(3);
  });
});
