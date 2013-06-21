'use strict';

angular.module('scrollstoolboxApp')
	.directive('rarityColor', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.rarityColor, function(rarity) {
				if (rarity) {
					$(element).addClass('rarity-' + rarity.toLowerCase());
				}
			});
		}
	};
});