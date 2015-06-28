angular.module('eBlog')
	.controller('WriterController', ['$scope', '$state', '$http', 'userService', function($scope, $state, $http, userService) {
		var articleType = $('#navList>li.active').attr('data-type');
		var height = parseInt($(window).height()) - 22;
		var simditorBodyHeight = height - 154;
		var editor = new Simditor({
			textarea: $('#editor')
		});

		$('.js-height').height(height);
		$('.simditor-body').css('height', simditorBodyHeight);

		$('#navList>li').on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
			articleType = $(this).attr('data-type');
		});

		$scope.logout = function() {
			$http.get('/logout').then(function(resp) {
				//refresh current page.
				$timeout(function() {
					location.reload();
				}, 200);
			});
		};

		$scope.publish = function() {
			var article = {
				// user: userService.get().username,
				user: 'kebin',
				title: $scope.title,
				content: editor.getValue(),
				type: articleType,
				time: new Date().getTime()
			};

			// console.log(article);
			$http.post('/api/article', {
				user: 'kebin',
				title: $scope.title,
				content: editor.getValue(),
				type: articleType,
				time: new Date().getTime()
			}).then(function(resp) {
				console.log('----successful----');
				console.log(resp);
				$state.go('home.mypage');
			}, function(resp) {
				console.log('----error----');
				console.log(resp);
			});
		};
	}]);