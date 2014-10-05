module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        jasmine: {
            src: 'insulate.js',
            options: {
                specs: 'test/SpecInsulate.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! insulate.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'insulate.js',
                dest: 'insulate.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jasmine', 'uglify']);
};