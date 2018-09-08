
var _ = require('lodash/lodash');

var appCopyObj = {
	appHtmls: {
		files: [{
			expand: true,
			cwd: 'src/',
			src: ['**/*.html', '!**/index.html'],
			dest: "<%= buildDir %>/src/"
		},
		{
			expand: true,
			src: ['resources/images/**/*'],
			dest: "<%= buildDir %>"
		}]
	}
};

module.exports = function (grunt) {
	return _.extend({}, appCopyObj);
};



