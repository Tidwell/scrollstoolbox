'use strict';

angular.module('scrollstoolboxApp')
	.controller('CollectionListCtrl', function($scope, collectionList, $routeParams) {
		$scope.username = $routeParams.username;
		$scope.collection = collectionList.get($scope.username);

		$scope.hoverShow = true;

		//needs to be a directive
		$scope.$watch('hoverShow', function() {
			if ($scope.hoverShow) {
				$('.collection-container').addClass('hover-show');
			} else {
				$('.collection-container').removeClass('hover-show');
			}
		});

		$scope.generateImagePath = function(name) {
			if (name) {
				return '/img/scrolls-cards/'+name.toLowerCase().replace(/ /g,'').replace(/'/g,'')+'.png';
			}
		};
	});