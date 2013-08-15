'use strict';
/*
User Service

also stores password once authenticated, getter: .getPassword()

listens
user:registered
user:update
user:login

sends
user:login
user:register
user:forgot-password
user:logout
user:update

*/

angular.module('scrollstoolboxApp')
	.service('user', function($http, $rootScope, socket) {
	var userTemplate = {
		error: false,
		authed: false,
		settings: {
			theme: 'dark',

			//wts wtb
			separator: ' // ',
			buyPrependText: 'WTB >>> ',
			buyAppendText: '',
			sellPrependText: 'WTS >>> ',
			sellAppendText: '',
			buyModifier: 0,
			sellModifier: 0,
			buyPModifier: 0,
			sellPModifier: 0,
			buyAt: 'low',
			sellAt: 'high',
			buyCommon: true,
			buyUncommon: true,
			buyRare: true,
			sellCommon: true,
			sellUncommon: true,
			sellRare: true,
			gPrefix: ' (',
			gSuffix: 'g)',
			qPrefix: '',
			qSuffix: 'x ',
			includeEnergy: true,
			includeOrder: true,
			includeGrowth: true,
			includeDecay: true,
			minPrice: 0,
			maxPrice: 50000,
			buytier1: true,
			buytier2: false,
			buytier3: false,
			selltier1: true,
			selltier2: false,
			selltier3: false,
			tier2multiplier: 3,
			tier3multiplier: 9,
			tierPrefix: '[t',
			tierSuffix: ']',
			buyMax: 3,

			ownedColors: {
				extras: '#787DF5',
				playset: '#8CF578',
				missing: '#F5CD78',
				none: '#F57878'
			},
			rarityColors: {
				rare: '#FF00FF',
				uncommon: '#00FF00',
				common: '#0000FF'
			},
			factionColors: {
				growth: '#ACD0B0',
				order: '#A4C2F4',
				energy: '#F9CB9C',
				decay: '#daaced'
			}
		}
	};

	var user = angular.copy(userTemplate);

	socket.on('user:error', function(data) {
		user.error = data.error;
	});

	function updateUser(data) {
		for (var property in data) {
			user[property] = data[property];
		}
		//if the user has no settings, save their defaults
		if (!data.settings) {
			socket.emit('settings:update', {
				settings: user.settings
			});
		}
		if (!data.settings.ownedColors) {
			data.settings.ownedColors = angular.copy(userTemplate.settings.ownedColors);
		}
		if (!data.settings.rarityColors) {
			data.settings.rarityColors = angular.copy(userTemplate.settings.rarityColors);
		}
		if (!data.settings.factionColors) {
			data.settings.factionColors = angular.copy(userTemplate.settings.factionColors);
		}
	}

	socket.on('user:registered', updateUser);
	socket.on('user:updated', updateUser);
	socket.on('user:login', updateUser);
	socket.on('collection:synced', function() {
		user.synced = true;
	});

	return {
		get: function() {
			return user;
		},
		login: function(data) {
			user.error = false;
			socket.emit('user:login', data);
			return user;
		},
		register: function(data) {
			user.error = false;
			socket.emit('user:register', data);
			return user;
		},
		forgotPassword: function(email) {
			socket.emit('user:forgot-password', {
				email: email
			});
			return user;
		},
		logout: function() {
			socket.emit('user:logout', {
				username: user.username
			});
			var prop;
			//clear the user
			for (prop in user) {
				if (user.hasOwnProperty(prop)) {
					delete user[prop];
				}
			}
			//reset
			for (prop in userTemplate) {
				if (userTemplate.hasOwnProperty(prop)) {
					user[prop] = userTemplate[prop];
				}
			}
			return user;
		},
		update: function() {
			socket.emit('user:update', {
				inGameName: user.inGameName,
				email: user.email,
				username: user.username,
				newPassword: user.password,
				settings: user.settings
			});
		},
		updateSettings: function() {
			socket.emit('settings:update', {
				settings: user.settings
			});
		},
		resetSettings: function() {
			var curTheme = user.settings.theme; //remember the theme

			user.settings = angular.copy(userTemplate.settings);
			user.settings.theme = curTheme; //reset it

			this.updateSettings();
		}
	};
});