angular.module('eBlog')
.controller('HomeController', ['$scope', '$state', '$http','$timeout', function($scope, $state, $http,$timeout) {
	$scope.signIn = function() {
		$state.go('login');
	};

	$scope.regist = function() {
		$state.go('register');
	};

	$scope.logout = function() {
		$http.get('/logout').then(function(resp) {
			//refresh current page.
			$timeout(function() {
				location.reload();
			}, 200);
		});
	};

	var userDrop = $('#userDropDown');
	$('#userAvatar').on('click', function(e) {
		e.stopPropagation();
		userDrop.toggle();
	});

	$('body').on('click', function() {
		if(userDrop.css('display') != 'none') {
			userDrop.hide();
		}
	});
}]);

