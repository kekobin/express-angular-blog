angular.module('eBlog')
	.factory('utilService', function() {
		return {
			formatTime: function(time) {
				var d = new Date(parseInt(time));
				return (d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes());
			}
		}
	});