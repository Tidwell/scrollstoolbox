'use strict';

describe('Controller: FlashMsgCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var FlashMsgCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlashMsgCtrl = $controller('FlashMsgCtrl', {
      $scope: scope
    });
  }));

});
