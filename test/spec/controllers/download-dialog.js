'use strict';

describe('Controller: DownloadDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var DownloadDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DownloadDialogCtrl = $controller('DownloadDialogCtrl', {
      $scope: scope
    });
  }));
});
