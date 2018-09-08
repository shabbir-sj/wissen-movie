
var _ = require('lodash/lodash');

var appHtmlObj = {
	options: {
		empty: true,
		spare: true
	},
	appHtmls: {
		files: [{
			expand: true,
			cwd: '<%= buildDir %>',
			src: ['**/**/*.html'],
			dest: "<%= buildDir %>"
		}]
	}
};

module.exports = function (grunt) {
	return _.extend({}, appHtmlObj);
};