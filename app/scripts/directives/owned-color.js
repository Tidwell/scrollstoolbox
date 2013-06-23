'use strict';

angular.module('scrollstoolboxApp')
	.directive('ownedColor', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.ownedColor, function(numOwned) {
				$(element).removeClass('owned-colors-missing')
					.removeClass('owned-colors-playset')
					.removeClass('owned-colors-extras');

				if (numOwned < 3) {
					$(element).addClass('owned-colors-missing');
				} else if (numOwned === 3) {
					$(element).addClass('owned-colors-playset');
				} else if (numOwned > 3) {
					$(element).addClass('owned-colors-extras');
				}
			});
		}
	};
});