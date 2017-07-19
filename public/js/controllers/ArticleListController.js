angular.module('eBlog')
.controller('ArticleListController', ['$scope', '$state', '$http', 'userService', function($scope, $state, $http, userService) {
	$('.no-write').show();
	$('.home-write').hide();
	var url = '/blog/api/article';

	var user = userService.get();

	initData();

	$scope.goToDetail = function() {
		$state.go("blog.articleDetail");
	};

	$scope.write = function() {
		if(!user.name) {
			$state.go('blog.login');
		} else {
			$state.go('blog.writer');
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
			if(resp.data && resp.status && resp.status === 200) {
				$scope.articles = resp.data.reverse();
			}
		}, function(resp) {
			// console.log('----get articles successful----');
			// console.log(resp.data);
		});
	}

	function getDataByType(type) {
		url = type == '0' ? '/blog/api/article' : '/blog/api/article/t/'+type;

		initData();
	}
}]);

