'use strict';

describe('Controller: LoggedInCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var LoggedInCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoggedInCtrl = $controller('LoggedInCtrl', {
      $scope: scope
    });
  }));

});
