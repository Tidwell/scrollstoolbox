'use strict';

angular.module('scrollstoolboxApp')
	.controller('DownloadDialogCtrl', function($scope, dialog) {
	$scope.close = function(result) {
		dialog.close(result);
	};
});