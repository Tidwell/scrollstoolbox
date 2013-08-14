'use strict';

angular.module('scrollstoolboxApp')
	.controller('CollectionGoldCtrl', function($scope,cards) {
	$scope.data = cards.get();

	$scope.playsetGold = function() {
		var lowTotal = 0;
		var highTotal = 0;
		for (var card in $scope.data.data) {
			if ($scope.data.data[card].owned < 3) {
				lowTotal += $scope.data.data[card].price.low * (3 - $scope.data.data[card].owned);
				highTotal += $scope.data.data[card].price.high * (3 - $scope.data.data[card].owned);
			}
		}
		return {
			low: lowTotal,
			high: highTotal
		};
	};

	$scope.sellGold = function() {
		var lowTotal = 0;
		var highTotal = 0;
		for (var card in $scope.data.data) {
			var adjustedOwned = $scope.data.data[card].tier1 + $scope.data.data[card].tier2*3 + $scope.data.data[card].tier3*9;
			if ($scope.data.data[card].owned > 3) {
				lowTotal += $scope.data.data[card].price.low * (adjustedOwned - 3);
				highTotal += $scope.data.data[card].price.high * (adjustedOwned - 3);
			}
		}
		return {
			low: lowTotal,
			high: highTotal
		};
	};

	$scope.binderGold = function() {
		var lowTotal = 0;
		var highTotal = 0;
		for (var card in $scope.data.data) {
			var adjustedOwned = $scope.data.data[card].tier1 + $scope.data.data[card].tier2*3 + $scope.data.data[card].tier3*9;
			lowTotal += $scope.data.data[card].price.low * (adjustedOwned);
			highTotal += $scope.data.data[card].price.high * (adjustedOwned);
		}
		return {
			low: lowTotal,
			high: highTotal
		};
	};
});