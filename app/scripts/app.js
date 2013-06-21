'use strict';

angular.module('scrollstoolboxApp', [])
	.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
		.when('/account', {
		templateUrl: 'views/account.html',
		controller: 'AccountCtrl'
	})
		.when('/forgot-password', {
		templateUrl: 'views/forgot-password.html',
		controller: 'ForgotPasswordCtrl'
	})
		.when('/links', {
		templateUrl: 'views/links.html',
		controller: 'LinksCtrl'
	})
		.when('/faq', {
		templateUrl: 'views/faq.html',
		controller: 'FaqCtrl'
	})
		.otherwise({
		redirectTo: '/'
	});
});