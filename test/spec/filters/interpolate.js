'use strict';

describe('Filter: interpolate', function () {

  // load the filter's module
  beforeEach(module('scrollstoolboxApp'));

  // initialize a new instance of the filter before each test
  var interpolate;
  beforeEach(inject(function ($filter) {
    interpolate = $filter('interpolate');
  }));

  it('should return the input prefixed with "interpolate filter:"', function () {
    var text = 'angularjs';
    expect(interpolate(text)).toBe('interpolate filter: ' + text);
  });

});
