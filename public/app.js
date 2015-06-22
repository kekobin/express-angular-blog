angular.module('eBlog', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			abstract: true,
			templateUrl: '/templates/home.html',
			controller: 'HomeController'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/templates/login.html',
			controller: 'LoginController'
		})
		.state('register', {
			url: '/register',
			templateUrl: '/templates/register.html',
			controller: 'RegisterController'
		})
		.state('home.articleDetail', {
			url: '/articleDetail',
			templateUrl: '/templates/articleDetail.html',
			controller: 'ArticleDetailController'
		})
		.state('home.articleList', {
			url: '/articleList',
			templateUrl: '/templates/articleList.html',
			controller: 'ArticleListController'
		});

	$urlRouterProvider.otherwise('/home/articleList');
	$locationProvider.html5Mode(true);
}]);