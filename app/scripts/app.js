'use strict';

angular.module('scrollstoolboxApp', [])
	.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
		.when('/links', {
		templateUrl: 'views/links.html',
		controller: 'LinksCtrl'
	})
		.otherwise({
		redirectTo: '/'
	});
});