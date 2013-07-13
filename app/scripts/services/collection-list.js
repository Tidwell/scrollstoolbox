'use strict';

angular.module('scrollstoolboxApp')
	.factory('collectionList', function(socket) {
		var collection = {
			error: false,
			msg: '',
			collection: []
		};

		socket.on('collection:list',function(data) {
			for (var prop in data) {
				if (data.hasOwnProperty(prop)) {
					collection[prop] = data[prop];
				}
			}
		});


		// Public API here
		return {
			get: function(username) {
				collection.error = false;
				collection.msg = '';
				collection.collection = [];
				socket.emit('collection:list',{username: username});
				return collection;
			}
		};
	});