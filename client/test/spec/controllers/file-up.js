'use strict';

describe('Controller: FileUpCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var FileUpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileUpCtrl = $controller('FileUpCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FileUpCtrl.awesomeThings.length).toBe(3);
  });
});
