angular.module('eBlog')
	.controller('MyarticleController', ['$scope', '$state', '$http', '$stateParams', 'userService', 'articleService', 'utilService',
		function($scope, $state, $http, $stateParams, userService, articleService, utilService) {
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
				$http.delete('/api/article/' + id).then(function(resp) {
					console.log('----delete article successful----');
					console.log(resp.data);

					if (resp.data && resp.status && resp.status === 200) {
						$state.go('home.articleList');
					}
				}, function(resp) {
					console.log('----delete article successful----');
					console.log(resp.data);
				});
			};

			$scope.publish = function() {
				var time = new Date().getTime();
				var date = utilService.formatTime(time);
				var comment = {
					cid: time,
					cuser: userService.get(),
					tuser: {
						id: article.uid,
						name: article.username,
						nickname: article.nickname,
						avatar: article.avatar,
						introduction: article.introduction
					},
					message: $scope.message,
					time: date,
					reply: []
				};

				article.comment.push(comment);

				saveCommentToDb();
			};

			$scope.reply = function(id,e) {
				var $reply = $(e.target).parent().parent().find('.reply-input');
				$reply.show();

				$scope.myKeyup = function(e) {
					var keycode = window.event ? e.keyCode : e.which;
					if (keycode == 13) {
						var time = new Date().getTime();
						var date = utilService.formatTime(time);
						var $target = $(e.target);
						var comment = getTargetComment(id);
						var reply = {
							rid: time,
							time: date,
							user: userService.get(),
							message: $target.val()
						};

						comment.reply.push(reply);
						saveCommentToDb();
						$target.parent().hide();
						$target.val('');
					}
				};
			};

			$scope.deleteComment = function(id) {
				for(var i=0,len=article.comment.length;i<len;i++) {
					var item = article.comment[i];
					if(item.cid === id) {
						article.comment.splice(i,1);
						saveCommentToDb();
						break;
					}
				}
			};

			$scope.deleteReply = function(cid, rid) {
				var reply;
				for(var i=0,len=article.comment.length;i<len;i++) {
					var item = article.comment[i];
					if(item.cid === cid) {
						reply = item.reply;
						break;
					}
				}

				if(reply.length !== 0) {
					for(var i=0,len=reply.length;i<len;i++) {
						var item = reply[i];
						if(item.rid === rid) {
							reply.splice(i,1);
							saveCommentToDb();
							break;
						}
					}
				}
			};

			function getTargetComment(id) {
				var time = new Date().getTime();
				var date = utilService.formatTime(time);
				var targetComment;
				for(var i=0,len=article.comment.length;i<len;i++) {
					var item = article.comment[i];
					if(item.cid === id) {
						targetComment = item;
						break;
					}
				}

				return targetComment;
			}

			function init() {
				$http.get('/api/article/d/' + id).then(function(resp) {
					console.log('----get user 1 detail article successful----');
					console.log(resp.data);

					if (resp.data && resp.status && resp.status === 200) {
						article = resp.data;

						$scope.articleTime = utilService.formatTime(resp.data.time);

						$scope.article = resp.data;

						$('#showContent').html($scope.article.content);
					}
				}, function(resp) {
					console.log('----get user 1 detail article error----');
					console.log(resp.data);
				});

				$('#dropdown>a.first').addClass('active').siblings().removeClass('active');
			}

			function saveCommentToDb() {
				var newData = {
					uid:article.user.id,
					user: {
				        id:article.user.id,
				        username: article.user.name,
				        nickname: article.user.nickname,
				        avatar: article.user.avatar,
				        introduction: article.user.introduction
				    },
					title: article.title,
					content: article.content,
					type: article.type,
					time: article.time,
					pv: article.pv,
					comment: article.comment
				};

				$http.put('/api/article/' + article._id, {
					data: newData
				}).then(function(resp) {
					console.log('----successful----');
					console.log(resp);

					$scope.message = '';
				}, function(resp) {
					console.log('----error----');
					console.log(resp);
				});
			}
		}
	]);