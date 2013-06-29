'use strict';

angular.module('scrollstoolboxApp')
  .controller('WtswtbCtrl', function ($scope, cards, socket) {
	$scope.data = cards.get();

	$scope.buyPrependText = 'WTB >>> ';
	$scope.sellPrependText = 'WTS >>> ';

	$scope.sharedOpts = {
		qPrefix: '',
		qSuffix: 'x ',
		gPrefix: ' (',
		gSuffix: 'g)',
		separator: ' // '
	};

	$scope.tableView = 'all';

	$scope.buyAt = 'low';
	$scope.sellAt = 'high';

	$scope.buyModifier = '+0';
	$scope.sellModifier = '+0';

	$scope.buyPModifier = '+0';
	$scope.sellPModifier = '+0';

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

				var buyPModifier;
				var sellPModifier;

				//only apply modifier if auto-generated
				if (card.price.buyOverride) {
					buyPrice = card.price.buyOverride;
				} else {
					buyPrice = Number(card.price[$scope.buyAt]);

					buyPModifier = Math.ceil(Number($scope.buyPModifier) ? (Number($scope.buyPModifier)/100)*Number(buyPrice) : 0);

					buyPrice += buyPModifier;
					buyPrice += Number($scope.buyModifier);
				}

				//only apply modifier if auto-generated
				if (card.price.sellOverride) {
					sellPrice = Number(card.price.sellOverride);
				} else {
					sellPrice = Number(card.price[$scope.sellAt]);

					sellPModifier = Math.ceil(Number($scope.buyPModifier) ? (Number($scope.sellPModifier)/100)*sellPrice : 0);

					sellPrice += sellPModifier;
					sellPrice += Number($scope.sellModifier);
				}

				//create buy text
				if (card.owned < 3 || card.alwaysBuy) {
					if (card.card.rarity === 'Common' && $scope.buyCommon ||
						card.card.rarity === 'Uncommon' && $scope.buyUncommon ||
						card.card.rarity === 'Rare' && $scope.buyRare) {

						if ($scope.wtb.length > $scope.buyPrependText.length) {
							$scope.wtb += $scope.sharedOpts.separator;
						}
						$scope.wtb += (card.alwaysBuy ? '' : $scope.sharedOpts.qPrefix+(3 - card.owned)+$scope.sharedOpts.qSuffix)+cardName+$scope.sharedOpts.gPrefix+buyPrice+$scope.sharedOpts.gSuffix;
					}
				}

				//create sell text
				if (card.owned > 3 || (card.alwaysSell && card.owned)) {
					if (card.card.rarity === 'Common' && $scope.sellCommon ||
						card.card.rarity === 'Uncommon' && $scope.sellUncommon ||
						card.card.rarity === 'Rare' && $scope.sellRare) {

						if ($scope.wts.length > $scope.sellPrependText.length) {
							$scope.wts += $scope.sharedOpts.separator;
						}

						$scope.wts += (card.alwaysSell ? '' : $scope.sharedOpts.qPrefix+(card.owned-3)+$scope.sharedOpts.qSuffix)+cardName+$scope.sharedOpts.gPrefix+sellPrice+$scope.sharedOpts.gSuffix;
					}
				}
			}
		}
	}

	socket.on('card:saved',updateText);
	socket.on('user:login', updateText);
	socket.on('cards:all', updateText);
	socket.on('user:error', updateText); //for when they are in the demo
	$scope.$watch('sharedOpts.separator + buyPrependText + sellPrependText + buyModifier + sellModifier + buyPModifier + sellPModifier + buyAt + sellAt + buyCommon + buyUncommon + buyRare + sellCommon + sellUncommon + sellRare + sharedOpts.gPrefix + sharedOpts.gSuffix + sharedOpts.qPrefix + sharedOpts.qSuffix',updateText);

});