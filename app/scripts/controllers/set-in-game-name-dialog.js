'use strict';

angular.module('scrollstoolboxApp')
	.controller('SetInGameNameDialogCtrl', function($scope, dialog) {
	$scope.close = function(result) {
		dialog.close(result);
	};
});