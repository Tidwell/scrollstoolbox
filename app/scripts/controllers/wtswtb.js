'use strict';

angular.module('scrollstoolboxApp')
	.controller('WtswtbCtrl', function($scope, cards, socket, user) {
		$scope.u = user.get();

		$scope.data = cards.get();

		$scope.tableView = 'all';

		$scope.columnTradeableHide = false;
		$scope.columnTiersHide = false;

		$scope.showOrder = true;
		$scope.showEnergy = true;
		$scope.showGrowth = true;
		$scope.showDecay = true;

		$scope.wtb = '';
		$scope.wts = '';

		$scope.resetSettings = function() {
			user.resetSettings();
		};

		function includeRarity(rarity, card, buySell) {
			return (card.card.rarity === rarity && $scope.u.settings[buySell + rarity]);
		}


		function generatePrice(card, buySell) {
			var price;
			var pModifier;

			//only apply modifier if auto-generated
			if (card.price[buySell + 'Override']) {
				price = card.price[buySell + 'Override'];
			} else {
				price = Number(card.price[$scope.u.settings[buySell + 'At']]);

				pModifier = Math.ceil(Number($scope.u.settings[buySell + 'PModifier']) ? (Number($scope.u.settings[buySell + 'PModifier']) / 100) * Number(price) : 0);

				price += pModifier;
				price += Number($scope.u.settings[buySell + 'Modifier']);
			}

			if ($scope.u.settings.roundto) {
				price = $scope.u.settings.roundto * Math.round(price/$scope.u.settings.roundto);
			}

			return price;
		}

		function createText(card, price, buySell, tier) {
			var curLength = buySell === 'buy' ? $scope.wtb.length : $scope.wts.length;
			var str = '';
			if (curLength > $scope.u.settings[buySell + 'PrependText'].length) {
				str += $scope.u.settings.separator;
			}
			//handle otherwise
			if ((buySell === 'buy' && !card.alwaysBuy) || (buySell === 'sell' && !card.alwaysSell)) {
				str += $scope.u.settings.qPrefix;
				str += buySell === 'buy' ? (3 - card['tier' + tier]) : (card['tier' + tier] - 3);
				str += $scope.u.settings.qSuffix;
			}
			str += tier > 1 ? $scope.u.settings.tierPrefix + String(tier) + $scope.u.settings.tierSuffix : '';
			str += card.name;
			str += $scope.u.settings.gPrefix;
			str += price;
			str += $scope.u.settings.gSuffix;

			return str;
		}

		function shouldGenerate(card, price, buySell, tier) {
			return (
				(
					buySell === 'sell' ||
					(buySell === 'buy' && card.owned < $scope.u.settings.buyMax)
				) &&
				(includeRarity('Common', card, buySell) ||
					includeRarity('Uncommon', card, buySell) ||
					includeRarity('Rare', card, buySell)) &&
				(card.resource === 'Order' && $scope.u.settings.includeOrder ||
					card.resource === 'Energy' && $scope.u.settings.includeEnergy ||
					card.resource === 'Growth' && $scope.u.settings.includeGrowth ||
					card.resource === 'Decay' && $scope.u.settings.includeDecay) &&
				(price >= $scope.u.settings.minPrice &&
					price < $scope.u.settings.maxPrice) &&
				($scope.u.settings[buySell + 'tier' + tier])
			);
		}

		function updateText() {
			user.updateSettings();
			$scope.wtb = $scope.u.settings.buyPrependText;
			$scope.wts = $scope.u.settings.sellPrependText;
			for (var cardName in $scope.data.data) {
				if ($scope.data.data.hasOwnProperty(cardName) && cardName) {
					var card = $scope.data.data[cardName];

					//determine buy and sell price for each card
					var buyPrice = generatePrice(card, 'buy');
					var sellPrice = generatePrice(card, 'sell');

					//create buy text
					if (card.tier1 < 3 || card.alwaysBuy) {
						if (shouldGenerate(card, buyPrice, 'buy', 1)) {
							$scope.wtb += createText(card, buyPrice, 'buy', 1);
						}
					}
					//create sell text
					if (card.tier1 > 3 || (card.alwaysSell && card.tier1)) {
						if (shouldGenerate(card, sellPrice, 'sell', 1)) {
							$scope.wts += createText(card, sellPrice, 'sell', 1);
						}
					}

					//update price for tier 2
					var t2BuyPrice = buyPrice * $scope.u.settings.tier2multiplier;
					var t2SellPrice = sellPrice * $scope.u.settings.tier2multiplier;

					//create buy text
					if (card.tier2 < 3 || card.alwaysBuy) {
						if (shouldGenerate(card, t2BuyPrice, 'buy', 2)) {
							$scope.wtb += createText(card, t2BuyPrice, 'buy', 2);
						}
					}
					//create sell text
					if (card.tier2 > 3 || (card.alwaysSell && card.tier2)) {
						if (shouldGenerate(card, t2SellPrice, 'sell', 2)) {
							$scope.wts += createText(card, t2SellPrice, 'sell', 2);
						}
					}

					//tier 3 price
					var t3BuyPrice = buyPrice * $scope.u.settings.tier3multiplier;
					var t3SellPrice = sellPrice * $scope.u.settings.tier3multiplier;

					//create buy text
					if (card.tier3 < 3 || card.alwaysBuy) {
						if (shouldGenerate(card, t3BuyPrice, 'buy', 3)) {
							$scope.wtb += createText(card, t3BuyPrice, 'buy', 3);
						}
					}
					//create sell text
					if (card.tier3 > 3 || (card.alwaysSell && card.tier3)) {
						if (shouldGenerate(card, t3SellPrice, 'sell', 3)) {
							$scope.wts += createText(card, t3SellPrice, 'sell', 3);
						}
					}
				}
			}

			$scope.wtb += $scope.u.settings.buyAppendText;
			$scope.wts += $scope.u.settings.sellAppendText;
		}

		socket.on('card:saved', updateText);
		socket.on('user:login', updateText);
		socket.on('cards:all', updateText);
		socket.on('user:error', updateText); //for when they are in the demo
		$scope.$watch('u.settings.separator + u.settings.buyPrependText + u.settings.buyAppendText + u.settings.sellPrependText + u.settings.sellAppendText + u.settings.buyModifier + u.settings.sellModifier + u.settings.buyPModifier + u.settings.sellPModifier + u.settings.buyAt + u.settings.sellAt + u.settings.buyCommon + u.settings.buyUncommon + u.settings.buyRare + u.settings.sellCommon + u.settings.sellUncommon + u.settings.sellRare + u.settings.gPrefix + u.settings.gSuffix + u.settings.qPrefix + u.settings.qSuffix + u.settings.includeEnergy + u.settings.includeOrder + u.settings.includeGrowth + u.settings.includeDecay + u.settings.minPrice + u.settings.maxPrice + u.settings.buytier1 + u.settings.buytier2 + u.settings.buytier3 + u.settings.selltier1 + u.settings.selltier2 + u.settings.selltier3 + u.settings.tier2multiplier + u.settings.tier3multiplier + u.settings.tierPrefix + u.settings.tierSuffix + u.settings.buyMax + u.settings.roundto', updateText);

	});