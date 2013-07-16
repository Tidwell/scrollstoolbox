'use strict';

angular.module('scrollstoolboxApp')
	.controller('CollectionListCtrl', function($scope, collectionList, $routeParams) {
		$scope.username = $routeParams.username;
		$scope.collection = collectionList.get($scope.username);

		$scope.generateImagePath = function(name) {
			if (name) {
				return '/img/scrolls-cards/'+name.toLowerCase().replace(/ /g,'').replace(/'/g,'')+'.png';
			}
		};
	});