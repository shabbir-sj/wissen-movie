var _ = require('lodash/lodash');


var appConcatObj = {
	app: {
		files: [{
			src: ['<%= appFiles.js %>', '<%= buildDir %>/js/<%= appModuleTpls %>.js'],
			dest: '<%= buildDir %>/js/<%= appModuleName %>.<%= versionData.appJSversion %>.js'
		},
		{
			src: ['<%= appFiles.css %>'],
			dest: '<%= buildDir %>/css/<%= appModuleName %>.<%= versionData.appCSSversion %>.css'
		}]
	}
};


module.exports = function (grunt) {
	return _.extend({}, appConcatObj);
};
