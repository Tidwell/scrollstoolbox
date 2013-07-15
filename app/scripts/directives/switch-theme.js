'use strict';

(function() {
	angular.module('scrollstoolboxApp')
		.directive('switchTheme', function(user) {
		var u = user.get();

		function goDark($el) {
			$el.html('Switch to Light Theme');
		}

		function goLight($el) {
			$el.html('Switch to Dark Theme');
		}

		function load($el) {
			if (u.settings.theme === 'light') {
				goLight($el);
				return;
			}
			goDark($el);
		}

		return {
			link: function postLink(scope, element) {
				var $el = $(element);

				scope.$watch('user.settings', function() {
					load($el);
				});

				//bind element
				$el.click(function() {
					if (u.settings.theme === 'dark') {
						u.settings.theme = 'light';
					} else {
						u.settings.theme = 'dark';
					}
					user.updateSettings();
					load($el);
				});
			}
		};
	});
}());