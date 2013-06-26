'use strict';

angular.module('scrollstoolboxApp')
	.controller('MainCtrl', function($scope, user, $dialog) {
	$scope.user = user.get();
	var d; //active dialog
	$scope.startDialog = function(viewOverride) {
		if (!$scope.user.authed) {
			//prompt to register
			d = $dialog.dialog({
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				templateUrl: 'views/register-dialog.html',
				controller: 'RegisterDialogCtrl'
			});
			d.open().then(function(result) {
				if (result && $scope.user.authed) {
					$scope.startDialog(); //trigger the next step
					return;
				}
			});
			return;
		}
		else if (!$scope.user.inGameName) {
			//prompt for ingamename
			d = $dialog.dialog({
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				templateUrl: 'views/set-in-game-name-dialog.html',
				controller: 'SetInGameNameDialogCtrl'
			});
			d.open().then(function(result) {
				if (result && $scope.user.authed) {
					$scope.user.inGameName = result;
					user.update();
					$scope.startDialog(); //trigger the next step
					return;
				}
			});
			return;
		} else if (!viewOverride) {
			//prompt for download
			d = $dialog.dialog({
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				templateUrl: 'views/download-summoner-dialog.html',
				controller: 'DownloadDialogCtrl'
			});
			d.open().then(function(result) {
				if (result) {
					$scope.startDialog('final');
				}
			});
		} else if (viewOverride === 'final') {
			//prompt for download
			d = $dialog.dialog({
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				templateUrl: 'views/enable-sync-dialog.html',
				controller: 'EnableSyncCtrl'
			});
			d.open().then(function() {
				//were done
			});
		}
	};
});