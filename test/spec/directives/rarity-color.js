'use strict';

describe('Directive: rarityColor', function () {
  beforeEach(module('scrollstoolboxApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rarity-color></rarity-color>');
    element = $compile(element)($rootScope);
    //expect(element.text()).toBe('this is the rarityColor directive');
  }));
});
