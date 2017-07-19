angular.module('eBlog')
.controller('MypageController', ['$scope', '$state','$http', 'userService','$stateParams', function($scope, $state,$http,userService,$stateParams) {
	$('.no-write').show();
		$('.home-write').hide();
	$scope.user = userService.get();
	var id = $stateParams.id;

	init();

	$scope.goDetail = function(id) {
		$state.go('blog.myarticle', {
			id: id
		});
	};

	function init() {
		$http.get('/blog/api/user/'+id).then(function(resp) {
			if(resp.data && resp.status && resp.status === 200) {
				$scope.articleUser = resp.data;
			}
		}, function(resp) {
			console.log('----get user error----');
			console.log(resp.data);
		});

		$http.get('/blog/api/article/'+id).then(function(resp) {
			if(resp.data && resp.status && resp.status === 200) {
				$scope.articles = resp.data;
			}
		}, function(resp) {
			console.log('----get user articles error----');
			console.log(resp.data);
		});

		if($scope.user.id == id)
			$('#dropdown .third').addClass('active').siblings().removeClass('active');
	}
}]);

