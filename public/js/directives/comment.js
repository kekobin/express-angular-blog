angular.module('eBlog')
	.directive('comment', function() {
		return {
			scope: {
				publish: '&',
				message: '='
			},
			restrict: 'ECMA',
			templateUrl: '../../templates/comment.html',
			replace: true,
			link: function(scope, element, attrs) {
				scope.pub = function() {
					scope.publish();
				};

				scope.myKeyup = function(e) {
					var keycode = window.event ? e.keyCode : e.which;
					if (keycode == 13 && e.ctrlKey) {
						scope.publish();
					}
				};
			}
		};
	});