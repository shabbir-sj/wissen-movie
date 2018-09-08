
var _versionData = {
	libsJSversion: '1',
	libsCSSversion: '1',
	appJSversion: '1',
	appCSSversion: '1'
};

module.exports = function(grunt) {
	var path = require('path');

	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'grunt-tasks'),
		data: {

			versionData: _versionData,
			pkg: grunt.file.readJSON('package.json'),
			ignoreNodeModules: '!node_modules/**/*',
			ignoreGruntFile: '!**/Gruntfile.js',
			ignoreDist: ['!dist/**/*'],


			ignore: ['<%= ignoreNodeModules %>', '<%= ignoreGruntFile %>', '<%= ignoreDist %>'],
			buildDir: 'dist',


			appModulePrefix: 'site-app-',
			appModuleName: '<%= appModulePrefix %><%= pkg.version %>',
			appModuleTpls: '<%= appModulePrefix %>tpls-<%= pkg.version %>',

			appFiles: appFiles
		}
	});

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'copy', 'clean', 'processhtml', 'minifyHtml']);
};


var appFiles = {

	js: [
		"src/utils.js",
		"src/services/http.js",
		"src/services/paginator.js",
		"src/services/movie-model.js",
		"src/services/movie-service.js",
		"src/components/theme.js",
		"src/components/pagination.js",
		"src/controllers/movielist-controller.js"
	],
	css: [
		"css/app.css",
		"css/list.css",
		"css/pagination.css"
	]
};
