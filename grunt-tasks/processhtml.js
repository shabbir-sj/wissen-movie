
var _ = require('lodash/lodash');

var taskOptions = {
	options: {
		data: '<%= versionData %>'
	}
};

// App specific html process task obj for both admin and dtr.com. //
var appProcessHtmlObj = {
	dist: {
		files: [
			{
				src: './index.html',
				dest: '<%= buildDir %>/index.html'
			}
		]
	}
};

module.exports = function (grunt) {
	return _.extend({}, taskOptions, appProcessHtmlObj);
};
