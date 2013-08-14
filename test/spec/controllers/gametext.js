'use strict';

describe('Controller: GametextCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var GametextCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GametextCtrl = $controller('GametextCtrl', {
      $scope: scope
    });
  }));

});
