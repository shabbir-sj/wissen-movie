/* Configuring the application config for blogsite */

(function () {

	'use strict';

	/* Initiation of app Module by including the required Modules */
	var app = angular.module('app', [
		'ui.router',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.bootstrap',

		'movie'
	]);

	app.config(appConfigHandler);

	appConfigHandler.$inject = [
		'$stateProvider',
		'$urlRouterProvider'
	];

	function appConfigHandler($stateProvider, $urlRouterProvider) {

		$stateProvider.state('movie-list', {
			url: '/',
			templateUrl: 'src/views/movielist.html',
			controller: 'ListController',
			controllerAs: 'ctrl'
		});

		$urlRouterProvider.otherwise('/');

	}

	app.run(appRunHandler);

	appRunHandler.$inject = [
		'$rootScope',
		'$window'
	];

	function appRunHandler($rootScope, $window) {

		var TABLET_BOUNDARY = 768, MOBILE_BOUNDARY = 480;

		handleWindowResize();
		$(window).on('resize', handleWindowResize);

		function handleWindowResize() {
			var currentW = $window.innerWidth;
			$rootScope.isSmallScreen = currentW <= TABLET_BOUNDARY;
			$rootScope.isXSScreen = currentW <= MOBILE_BOUNDARY;
			$rootScope.$digest();
		}
	}
})(angular);
