'use strict';

angular.module('scrollstoolboxApp')
	.service('flashMsg', function($http, $timeout) {

	var flashMsg = {
		msg: '',
		show: false
	};

	function getMsg() {
		$http.get('/flash-msg.json').success(function(data) {
			if (data.msg !== flashMsg.msg) {
				flashMsg.show = true;
			}
			flashMsg.msg = data.msg;
			$timeout(getMsg, 60000);
		}).error(function() {
			console.log('err');
			flashMsg.msg = '';
			flashMsg.show = false;
		});
	}
	getMsg();


	// Public API here
	return {
		get: function() {
			return flashMsg;
		}
	};
});