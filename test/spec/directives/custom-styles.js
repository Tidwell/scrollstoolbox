'use strict';

describe('Directive: customStyles', function () {
  beforeEach(module('scrollstoolboxApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<custom-styles></custom-styles>');
    element = $compile(element)($rootScope);
  }));
});
