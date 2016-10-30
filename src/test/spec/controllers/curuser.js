'use strict';

describe('Controller: CuruserctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('srcApp'));

  var CuruserctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CuruserctrlCtrl = $controller('CuruserctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CuruserctrlCtrl.awesomeThings.length).toBe(3);
  });
});
