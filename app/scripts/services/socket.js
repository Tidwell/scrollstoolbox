'use strict';

angular.module('scrollstoolboxApp')
	.service('socket', function($rootScope) {
	var socket;
	if (typeof io !== 'undefined') {
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