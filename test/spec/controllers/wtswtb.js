'use strict';

describe('Controller: WtswtbCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var WtswtbCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WtswtbCtrl = $controller('WtswtbCtrl', {
      $scope: scope
    });
  }));

});
