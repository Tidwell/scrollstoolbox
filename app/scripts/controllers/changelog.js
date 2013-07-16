'use strict';

angular.module('scrollstoolboxApp')
	.controller('ChangelogCtrl', function($scope, user) {
		$scope.username = 'Tidwell'; //default to me for the example

		$scope.user = user.get();

		$scope.$watch('user.username', function() {
			if ($scope.user.username) {
				$scope.username = $scope.user.username;
			}
		});
	});