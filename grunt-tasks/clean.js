
var _ = require('lodash/lodash');

var cleanNonMinified = {
	app: {
		files: [
			{ src: ['<%= buildDir %>/**/*.js', '!<%= buildDir %>/**/*.min.js'] },
			{ src: ['<%= buildDir %>/**/*.css', '!<%= buildDir %>/**/*.min.css'] }
		]
	}
};

module.exports = function (grunt) {
	return _.extend({}, cleanNonMinified);
};
