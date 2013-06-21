'use strict';

describe('Directive: imagePopup', function () {
  beforeEach(module('scrollstoolboxApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<image-popup></image-popup>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the imagePopup directive');
  }));
});
