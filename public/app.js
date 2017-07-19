angular.module('eBlog', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
	$stateProvider
		.state('blog', {
			url: '/blog',
			abstract: true,
			templateUrl: '/templates/home.html',
			controller: 'HomeController'
		})
		.state('blog.login', {
			url: '/login',
			templateUrl: '/templates/login.html',
			controller: 'LoginController'
		})
		.state('blog.register', {
			url: '/register',
			templateUrl: '/templates/register.html',
			controller: 'RegisterController'
		})
		.state('blog.articleList', {
			url: '/articleList',
			templateUrl: '/templates/articleList.html',
			controller: 'ArticleListController'
		})
		.state('blog.setting', {
			url: '/setting',
			templateUrl: '/templates/setting.html',
			controller: 'SettingController'
		})
		.state('blog.mypage', {
			url: '/mypage/:id',
			templateUrl: '/templates/mypage.html',
			controller: 'MypageController'
		})
		.state('blog.myarticle', {
			url: '/myarticle/:id',
			templateUrl: '/templates/myarticle.html',
			controller: 'MyarticleController'
		})
		.state('blog.writer', {
			url: '/writer/:id',
			views: {
				'write': {
					templateUrl: '/templates/writer.html',
					controller: 'WriterController'
				}
			}
		})
		.state('blog.manager', {
			url: '/manager',
			views: {
				'write': {
					templateUrl: '/templates/manager.html',
					controller: 'ManagerController'
				}
			}
		});

	$urlRouterProvider.otherwise('/blog/articleList');
	$locationProvider.html5Mode(true);
}]);