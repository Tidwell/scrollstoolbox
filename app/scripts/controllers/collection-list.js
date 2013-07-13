'use strict';

angular.module('scrollstoolboxApp')
	.controller('CollectionListCtrl', function($scope, collectionList, $routeParams) {
		$scope.username = $routeParams.username;
		$scope.collection = collectionList.get($scope.username);
	});