'use strict';

angular.module('scrollstoolboxApp')
  .controller('GametextCtrl', function ($scope, cards) {

    $scope.cardsService = cards.get();

  });
