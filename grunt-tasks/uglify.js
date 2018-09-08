
var _ = require('lodash/lodash');


var appUglifyObj = {
	options: {
		ASCIIOnly: true
	},

	app: {
		files: [{
			src: '<%= buildDir %>/js/<%= appModuleName %>.<%= versionData.appJSversion %>.js',
			dest: '<%= buildDir %>/js/<%= appModuleName %>.<%= versionData.appJSversion %>.min.js'
		}]
	}
};


module.exports = function (grunt) {
	return _.extend({}, appUglifyObj);
};