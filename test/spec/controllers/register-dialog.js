'use strict';

describe('Controller: RegisterDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var RegisterDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterDialogCtrl = $controller('RegisterDialogCtrl', {
      $scope: scope
    });
  }));

});
