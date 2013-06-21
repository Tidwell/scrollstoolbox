'use strict';

angular.module('scrollstoolboxApp')
	.directive('ownedColor', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.ownedColor, function(numPlayers) {
				if (numPlayers < 3) {
					$(element).addClass('owned-colors-missing');
				} else if (numPlayers === 3) {
					$(element).addClass('owned-colors-playset');
				} else if (numPlayers > 3) {
					$(element).addClass('owned-colors-extras');
				}
			});
		}
	};
});