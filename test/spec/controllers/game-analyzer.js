'use strict';

describe('Controller: GameAnalyzerCtrl', function () {

  // load the controller's module
  beforeEach(module('scrollstoolboxApp'));

  var GameAnalyzerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameAnalyzerCtrl = $controller('GameAnalyzerCtrl', {
      $scope: scope
    });
  }));

});
