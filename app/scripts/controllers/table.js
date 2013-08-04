'use strict';

angular.module('scrollstoolboxApp')
  .controller('TableCtrl', function ($scope, cards) {
	$scope.data = cards.get();
	$scope.sortedData = [];


	$scope.tableView = 'all';

	$scope.showOrder = true;
	$scope.showEnergy = true;
	$scope.showGrowth = true;

	$scope.columnTradeableHide = false;
	$scope.columnTiersHide = false;
	$scope.columnUntradeableHide = true;

	$scope.sorting = {
		option: 'name',
		order: 'asc'
	};


	$scope.generateImagePath = function(name) {
		if (name) {
			return '/img/scrolls-cards/'+name.toLowerCase().replace(/ /g,'').replace(/'/g,'')+'.png';
		}
	};

	$scope.save = function(cardName) {
		cards.save($scope.data.data[cardName]);
	};

	$scope.tabIndex = function(index,multiplier) {
		return ($scope.countCards()*multiplier)+index;
	};

	$scope.countCards = function() {
		if ($scope.numCards) { return $scope.numCards; }

		var numCards = 0;
		var card;
		for (card in $scope.data.data) {
			numCards++;
		}
		$scope.numCards = numCards;

		return $scope.numCards;
	};

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
	};

	$scope.setSort = function(sortOption, sortOrder) {
		$scope.sorting.option = sortOption;
		$scope.sorting.order = sortOrder;
		tableSort();
	};

	$scope.isActiveSort = function(sortOption, sortOrder) {
		if ($scope.sorting.option === sortOption && $scope.sorting.order === sortOrder) {
			return true;
		}

		return false;
	};

	function tableSort() {
		var arrayData = [];
		for (var cardName in $scope.data.data) {
			console.log($scope.data.data[cardName]);
			if ($scope.data.data.hasOwnProperty(cardName) && typeof $scope.data.data[cardName] !== 'undefined') {
				console.log(cardName);
				$scope.data.data[cardName].name = $scope.data.data[cardName].card.name;
				arrayData.push($scope.data.data[cardName]);
			}
			console.log('done');
		}
		arrayData.sort(function(a,b) {
			//price
			if ($scope.sorting.option === 'price') {
				if ($scope.sorting.order === 'asc') {
					return a.price.median - b.price.median;
				} else {
					return b.price.median - a.price.median;
				}
			}

			//rarity
			var rMap = {
				Common: 1,
				Uncommon: 2,
				Rare: 3
			};
			if ($scope.sorting.option === 'rarity') {
				if ($scope.sorting.order === 'asc') {
					return rMap[a.card.rarity] - rMap[b.card.rarity];
				} else {
					return rMap[b.card.rarity] - rMap[a.card.rarity];
				}
			}

			if ($scope.sorting.option === 'owned') {
				if ($scope.sorting.order === 'asc') {
					return a.owned - b.owned;
				} else {
					return b.owned - a.owned;
				}
			}

			//tradeable
			if ($scope.sorting.option === 'tradeable') {
				if ($scope.sorting.order === 'asc') {
					return a.tradeable - b.tradeable;
				} else {
					return b.tradeable - a.tradeable;
				}
			}

			//untradeable
			if ($scope.sorting.option === 'untradeable') {
				if ($scope.sorting.order === 'asc') {
					return (a.owned-a.tradeable) - (b.owned-b.tradeable);
				} else {
					return (b.owned-b.tradeable) - (a.owned-a.tradeable);
				}
			}

			if ($scope.sorting.option.indexOf('tier') !== -1) {
				if ($scope.sorting.order === 'asc') {
					return a[$scope.sorting.option] - b[$scope.sorting.option];
				} else {
					return b[$scope.sorting.option] - a[$scope.sorting.option];
				}
			}

			//stuff thats ABC
			if (a.card[$scope.sorting.option] === b.card[$scope.sorting.option]) { return 0; }
			if ($scope.sorting.order === 'asc') {
				return a.card[$scope.sorting.option] > b.card[$scope.sorting.option] ? 1 : -1;
			} else {
				return a.card[$scope.sorting.option] < b.card[$scope.sorting.option] ? 1 : -1;
			}
		});
		$scope.sortedData = arrayData;
	}

	$scope.$watch('data.data',tableSort);


	//we cant do this as a proper filter since we are using a hashmap instead of an array
	$scope.inFiltered = function(name) {
		if (!$scope.search || !name) { return true; }
		if (name.toLowerCase().indexOf($scope.search.toLowerCase()) === -1) {
			return false;
		}
		return true;
	};
});