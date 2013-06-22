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
		owned: [],
		fetched: false
	};

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
		var numCards = 0;
		for (var cardName in cards.data) {
			cards.data[cardName].owned = 0;
			delete cards.data[cardName].price.buyOverride;
			delete cards.data[cardName].price.sellOverride;
			delete cards.data[cardName].alwaysBuy;
			delete cards.data[cardName].alwaysSell;
			numCards++;
		}

		if (!numCards || !userData.owned) {
			return;
		}

		userData.owned.forEach(function(card) {
			for (var prop in card) {
				if (card.hasOwnProperty(prop) && typeof card[prop] !== 'undefined') {
					if (prop.indexOf('Override') !== -1) {
						cards.data[card.name].price[prop] = card[prop];
					} else {
						cards.data[card.name][prop] = card[prop];
					}
				}
			}
		});
	}

	socket.on('user:registered', updateCollection);
	socket.on('user:login', updateCollection);
	socket.on('user:logged-out', updateCollection);

	socket.on('cards:all', function(data) {
		cards.data = parseSet(data);
		updateCollection();
	});

	socket.on('card:saved', function() {
		//set a message?
		//maybe this should just be in the nav controller
	});

	return {
		get: function() {
			if (!cards.fetched) {
				socket.emit('cards:all');
				cards.fetched = true;
			}
			return cards;
		},
		save: function(obj) {
			socket.emit('card:save', {
				name: obj.card.name,
				owned: obj.owned,
				buyOverride: obj.price.buyOverride,
				sellOverride: obj.price.sellOverride,
				alwaysSell: obj.alwaysSell,
				alwaysBuy: obj.alwaysBuy
			});
			return cards;
		}
	};
});