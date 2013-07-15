'use strict';

angular.module('scrollstoolboxApp')
  .controller('WtswtbCtrl', function ($scope, cards, socket, user) {
  	$scope.u = user.get();

	$scope.data = cards.get();

	$scope.tableView = 'all';

	$scope.showOrder = true;
	$scope.showEnergy = true;
	$scope.showGrowth = true;

	$scope.wtb = '';
	$scope.wts = '';

	function updateText() {
		user.updateSettings();
		$scope.wtb = $scope.u.settings.buyPrependText;
		$scope.wts = $scope.u.settings.sellPrependText;
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
					buyPrice = Number(card.price[$scope.u.settings.buyAt]);

					buyPModifier = Math.ceil(Number($scope.u.settings.buyPModifier) ? (Number($scope.u.settings.buyPModifier)/100)*Number(buyPrice) : 0);

					buyPrice += buyPModifier;
					buyPrice += Number($scope.u.settings.buyModifier);
				}

				//only apply modifier if auto-generated
				if (card.price.sellOverride) {
					sellPrice = Number(card.price.sellOverride);
				} else {
					sellPrice = Number(card.price[$scope.u.settings.sellAt]);

					sellPModifier = Math.ceil(Number($scope.u.settings.sellPModifier) ? (Number($scope.u.settings.sellPModifier)/100)*sellPrice : 0);

					sellPrice += sellPModifier;
					sellPrice += Number($scope.u.settings.sellModifier);
				}

				//create buy text
				if (card.owned < 3 || card.alwaysBuy) {
					if ((card.card.rarity === 'Common' && $scope.u.settings.buyCommon ||
						card.card.rarity === 'Uncommon' && $scope.u.settings.buyUncommon ||
						card.card.rarity === 'Rare' && $scope.u.settings.buyRare ) &&

						(card.resource === 'Order' && $scope.u.settings.includeOrder ||
						card.resource === 'Energy' && $scope.u.settings.includeEnergy ||
						card.resource === 'Growth' && $scope.u.settings.includeGrowth) &&

						(buyPrice >= $scope.u.settings.minPrice &&
						buyPrice < $scope.u.settings.maxPrice )) {

						//console.log(card.resource, $scope.u.settings)

						if ($scope.wtb.length > $scope.u.settings.buyPrependText.length) {
							$scope.wtb += $scope.u.settings.separator;
						}
						$scope.wtb += (card.alwaysBuy ? '' : $scope.u.settings.qPrefix+(3 - card.owned)+$scope.u.settings.qSuffix)+cardName+$scope.u.settings.gPrefix+buyPrice+$scope.u.settings.gSuffix;
					}
				}

				//create sell text
				if (card.owned > 3 || (card.alwaysSell && card.owned)) {
					if ((card.card.rarity === 'Common' && $scope.u.settings.sellCommon ||
						card.card.rarity === 'Uncommon' && $scope.u.settings.sellUncommon ||
						card.card.rarity === 'Rare' && $scope.u.settings.sellRare) &&

						(card.resource === 'Order' && $scope.u.settings.includeOrder ||
						card.resource === 'Energy' && $scope.u.settings.includeEnergy ||
						card.resource === 'Growth' && $scope.u.settings.includeGrowth) &&

						(sellPrice >= $scope.u.settings.minPrice &&
						sellPrice < $scope.u.settings.maxPrice )) {

						if ($scope.wts.length > $scope.u.settings.sellPrependText.length) {
							$scope.wts += $scope.u.settings.separator;
						}

						$scope.wts += (card.alwaysSell ? '' : $scope.u.settings.qPrefix+(card.owned-3)+$scope.u.settings.qSuffix)+cardName+$scope.u.settings.gPrefix+sellPrice+$scope.u.settings.gSuffix;
					}
				}
			}
		}

		$scope.wtb += $scope.u.settings.buyAppendText;
		$scope.wts += $scope.u.settings.sellAppendText;
	}

	socket.on('card:saved',updateText);
	socket.on('user:login', updateText);
	socket.on('cards:all', updateText);
	socket.on('user:error', updateText); //for when they are in the demo
	$scope.$watch('u.settings.separator + u.settings.buyPrependText + u.settings.buyAppendText + u.settings.sellPrependText + u.settings.sellAppendText + u.settings.buyModifier + u.settings.sellModifier + u.settings.buyPModifier + u.settings.sellPModifier + u.settings.buyAt + u.settings.sellAt + u.settings.buyCommon + u.settings.buyUncommon + u.settings.buyRare + u.settings.sellCommon + u.settings.sellUncommon + u.settings.sellRare + u.settings.gPrefix + u.settings.gSuffix + u.settings.qPrefix + u.settings.qSuffix + u.settings.includeEnergy + u.settings.includeOrder + u.settings.includeGrowth + u.settings.minPrice + u.settings.maxPrice',updateText);

});