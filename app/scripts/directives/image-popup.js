'use strict';

angular.module('scrollstoolboxApp')
	.directive('imagePopup', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.imagePopup, function(image) {
				if (image) {
					$(element).popover({
						html: true,
						content: '<img src="' + image + '" />',
						trigger: 'hover',
						placement: 'right',
						container: '.image-popup-container'
					});
				}
			});
		}
	};
});