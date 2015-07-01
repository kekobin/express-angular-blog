angular.module('eBlog', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			abstract: true,
			templateUrl: '/templates/home.html',
			controller: 'HomeController'
		})
		.state('home.login', {
			url: '/login',
			templateUrl: '/templates/login.html',
			controller: 'LoginController'
		})
		.state('home.register', {
			url: '/register',
			templateUrl: '/templates/register.html',
			controller: 'RegisterController'
		})
		.state('home.articleList', {
			url: '/articleList',
			templateUrl: '/templates/articleList.html',
			controller: 'ArticleListController'
		})
		.state('home.setting', {
			url: '/setting',
			templateUrl: '/templates/setting.html',
			controller: 'SettingController'
		})
		.state('home.mypage', {
			url: '/mypage/:id',
			templateUrl: '/templates/mypage.html',
			controller: 'MypageController'
		})
		.state('home.myarticle', {
			url: '/myarticle/:id',
			templateUrl: '/templates/myarticle.html',
			controller: 'MyarticleController'
		})
		.state('writer', {
			url: '/writer/:id',
			templateUrl: '/templates/writer.html',
			controller: 'WriterController'
		})
		.state('manager', {
			url: '/manager',
			templateUrl: '/templates/manager.html',
			controller: 'ManagerController'
		});

	$urlRouterProvider.otherwise('/home/articleList');
	$locationProvider.html5Mode(true);
}]);