'use strict';

describe('Controller: CollectionListCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var CollectionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollectionListCtrl = $controller('CollectionListCtrl', {
      $scope: scope
    });
  }));

});
