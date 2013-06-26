'use strict';

describe('Controller: EnableSyncCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var EnableSyncCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnableSyncCtrl = $controller('EnableSyncCtrl', {
      $scope: scope
    });
  }));
});
