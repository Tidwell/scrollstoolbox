'use strict';

angular.module('scrollstoolboxApp')
	.directive('fadeOutRemove', function() {
	return {
		link: function postLink(scope, element, attrs) {
			$(element).fadeOut(2000, function() {
				if (!scope.$parent) {
					//how this ever happens i have no idea...
					return;
				}
				scope.$apply(function() {
				/* the right way
				var index = scope.$parent[attrs.removeFrom].indexOf({card: $(element).html()});
				scope.$parent[attrs.removeFrom].splice(index,1);
				*/

					scope.$parent[attrs.removeFrom] = []; //fuck it
				});
			});
		}
	};
});