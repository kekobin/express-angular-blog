angular.module('eBlog')
.controller('ArticleDetailController', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.goToList = function() {
		$state.go("home.articleList");
	}
}]);

