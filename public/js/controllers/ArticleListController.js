angular.module('eBlog')
.controller('ArticleListController', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.goToDetail = function() {
		$state.go("home.articleDetail");
	}
}]);

