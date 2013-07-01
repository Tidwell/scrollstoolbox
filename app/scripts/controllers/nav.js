'use strict';

angular.module('scrollstoolboxApp')
  .controller('NavCtrl', function ($scope, $location, user, socket) {
	$scope.user = user.get();

	$scope.username = '';
	$scope.password = '';

	$scope.$watch('user.authed', function() {
		if ($scope.user.authed) {
			clearForm();
		}
	});
	//todo get rid of this so the controller doesnt depend on socket
	socket.on('user:updated', function() {
		$scope.userUpdated = true;
	});

	$scope.saveMsgs = [

	];

	socket.on('card:saved', function(data) {
		if ($scope.saveMsgs.indexOf(data) === -1) {
			$scope.saveMsgs.push(data);
		}
	});

	$scope.clearUpdated = function() {
		$scope.userUpdated = false;
	};

	function clearForm() {
		$scope.username = '';
		$scope.password = '';
	}

	$scope.login = function() {
		$scope.user = user.login({
			username: $scope.username,
			password: $scope.password
		});
	};

	$scope.register = function() {
		$scope.user = user.register({
			username: $scope.username,
			password: $scope.password
		});
	};

	$scope.logout = function() {
		$scope.user = user.logout();
	};

	$scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };
  });
