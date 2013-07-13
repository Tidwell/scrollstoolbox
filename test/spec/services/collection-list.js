'use strict';

describe('Service: collectionList', function () {

  // load the service's module
  beforeEach(module('scrollstoolboxApp'));

  // instantiate service
  var collectionList;
  beforeEach(inject(function (_collectionList_) {
    collectionList = _collectionList_;
  }));

  it('should do something', function () {
    expect(!!collectionList).toBe(true);
  });

});
