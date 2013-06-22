'use strict';
/*
Cards Service

listens
all-cards

sends
all-cards

*/

angular.module('scrollstoolboxApp')
	.service('cards', function($http, $rootScope, socket, user) {

	var cardTemplate = {
		error: false,
		data: {},
		owned: []
	};

	$rootScope.$watch('data.data', function() {
		console.log('change', arguments);
	});

	var cards = angular.copy(cardTemplate);
	var userData = user.get();

	function parseSet(res) {
		var rarityMap = ['Common', 'Uncommon', 'Rare'];
		for (var cardName in res) {
			res[cardName].price.median = Math.floor((res[cardName].price.high + res[cardName].price.low) / 2);
			res[cardName].resource = res[cardName].card.costenergy ? 'Energy' : (res[cardName].card.costgrowth ? 'Growth' : 'Order');
			res[cardName].card.rarity = rarityMap[res[cardName].card.rarity];
		}
		return res;
	}

	function updateCollection() {
		//parse the collection from the user and set the #owned on cards
		console.log('updating collection', userData.owned);
		var numCards = 0;
		for (var cardName in cards.data) {
			cards.data[cardName].owned = 0;
			numCards++;
		}

		if (!numCards || !userData.owned) { return; }

		userData.owned.forEach(function(card){
			if (card.owned) {
				cards.data[card.name].owned = card.owned;
			}
			if (card.buyOverride) {
				cards.data[card.name].price.buyOverride = card.buyOverride;
			}
			if (card.sellOverride) {
				cards.data[card.name].price.sellOverride = card.sellOverride;
			}
		});
	}

	socket.on('user:registered', updateCollection);
	socket.on('user:updated', updateCollection);
	socket.on('user:login', updateCollection);

	socket.on('all-cards', function(data) {
		cards.data = parseSet(data);
		updateCollection();
	});

	socket.on('card:saved', function(data){
		console.log(data);
	});

	return {
		get: function() {
			socket.emit('cards:all');
			return cards;
		},
		save: function(obj) {
			console.log(obj);
			socket.emit('card:save', {
				name: obj.card.name,
				owned: obj.owned,
				buyOverride: obj.price.buyOverride,
				sellOverride: obj.price.sellOverride
			});
			return cards;
		}
	};
});