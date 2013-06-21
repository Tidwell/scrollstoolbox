'use strict';

angular.module('scrollstoolboxApp')
	.filter('price', function() {
	return function(price, elm, attrs) {
		var val = '';
		if (price) {
			if (price.low === price.high) {
				val = price.low;
			} else {
				val = price.low + '-' + price.high;
			}
		}
		return val;
	};
});