'use strict';

describe('Service: Spacesearch', function () {

  // load the service's module
  beforeEach(module('gohackerApp'));

  // instantiate service
  var Spacesearch;
  beforeEach(inject(function (_Spacesearch_) {
    Spacesearch = _Spacesearch_;
  }));

  it('should do something', function () {
    expect(!!Spacesearch).toBe(true);
  });

});
