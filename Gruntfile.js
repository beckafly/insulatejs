module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        jasmine: {
            src: 'src/insulate.js',
            options: {
                specs: 'test/SpecInsulate.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! insulate.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/insulate.js',
                dest: 'dist/insulate.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jasmine', 'uglify']);
    grunt.registerTask('test', ['jasmine']);
};