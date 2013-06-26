'use strict';

angular.module('scrollstoolboxApp')
	.controller('EnableSyncCtrl', function($scope, dialog) {
	$scope.close = function(result) {
		dialog.close(result);
	};
});