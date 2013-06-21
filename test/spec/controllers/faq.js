'use strict';

describe('Controller: FaqCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var FaqCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaqCtrl = $controller('FaqCtrl', {
      $scope: scope
    });
  }));
});
