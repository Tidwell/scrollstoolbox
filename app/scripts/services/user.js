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
			minPrice: 0,
			maxPrice: 10000
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
		}
	};
});