angular.module('eBlog')
.controller('MypageController', ['$scope', '$state','$http', 'userService', function($scope, $state,$http,userService) {
	var uid = userService.getId();

	init();

	$scope.goDetail = function(id) {
		$state.go('home.myarticle', {
			id: id
		});
	};

	function init() {
		$http.get('/api/article/'+uid).then(function(resp) {
			console.log('----get user articles successful----');
			console.log(resp.data);
			if(resp.data && resp.status && resp.status === 200) {
				$scope.articles = resp.data;
			}
		}, function(resp) {
			console.log('----get user articles error----');
			console.log(resp.data);
		});

		$('#dropdown .third').addClass('active').siblings().removeClass('active');
	}
}]);

