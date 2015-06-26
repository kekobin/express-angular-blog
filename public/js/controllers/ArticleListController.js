angular.module('eBlog')
.controller('ArticleListController', ['$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
	console.log($stateParams)
	$scope.user = $stateParams.user;
	console.log($scope.user);
	$scope.goToDetail = function() {
		$state.go("home.articleDetail");
	}
}]);

