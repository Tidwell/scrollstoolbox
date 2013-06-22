'use strict';

angular.module('scrollstoolboxApp')
	.directive('selectOnClick', function() {
	// Linker function
	return function(scope, element) {
		element.click(function() {
			element.select();
		});
	};
});