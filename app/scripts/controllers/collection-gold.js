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
			if ($scope.data.data[card].owned > 3) {
				lowTotal += $scope.data.data[card].price.low * ($scope.data.data[card].owned - 3);
				highTotal += $scope.data.data[card].price.high * ($scope.data.data[card].owned - 3);
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
			lowTotal += $scope.data.data[card].price.low * ($scope.data.data[card].owned);
			highTotal += $scope.data.data[card].price.high * ($scope.data.data[card].owned);
		}
		return {
			low: lowTotal,
			high: highTotal
		};
	}
});