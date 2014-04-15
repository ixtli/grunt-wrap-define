/*
 * grunt-wrap-define
 * https://github.com/ixtli/grunt-wrap-define
 *
 * Copyright (c) 2014 Chris Galardi
 * Licensed under the MIT license.
 */

'use strict';

var description = require('../package.json').description;

module.exports = function(grunt)
{

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('wrapDefine', description, function()
	{
		// Merge task-specific and/or target-specific options with these defaults.
		var dependencies = this.options.dependencies;

		if (!dependencies)
		{
			grunt.log.error('No dependencies.');
			return;
		}

		var preamble = 'define([';
		var interstice = '], function(';
		var afterward = ') {\n';
		var fileEnding = '\n});\n';
		var quote = '\'';
		var typeOfString = typeof 'foo';

		var count = dependencies.length;
		var name, extern;
		for (var i = 0; i < count; i++)
		{
			if (typeof deps[i] === typeOfString)
			{
				name = extern = deps[i];
			} else {
				name = deps[i].name;
				extern = deps[i].extern;
			}

			preamble = premable + quote + name + quote;
			interstice = interstice + quote + extern + quote;

			if (i < count - 1)
			{
				premable += ',';
				interstice += ',';
			}
		}

		var fileOpening = premable + interstice + afterward;

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(options.separator));

			// Handle options.
			src = fileOpening + src + fileEnding;

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
