'use strict';

describe('Controller: SetInGameNameDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var SetInGameNameDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetInGameNameDialogCtrl = $controller('SetInGameNameDialogCtrl', {
      $scope: scope
    });
  }));
});
