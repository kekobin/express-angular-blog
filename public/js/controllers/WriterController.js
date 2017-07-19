angular.module('eBlog')
	.controller('WriterController', ['$scope', '$state', '$http', 'userService', '$stateParams', 'articleService', '$timeout',
		function($scope, $state, $http, userService, $stateParams, articleService, $timeout) {
			$('.no-write').hide();
			$('.home-write').show();

			var articleType = $('#navList>li.active').attr('data-type');
			var height = parseInt($(window).height()) - 22;
			var simditorBodyHeight = height - 154;
			var editor = new Simditor({
				textarea: $('#editor'),
				upload: {
					'url': '/blog/upload',
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
				var value = editor.getValue();
				var title = $scope.title;

				if(!title || !value) {
					$('.write-tip').fadeIn('slow');
					setTimeout(function() {
						$('.write-tip').fadeOut('slow');
					}, 2500);

					return;
				}

				var article = {
					uid: $scope.user.id,
					user: {
				        id:$scope.user.id,
				        username: $scope.user.name,
				        nickname: $scope.user.nickname,
				        avatar:$scope.user.avatar,
				        introduction:$scope.user.introduction
				    },
					title: title,
					content: value,
					type: articleType,
					time: new Date().getTime(),
					pv: 0,
					comment: []
				};

				$http.post('/blog/api/article', {
					data: article
				}).then(function(resp) {
					$state.go('blog.mypage', {
						id: $scope.user.id
					});
				}, function(resp) {
					console.log('----publish article error----');
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
					var value = editor.getValue();
					var title = $scope.title;

					if(!title || !value) {
						$('.write-tip').fadeIn('slow');
						setTimeout(function() {
							$('.write-tip').fadeOut('slow');
						}, 2500);

						return;
					}

					var articleType = $('#navList>li.active').attr('data-type');
					var newData = {
						uid: article.user.id,
						user: {
					        id:article.user.id,
					        username: article.user.username,
					        nickname: article.user.nickname,
					        avatar: article.user.avatar,
					        introduction: article.user.introduction
					    },
						title: title,
						content: value,
						type: articleType,
						time: new Date().getTime(),
						pv: article.pv,
						comment: article.comment
					};

					$http.put('/blog/api/article/' + article._id, {
						data: newData
					}).then(function(resp) {
						$state.go('blog.mypage', {
							id: $scope.user.id
						});
					}, function(resp) {
						console.log('----update article error----');
						console.log(resp);
					});
				}
			}
		}
	]);