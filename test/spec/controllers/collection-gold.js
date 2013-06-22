'use strict';

describe('Controller: CollectionGoldCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var CollectionGoldCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollectionGoldCtrl = $controller('CollectionGoldCtrl', {
      $scope: scope
    });
  }));
});
