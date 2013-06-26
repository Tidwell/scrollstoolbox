'use strict';

angular.module('scrollstoolboxApp')
  .controller('RegisterDialogCtrl', function ($scope, $location, user, socket, dialog) {
	$scope.user = user.get();

	$scope.username = '';
	$scope.password = '';

	$scope.$watch('user.authed', function() {
		if ($scope.user.authed) {
			clearForm();
		}
	});

	function clearForm() {
		$scope.username = '';
		$scope.password = '';
	}

	$scope.register = function() {
		$scope.user = user.register({
			username: $scope.username,
			password: $scope.password
		});
	};

	$scope.$watch('user.authed', function() {
		console.log('watch called');
		if ($scope.user.authed) {
			$scope.close($scope.user.username);
		}
	});

	$scope.close = function(result) {
		dialog.close(result);
	};
  });
