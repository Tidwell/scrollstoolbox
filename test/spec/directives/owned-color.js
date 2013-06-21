'use strict';

describe('Directive: ownedColor', function () {
  beforeEach(module('scrollstoolboxApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<owned-color></owned-color>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ownedColor directive');
  }));
});
