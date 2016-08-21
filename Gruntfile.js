module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            build: {
                src: ['src/style1.less', 'src/style2.less'],
                dest: 'build/styles.css'
            }
        },

        csslint: {
            check: {
                src: '<%= less.build.dest %>'
            }
        },

        cssmin: {
            minimize: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'build/styles.min.css': '<%= less.build.dest %>'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            files: 'src/*.less',
            tasks: ['less', 'csslint', 'cssmin']
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: 'localhost'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['less', 'csslint', 'cssmin', 'connect', 'watch']);

};