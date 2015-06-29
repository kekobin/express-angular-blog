angular.module('eBlog')
.filter('timeFilter', function() {
	var minSplit = 60*1000;
	var hourSplit = 60*minSplit;
	var daySplit = 24*hourSplit;
	var timeString = '';

	return function(time) {
		var date = new Date().getTime();
		time = parseInt(time);

		var gap = date - time;
		var day = gap / daySplit;
		var hour = gap / hourSplit;
		var minute = gap / minSplit;

		if(day >= 20) {
			timeString = '20天';
		} else if(day >= 1) {
			timeString = Math.ceil(day) + '天';
		} else if(hour >= 1) {
			timeString = Math.ceil(hour) + '小时';
		} else if(minute >= 1) {
			timeString = Math.ceil(minute) + '分钟';
		} else {
			timeString = '1分钟';
		}

		return timeString;
	};
});