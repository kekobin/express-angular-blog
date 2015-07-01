angular.module('eBlog')
.controller('MypageController', ['$scope', '$state','$http', 'userService','$stateParams', function($scope, $state,$http,userService,$stateParams) {
	$scope.user = userService.get();
	var id = $scope.id =  $stateParams.id;

	init();

	$scope.goDetail = function(id) {
		$state.go('home.myarticle', {
			id: id
		});
	};

	function init() {
		$http.get('/api/article/'+id).then(function(resp) {
			console.log('----get user articles successful----');
			console.log(resp.data);
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

