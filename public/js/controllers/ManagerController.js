angular.module('eBlog')
.controller('ManagerController', ['$scope', '$state', '$http',function($scope, $state, $http) {
	$scope.isAdmin = false;
	var account = window.prompt("输入账号", "");

	if(account == 'kebin') {
		var pwd = window.prompt("输入密码", "");
		if(pwd == 'kebin12345678') {
			$scope.isAdmin = true;
			initData();
		}
	} 

	$scope.delete = function(id) {
		$http.delete('/api/user/'+id).then(function(resp) {
			if(resp.data && resp.status && resp.status === 200) {
				for(var i=0,len=$scope.users.length;i<len;i++) {
					var item = $scope.users[i];

					if(item._id === id) {
						$scope.users.splice(i,1);
					}
				}
			}
		}, function(resp) {
			console.log('error:'+JSON.stringify(resp));
		});
	};

	$scope.addUser = function() {
		var username = $scope.username;
		var nickname = $scope.nickname;
		var password = $scope.password;

		$http.post('/register', {
			username: username,
			nickname: nickname,
			password: password,
			introduction: '世界很大，我想去看看!~',
			avatar: '/img/avatar-default.png'
		}).then(function(resp) {
			if (resp.data && resp.status && resp.status === 200) {
				initData();
				$scope.username = null;
				$scope.nickname = null;
				$scope.password = null;
			}
		}, function(resp) {
			console.log('error:' + JSON.stringify(resp));
		});
	};

	function initData() {
		$http.get('/api/user').then(function(resp) {
			if(resp.data && resp.status && resp.status === 200) {
				$scope.users = resp.data;
			}
		}, function(resp) {
			console.log('error:'+JSON.stringify(resp));
		});
	}
}]);