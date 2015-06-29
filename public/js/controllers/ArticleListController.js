angular.module('eBlog')
.controller('ArticleListController', ['$scope', '$state', '$http', 'userService', function($scope, $state, $http, userService) {
	var url = '/api/article';

	var user = userService.get();

	initData();

	$scope.goToDetail = function() {
		$state.go("home.articleDetail");
	};

	$scope.write = function() {
		if(!user.name) {
			$state.go('home.login');
		} else {
			$state.go('writer');
		}
	};

	$('#sortNav>li').on('click', function() {
		var type = $(this).attr('data-type');

		$(this).addClass('active').siblings().removeClass('active');
		getDataByType(type);
	});

	$('#dropdown>a.first').addClass('active').siblings().removeClass('active');

	function initData() {
		$http.get(url).then(function(resp) {
			console.log('----get articles successful----');
			console.log(resp.data);
			if(resp.data && resp.status && resp.status === 200) {
				$scope.articles = resp.data;
			}
		}, function(resp) {
			console.log('----get articles successful----');
			console.log(resp.data);
		});
	}

	function getDataByType(type) {
		url = type == '0' ? '/api/article' : '/api/article/t/'+type;

		initData();
	}
}]);

