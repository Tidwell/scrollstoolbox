'use strict';

angular.module('scrollstoolboxApp')
	.filter('interpolate', ['version',
	function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		}
	}
]);