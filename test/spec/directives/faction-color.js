'use strict';

describe('Directive: factionColor', function () {
  beforeEach(module('scrollstoolboxApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<faction-color></faction-color>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the factionColor directive');
  }));
});
