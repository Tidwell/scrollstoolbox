'use strict';

angular.module('scrollstoolboxApp')
  .controller('CollectionCtrl', function ($scope, cards) {
	$scope.data = cards.get();

	$scope.generateImagePath = function(name) {
		if (name) {
			return '/img/scrolls-cards/'+name.toLowerCase().replace(/ /g,'').replace(/'/g,'')+'.png';
		}
	}

	$scope.tabIndex = function(index,multiplier) {
		return ($scope.countCards()*multiplier)+index;
	}

	$scope.countCards = function() {
		if ($scope.numCards) { return $scope.numCards; }

		var numCards = 0;
		for (var card in $scope.data.data) {
			numCards++;
		}
		return $scope.numCards = numCards;
	}
	$scope.total = function(faction) {
		var total = 0;
		var numCards = 0;
		for (var card in $scope.data.data) {
			if ($scope.data.data[card].resource.toLowerCase() === faction || faction === 'all') {
				total += $scope.data.data[card].owned || 0;
			} else if (faction === 'missing' && $scope.data.data[card].owned < 3) {
				total += 3-$scope.data.data[card].owned || 0;
			} else if (faction === 'duplicate' && $scope.data.data[card].owned > 3) {
				total += $scope.data.data[card].owned-3;
			}
			numCards++;
		}
		return total;
	}

	$scope.tableView = 'all';

	$scope.showOrder = true;
	$scope.showEnergy = true;
	$scope.showGrowth = true;

	//we cant do this as a proper filter since we are using a hashmap instead of an array
	$scope.inFiltered = function(name) {
		if (!$scope.search || !name) { return true; }
		if (name.toLowerCase().indexOf($scope.search.toLowerCase()) === -1) {
			return false;
		}
		return true;
	};
});