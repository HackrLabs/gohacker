'use strict';

describe('Service: find', function () {

  // load the service's module
  beforeEach(module('gohackerApp'));

  // instantiate service
  var find;
  beforeEach(inject(function (_find_) {
    find = _find_;
  }));

  it('should do something', function () {
    expect(!!find).toBe(true);
  });

});
