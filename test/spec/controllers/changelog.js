'use strict';

describe('Controller: ChangelogCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var ChangelogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangelogCtrl = $controller('ChangelogCtrl', {
      $scope: scope
    });
  }));

});
