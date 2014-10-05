module.exports = function(grunt) {
       'use strict';
       // Project configuration.
       grunt.initConfig({
               jasmine : {
                       src : 'insulate.js',
                       options : {
                               specs : 'test/SpecInsulate.js'
                       }
               }
       });
       grunt.loadNpmTasks('grunt-contrib-jasmine');
};