'use strict';

angular.module('scrollstoolboxApp')
	.controller('LinksCtrl', function($scope) {
		$scope.links = {
			prices: [{
				title: 'Scrollsguide',
				url: 'http://www.scrollsguide.com/trade',
				description: 'Price-checking, search, generated from in-game bot.'
			}],
			trading: [{
				title: 'Scrolls Shop',
				url: 'http://www.scrollsshop.com/',
				description: 'Mod-supported collection tracking, WTS list generation'
			}, {
				title: 'Scrolls Trader',
				url: 'http://www.scrollstrader.com/',
				description: 'Post buy/sell/trade requests'
			}],
			deckbuilders: [{
					title: 'Scrollsguide Deckbuilder',
					url: 'http://www.scrollsguide.com/deckbuilder/',
					description: 'Sorting, Drag and Drop, Card Browser, Filters, Sharing & Saving (account required)'
				}, {
					title: 'Famous Frames Deckbuilder',
					url: 'http://scrolls.famousframes.de/',
					description: 'Sorting, Search, Card Browser, Full-Card Visual Deckview, Sharing & Saving, Decks Browser, Commenting'
				}

			],
			draft: [{
				title: 'Judgement Simulator',
				url: 'http://www.scrollsguide.com/judgement',
				description: 'Judgement Simulator, community-improved version.'
			}, {
				title: 'Scrollsguide Draft',
				url: 'http://www.scrollsguide.com/draft',
				description: 'Standard 8 man draft.'
			}],
			official: [],
			fansites: [],
			lists: [{
				title: 'Scrollsguide Wiki Database',
				url: 'http://www.scrollsguide.com/wiki/index.php/Scrolls_Database',
				description: 'Browse all cards, Sorting, includes removed and upcomming cards.'
			}],
			misc: [{
				title: 'Scrollsguide Card Maker',
				url: 'http://www.scrollsguide.com/designer',
				description: 'Create custom cards'
			}],
			developers: [{
				title: 'Scrollsguide API',
				url: 'http://a.scrollsguide.com/docs/',
				description: 'Scrollsguide Scrolls API & resources'
			}, {
				title: 'Summoner Modloader',
				url: 'http://www.scrollsguide.com/summoner',
				description: 'aka ModLoader, allows you to write mods for scrolls in C#'
			}, {
				title: 'Card Image Collector',
				url: 'https://github.com/RelentlessEmu/RelentlessTools/tree/master/CardImageCollector',
				description: 'The card image collector is used to download the Scroll animation kits and card images from the official Mojang servers. (windows)'
			}],
			notUpdated: [{
				category: 'prices',
				title: 'Scrolls Trading Bulletin',
				url: 'http://trading.scrolls.pw/',
				description: 'Price checking and card information, generated from in-game bot'
			}, {
				category: 'prices',
				title: 'Scrolls PC',
				url: 'http://scrollspc.com/',
				description: 'Price checking, price voting, historical price charts (no longer updated)'
			}, {
				category: 'trading',
				title: 'Fast Trade',
				url: 'http://scrollspc.com/fasttrade/index.php',
				description: 'Made by ScrollsPC, post buy/sell requests'
			}, {
				category: 'developers',
				title: 'ScrollsPC API',
				url: 'http://scrollspc.icyboards.net/showthread.php?tid=14',
				description: 'Forum thread on ScrollsPC detailing their API. (no longer available)'
			}, {
				category: 'developers',
				title: 'Scrolls Trading Bulletin API',
				url: 'http://www.reddit.com/r/Scrolls/comments/1gqzg9/scrolls_trading_sites_comparisonaverage_in_json/can6dge',
				description: 'Reddit thread detailing Scrolls Trading Bulletin API'
			}, {
				category: 'lists',
				title: 'Visual Card Spoiler',
				url: 'http://www.morosanmihail.com/home/scrolls-cards',
				description: 'Browse images of all cards, Filters'
			}, {
				category: 'lists',
				title: 'Scrolls.Me Library',
				url: 'http://library.scrolls.me/',
				description: 'Browse all cards, Filters'
			}, {
				category: 'trading',
				title: 'Trading Scrolls',
				url: 'http://www.tradingscrolls.com/',
				description: 'Post buy/sell/trade requests'
			}, {
				category: 'prices',
				title: 'Scrolls Post',
				url: 'http://www.scrollspost.com/',
				description: 'Price checking, Filters, Time-Ranged pricing, generated from in-game bot'
			}, {
				category: 'prices',
				title: 'Scrolls Prices',
				url: 'http://scrollsprices.com/',
				description: 'Price checking'
			}, {
				category: 'deckbuilders',
				title: 'ScrollsPost Deckbuilder',
				url: 'http://www.scrollspost.com/deckbuilder',
				description: 'Drag and Drop, Card Browser, Filters, Sharing, In-Game Import (via MOD), Stats'
			}, {
				category: 'list',
				title: 'ScrollsPost Card DB',
				url: 'http://www.scrollspost.com/scrolls',
				description: 'Browse all cards, Sorting, Filtering'
			}, {
				category: 'trading',
				title: 'Scrolls Swap',
				url: 'http://scrollswap.com/',
				description: 'Post buy/sell/trade requests'
			}, {
				category: 'draft',
				title: 'Plinko Draft',
				url: 'http://scrolls.bitplay.net/',
				description: 'Drafting, plinko style.'
			}]
		};
	});