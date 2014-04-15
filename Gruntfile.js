/*
 * grunt-wrap-define
 * https://github.com/ixtli/grunt-wrap-define
 *
 * Copyright (c) 2014 Chris Galardi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    wrapDefine: {
      options: {
        dependencies: [
          'jquery',
          {
            name: 'foo',
            extern: 'bar'
          }
        ]
      },
      test: {
        expand: true,
        cwd: 'test/input',
        src: ['*.js'],
        dest: 'test/output'
      }
    },

    // Unit tests.
    simplemocha: { test: 'test/test.js' }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-simple-mocha");
  grunt.loadNpmTasks("grunt-contrib-clean");

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'wrapDefine', 'simplemocha', 'clean']);

};
