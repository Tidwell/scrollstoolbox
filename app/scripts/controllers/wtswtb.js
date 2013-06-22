'use strict';

angular.module('scrollstoolboxApp')
  .controller('WtswtbCtrl', function ($scope, cards, socket) {
	$scope.data = cards.get();

	$scope.buyPrependText = 'WTB >>> ';
	$scope.sellPrependText = 'WTS >>> ';

	$scope.separator = ' // ';

	$scope.tableView = 'all';

	$scope.buyAt = 'low';
	$scope.sellAt = 'high';

	$scope.buyModifier = '+0';
	$scope.sellModifier = '+0';

	$scope.buyCommon = true;
	$scope.buyUncommon = true;
	$scope.buyRare = true;

	$scope.sellCommon = true;
	$scope.sellUncommon = true;
	$scope.sellRare = true;

	$scope.showOrder = true;
	$scope.showEnergy = true;
	$scope.showGrowth = true;

	$scope.wtb = '';
	$scope.wts = '';

	function updateText() {
		$scope.wtb = $scope.buyPrependText;
		$scope.wts = $scope.sellPrependText;
		for (var cardName in $scope.data.data) {
			if ($scope.data.data.hasOwnProperty(cardName) && cardName) {
				var card = $scope.data.data[cardName];

				//determine buy and sell price for each card
				var buyPrice;
				var sellPrice;
				if (card.price.buyOverride) {
					buyPrice = card.price.buyOverride;
				} else {
					buyPrice = Number(card.price[$scope.buyAt]);
					//only apply modifier if auto-generated
					buyPrice += Number($scope.buyModifier);
				}

				if (card.price.sellOverride) {
					sellPrice = Number(card.price.sellOverride);
				} else {
					sellPrice = Number(card.price[$scope.sellAt]);
					//only apply modifier if auto-generated
					sellPrice += Number($scope.sellModifier);
				}

				//create buy text
				if (card.owned < 3) {
					if (card.card.rarity === 'Common' && $scope.buyCommon ||
						card.card.rarity === 'Uncommon' && $scope.buyUncommon ||
						card.card.rarity === 'Rare' && $scope.buyRare) {

						if ($scope.wtb.length > $scope.buyPrependText.length) {
							$scope.wtb += $scope.separator;
						}
						$scope.wtb += (3 - card.owned)+'x '+cardName+' ('+buyPrice+'g)';
					}
				}

				//create sell text
				if (card.owned > 3) {
					if (card.card.rarity === 'Common' && $scope.sellCommon ||
						card.card.rarity === 'Uncommon' && $scope.sellUncommon ||
						card.card.rarity === 'Rare' && $scope.sellRare) {

						if ($scope.wts.length > $scope.sellPrependText.length) {
							$scope.wts += $scope.separator;
						}

						$scope.wts += (card.owned-3)+'x '+cardName+' ('+sellPrice+'g)';
					}
				}
			}
		}
	}

	socket.on('card:saved',updateText);
	socket.on('user:login', updateText);
	socket.on('cards:all', updateText);
	$scope.$watch('separator + buyPrependText + sellPrependText + buyModifier + sellModifier + buyAt + sellAt + buyCommon + buyUncommon + buyRare + sellCommon + sellUncommon + sellRare',updateText);

});