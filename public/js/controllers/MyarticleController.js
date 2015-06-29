angular.module('eBlog')
.controller('MyarticleController', ['$scope', '$state','$http','$stateParams', 'userService','articleService',
function($scope, $state,$http,$stateParams,userService,articleService) {
	var id = $stateParams.id;
	var article;

	$scope.user = userService.getName();

	init();

	$scope.modify = function(id) {
		articleService.set(article);
		$state.go('writer', {
			id: id
		});
	};

	$scope.delete = function(id) {
		$http.delete('/api/article/'+id).then(function(resp) {
			console.log('----delete article successful----');
			console.log(resp.data);

			if(resp.data && resp.status && resp.status === 200) {
				$state.go('home.articleList');
			}
		}, function(resp) {
			console.log('----delete article successful----');
			console.log(resp.data);
		});
	};

	function init() {
		$http.get('/api/article/d/'+id).then(function(resp) {
			console.log('----get user 1 detail article successful----');
			console.log(resp.data);

			if(resp.data && resp.status && resp.status === 200) {
				article = resp.data;

				var d = new Date(parseInt(resp.data.time));
				resp.data.time = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();

				$scope.article = resp.data;

				$('#showContent').html($scope.article.content);
			}
		}, function(resp) {
			console.log('----get user 1 detail article successful----');
			console.log(resp.data);
		});
	}
}]);

