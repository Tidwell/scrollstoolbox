'use strict';

angular.module('scrollstoolboxApp')
	.controller('LinksCtrl', function($scope) {
	$scope.links = {
		prices: [{
				title: 'Scrolls Trading Bulletin',
				url: 'http://trading.scrolls.pw/',
				description: 'Price checking and card information, generated from in-game bot'
			}, {
				title: 'Scrolls PC',
				url: 'http://scrollspc.com/',
				description: 'Price checking, price voting, historical price charts'
			}, {
				title: 'Scrolls Prices',
				url: 'http://scrollsprices.com/',
				description: 'Price checking'
			}, {
				title: 'Scrolls Post',
				url: 'http://www.scrollspost.com/',
				description: 'Price checking, Filters, Time-Ranged pricing, generated from in-game bot'
			}
		],
		trading: [{
				title: 'Scrolls Swap',
				url: 'http://scrollswap.com/',
				description: 'Post buy/sell/trade requests'
			}, {
				title: 'FastTrade',
				url: 'http://scrollspc.com/fasttrade/index.php',
				description: 'Made by ScrollsPC, post buy/sell requests'
			}, {
				title: 'TradingScrolls',
				url: 'http://www.tradingscrolls.com/',
				description: 'Post buy/sell/trade requests'
			}
		],
		deckbuilders: [{
				title: 'Scrolls Guide Deckbuilder',
				url: 'http://www.scrollsguide.com/deckbuilder/',
				description: 'Sorting, Drag and Drop, Card Browser, Filters, Saving (account required)'
			}, {
				title: 'Famous Frames Deckbuilder',
				url: 'http://scrolls.famousframes.de/',
				description: 'Sorting, Search, Card Browser, Full-Card Visual Deckview, Sharing & Saving, Decks Browser, Commenting'
			}

		],
		official: [],
		fansites: [],
		lists: [{
				title: 'Scrolls Guide Wiki Database',
				url: 'http://www.scrollsguide.com/wiki/index.php/Scrolls_Database',
				description: 'Browse all cards, Sorting, includes removed and upcomming cards.'
			}, {
				title: 'Scrolls.Me Library',
				url: 'http://library.scrolls.me/',
				description: 'Browse all cards, Filters'
			}, {
				title: 'Visual Card Spoiler',
				url: 'http://www.morosanmihail.com/home/scrolls-cards',
				description: 'Browse images of all cards, Filters'
			}
		],
		misc: [{
				title: 'Scrolls Guide Card Maker',
				url: 'http://www.scrollsguide.com/designer',
				description: 'Create custom cards'
			}
		],
		developers: [{
				title: 'ScrollsGuide API',
				url: 'http://www.reddit.com/r/Scrolls/comments/1ge2wj/full_scrolls_sqldb_or_spreatsheet/caje1f3',
				description: 'Reddit thread for how to request ScrollsGuide API acess'
			}, {
				title: 'Scrolls Trading Bulletin API',
				url: 'http://www.reddit.com/r/Scrolls/comments/1gqzg9/scrolls_trading_sites_comparisonaverage_in_json/can6dge',
				description: 'Reddit thread detailing Scrolls Trading Bulletin API'
			},
			{
				title: 'ScrollsPC API',
				url: 'http://scrollspc.icyboards.net/showthread.php?tid=14',
				description: 'Forum thread on ScrollsPC detailing their API.'
			}
		]
	};
});