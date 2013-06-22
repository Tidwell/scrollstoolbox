'use strict';

angular.module('scrollstoolboxApp')
	.controller('LoggedInCtrl', function($scope, user) {
	$scope.userData = user.get();
});