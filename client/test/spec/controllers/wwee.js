'use strict';

describe('Controller: WweeCtrl', function () {

  // load the controller's module
  beforeEach(module('312App'));

  var WweeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WweeCtrl = $controller('WweeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WweeCtrl.awesomeThings.length).toBe(3);
  });
});
