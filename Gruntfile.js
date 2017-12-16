module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/lib/*.js', 'public/**/*.js'],
                dest: 'public/dist/built.js'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },

        nodemon: {
            dev: {
                script: 'index.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'public/dist/output.min.js': ['public/dist/built.js']
                }
            }
        },

        eslint: {
            target: [
                // Add list of files to lint here
                'app/**/*.js', 
                'lib/**/*.js', 
                'public/client/**/*.js', 
                'shortly.js', 
                'index.js'
            ]
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/dist/output.css': ['public/style.css']
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'public/client/**/*.js',
                    'public/lib/**/*.js',
                ],
                tasks: [
                    'concat',
                    'uglify'
                ]
            },
            css: {
                files: 'public/*.css',
                tasks: ['cssmin']
            }
        },

        shell: {
            prodServer: {
                command: 'node index.js'
            }
        },

        env: {
            dev: {
                NODE_ENV: 'development',
            },
        },

        gitpush: {
            your_target: {
                options: {
                    remote: 'live'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('server-dev', function (target) {
        grunt.task.run(['nodemon', 'watch']);
    });

    ////////////////////////////////////////////////////
    // Main grunt tasks
    ////////////////////////////////////////////////////

    grunt.registerTask('test', [
        'mochaTest'
    ]);

    grunt.registerTask('gitPush', ['gitpush']);

    grunt.registerTask('prodServer', ['shell']);

    grunt.registerTask('build', ['test', 'eslint', 'concat', 'uglify', 'cssmin']);

    grunt.registerTask('lint', ['eslint']);

    grunt.registerTask('upload', function (n) {
        if (grunt.option('prod')) {
            // add your production server task here
            grunt.task.run(['prodServer']);
        } else {
            grunt.task.run(['server-dev']);
        }
    });

    grunt.registerTask('deploy', function (n) {
        if (grunt.option('prod')) {
            grunt.task.run(['gitPush']);
        } else {
            grunt.task.run(['env', 'server-dev']);
        }
    });

};
