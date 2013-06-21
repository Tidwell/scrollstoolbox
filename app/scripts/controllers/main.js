'use strict';

angular.module('scrollstoolboxApp')
	.controller('MainCtrl', function($scope, cards) {
		$scope.cards = cards.get();

		$scope.$watch('cards.data',function() {
			console.log($scope.cards);
		})
});