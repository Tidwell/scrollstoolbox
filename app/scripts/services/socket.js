'use strict';
(function() {
	var socket;
	angular.module('scrollstoolboxApp')
		.service('socket', function($rootScope) {
		if (typeof io !== 'undefined' && !socket) {
			socket = io.connect();
		} else {
			//mock for tests, we should inject io instead and provide a separate mock
			socket = {on: function() {}, emit: function(){}};
		}
		return {
			on: function(eventName, callback) {
				socket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		};
	});
}());