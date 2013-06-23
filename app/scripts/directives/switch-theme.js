'use strict';

(function() {
	var $darkCSS;
	angular.module('scrollstoolboxApp')
		.directive('switchTheme', function() {
		return {
			link: function postLink(scope, element) {
				var $body = $('body');
				if (!$body.hasClass('dark')) {
					$(element).html('Switch to Dark Theme');
				}
				$(element).click(function() {
					if ($body.hasClass('dark')) {
						$darkCSS = $('#darkstrap').clone();
						$('#darkstrap').remove();
						$body.removeClass('dark');
						$(element).html('Switch to Dark Theme');
					} else {
						$('body').append($darkCSS);
						$body.addClass('dark');
						$(element).html('Switch to Light Theme');
					}
				});
			}
		};
	});
}());