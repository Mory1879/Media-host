'use strict';

describe('Service: apiWrap', function () {

  // load the service's module
  beforeEach(module('srcApp'));

  // instantiate service
  var apiWrap;
  beforeEach(inject(function (_apiWrap_) {
    apiWrap = _apiWrap_;
  }));

  it('should do something', function () {
    expect(!!apiWrap).toBe(true);
  });

});
