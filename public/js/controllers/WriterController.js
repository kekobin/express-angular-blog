angular.module('eBlog')
	.controller('WriterController', ['$scope', '$state', '$http', 'userService', '$stateParams', 'articleService', '$timeout',
		function($scope, $state, $http, userService, $stateParams, articleService, $timeout) {
			var articleType = $('#navList>li.active').attr('data-type');
			var height = parseInt($(window).height()) - 22;
			var simditorBodyHeight = height - 154;
			var editor = new Simditor({
				textarea: $('#editor'),
				upload: {
					'url': '/upload',
					'fileKey': 'upfile',
					'connectionCount': 1
				},
				pasteImage: true
			});

			$scope.user = userService.get();

			$('.js-height').height(height);
			$('.simditor-body').css('height', simditorBodyHeight);

			$('#navList>li').on('click', function() {
				$(this).addClass('active').siblings().removeClass('active');
				articleType = $(this).attr('data-type');
			});

			$scope.publish = function() {
				var article = {
					uid: $scope.user.id,
					user: {
				        id:$scope.user.id,
				        username: $scope.user.name,
				        nickname: $scope.user.nickname,
				        avatar:$scope.user.avatar,
				        introduction:$scope.user.introduction
				    },
					title: $scope.title,
					content: editor.getValue(),
					type: articleType,
					time: new Date().getTime(),
					pv: 0,
					comment: []
				};

				console.log(">>>article data>>>>>" + JSON.stringify(article));

				$http.post('/api/article', {
					data: article
				}).then(function(resp) {
					console.log('----successful----');
					console.log(resp);
					$state.go('home.mypage', {
						id: $scope.user.id
					});
				}, function(resp) {
					console.log('----error----');
					console.log(resp);
				});
			};

			//edit model
			$scope.aid = $stateParams.id;

			if ($scope.aid) {
				editArticle();
			}

			function editArticle() {
				var article = articleService.get();
				$('#navList>li[data-type=' + article.type + ']').addClass('active').siblings().removeClass('active');
				$scope.title = article.title;
				$('.simditor-body').html(article.content);

				$scope.update = function() {
					update();
				};

				function update() {
					var articleType = $('#navList>li.active').attr('data-type');
					var newData = {
						uid: article.user.id,
						user: {
					        id:article.user.id,
					        username: article.user.name,
					        nickname: article.user.nickname,
					        avatar: article.user.avatar,
					        introduction: article.user.introduction
					    },
						title: $scope.title,
						content: editor.getValue(),
						type: articleType,
						time: new Date().getTime(),
						pv: article.pv,
						comment: article.comment
					};

					$http.put('/api/article/' + article._id, {
						data: newData
					}).then(function(resp) {
						console.log('----successful----');
						console.log(resp);
						$state.go('home.mypage', {
							id: $scope.user.id
						});
					}, function(resp) {
						console.log('----error----');
						console.log(resp);
					});
				}
			}
		}
	]);