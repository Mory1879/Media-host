'use strict';

describe('Controller: WebmUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var WebmUploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebmUploadCtrl = $controller('WebmUploadCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebmUploadCtrl.awesomeThings.length).toBe(3);
  });
});
