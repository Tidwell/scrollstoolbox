'use strict';

(function() {
	angular.module('scrollstoolboxApp')
		.directive('bodyTheme', function(user, socket) {

		var u = user.get();

		var $body;
		var $darkCSS;

		function goDark() {
			if ($('#darkstrap').length) { return; }
			$body.append($darkCSS);
			$body.addClass('dark');
		}
		function goLight() {
			if (!$('#darkstrap').length) { return; }
			$('#darkstrap').remove();
			$body.removeClass('dark');
		}

		function load() {
			if (u.settings.theme === 'light') {
				goLight();
				return;
			}
			goDark();
		}

		socket.on('user:login', load);
		socket.on('settings:updated', load);
		socket.on('settings:error', load);

		return {
			link: function postLink() {
				$darkCSS = $('#darkstrap').clone();
				$body = $('body');
				load();
			}
		};
	});
}());