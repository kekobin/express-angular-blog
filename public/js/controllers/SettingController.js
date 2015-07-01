angular.module('eBlog')
	.controller('SettingController', ['$scope', '$state', '$http', 'userService','$rootScope','$timeout', function($scope, $state, $http, userService,$rootScope,$timeout) {
		var user = userService.get();
		$scope.nickname = user.nickname;
		$scope.introduction = user.introduction;
		$scope.avatar = user.avatar;

		var editor = new Simditor({
			textarea: $('#settingEditor'),
			upload: {
				'url': '/upload',
				'fileKey': 'upfile',
				'connectionCount': 1
			},
			pasteImage: true
		});

		var $imageToolBar = $('.setting .toolbar-item-image').parent();
		$imageToolBar.show();

		editor.on('valuechanged', function(e, src) {
			console.log("----valuechanged----");
			var value = editor.getValue();
			console.log(value);
			$('#uploadData').html(value);

			$timeout(function() {
				$scope.avatar = $('#uploadData img').attr('src');
			});
		});

		$scope.save = function() {
			var uData = {
				username: user.name,
				nickname: $scope.nickname,
				introduction: $scope.introduction,
				avatar: $scope.avatar,
				password: $scope.password
			};

			$http.post('/api/user/'+ user.id, {
				data: uData
			}).then(function(resp) {
				if(resp.data && resp.status && resp.status === 200) {
					var newUser = {
						id: user.id,
						name: user.name,
						nickname: resp.data.nickname,
						avatar: resp.data.avatar,
						introduction: resp.data.introduction
					};

					sessionStorage.setItem('user', JSON.stringify(newUser));

					$rootScope.user = newUser;
					userService.init(newUser);
					$state.go('home.articleList');
				}
			},function(resp) {
				console.log("---modify setting error--");
				console.log(resp);
			});
		};
	}]);