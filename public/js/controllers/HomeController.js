angular.module('eBlog')
	.controller('HomeController', ['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
		$scope.signIn = function() {
			$state.go('login');
		};

		$scope.regist = function() {
			$state.go('register');
		};
		
		var userDrop = $('#userDropDown');
		$('#userAvatar').on('click', function(e) {
			e.stopPropagation();
			userDrop.toggle();
		});

		$(window).on('click', function() {
			if (userDrop.css('display') != 'none') {
				userDrop.hide();
			}
		});
	}]);