
var _ = require('lodash/lodash');


var appCssMinObj = {
	options: {
		keepSpecialComments: 0
	},
	app: {
		files: [
			{
				src: '<%= buildDir %>/css/<%= appModuleName %>.<%= versionData.appCSSversion %>.css',
				dest: '<%= buildDir %>/css/<%= appModuleName %>.<%= versionData.appCSSversion %>.min.css'
			}
		]
	}
};

module.exports = function (grunt) {
	return _.extend({}, appCssMinObj);
};