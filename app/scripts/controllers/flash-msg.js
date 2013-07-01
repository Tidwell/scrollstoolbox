'use strict';

angular.module('scrollstoolboxApp').controller('FlashMsgCtrl', function($scope, flashMsg) {
	$scope.flashMsg = flashMsg.get();
});