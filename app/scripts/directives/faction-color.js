'use strict';

angular.module('scrollstoolboxApp')
	.directive('factionColor', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.factionColor, function(faction) {
				if (faction) {
					$(element).addClass('faction-' + faction.toLowerCase());
				}
			});
		}
	};
});