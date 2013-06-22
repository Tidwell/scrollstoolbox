'use strict';

describe('Controller: TableCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var TableControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TableControllerCtrl = $controller('TableCtrl', {
      $scope: scope
    });
  }));

});
