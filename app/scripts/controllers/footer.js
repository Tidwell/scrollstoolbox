'use strict';

angular.module('scrollstoolboxApp')
	.controller('FooterCtrl', function($scope, socket) {
	$scope.userCount = 0;
	socket.on('users:count', function(data) {
		$scope.userCount = data.count;
	});

	socket.emit('users:count');
});