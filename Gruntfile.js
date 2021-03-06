'use strict';

process.env.PHANTOMJS_EXECUTABLE = process.env.PHANTOMJS_EXECUTABLE || '/usr/local/opt/nvm/v0.10.26/bin/phantomjs';
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-casper');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-mongoimport');
    grunt.loadNpmTasks('grunt-notify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        notify: {
            server: {
                options: {
                    message: 'Server is ready'
                }
            },
            express: {
                options: {
                    message: 'express is ready'
                }
            },
            watch: {
                options: {
                    message: 'watch'
                }
            }
        },

        mongoimport: {
            options: {
                db: 'oaa',
                //maybe more needed

                collections: [
                    {
                    name: 'users',
                    type: 'json',
                    file: 'db/seeds/users.json',
                    jsonArray: true,
                    upsert: true,
                    drop: true
                },

                {
                    name: 'meetings',
                    type: 'json',
                    file: 'db/seeds/meetings.json',
                    jsonArray: true,
                    upsert: true,
                    drop: true
                }
                ]
            }
        },
        clean: {
            build: ['build'],
            dev: {
                src: ['build/**/*']
            },
            prod: ['dist']
        },

        copy: {
            prod: {
                expand: true,
                cwd: 'app/assets',
                src: ['css/*.css', '*.html', 'images/**/*' ],
                dest: 'build/',
                flatten: true,
                filter: 'isFile'
            },
            dev: {
                expand: true,
                cwd: 'app/assets',
                src: ['css/*.css', '*.html', 'images/**/*' ],
                dest: 'build/',
                flatten: false,
                filter: 'isFile'
            }
        },

        browserify: {
            prod: {
                src: ['app/assets/js/*.js'],
                dest: 'dist/browser.js',
                options: {
                    transform: ['debowerify', 'hbsfy'],
                    debug: false
                }
            },
            dev: {
                src: ['app/assets/js/*.js'],
                dest: 'build/browser.js',
                options: {
                    transform: ['debowerify', 'hbsfy'],
                    debug: true
                }
            }
        },

        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'server.js'
                }
            }
        },
        simplemocha: {
            dev:{
                src:['test/*_test.js','!test/acceptance/*_test.js'],
                options:{
                    reporter: 'spec',
                    slow: 200,
                    timeout: 1000
                }
            }
        },
        watch: {
            all: {
                files:['server.js', '**/*.js' ],
                tasks:['jshint']
            },
            express: {
                files:  [ 'server.js','models/**/*.js','routes/**/*.js','app/assets/**/*' ],
                tasks:  [ 'sass:dev', 'browserify:dev', 'express:dev' ],
                options: {
                    // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions.
                    // Without this option specified express won't be reloaded
                    spawn: false
                }
            }
        },
        casper: {
            acceptance : {
                options : {
                    test : true
                },
                files : {
                    'test/acceptance/casper-results.xml' : ['test/acceptance/*_test.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'server.js', 'models/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: true,
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        sass: {
            dist: {
                files: {'build/css/styles.css': 'app/assets/scss/styles.scss'}
            },
            dev: {
                options: {
                    includePaths: {
                        options: {
                            'includePaths': ['public/scss/'],
                        }
                    }
                },
                files: {'build/css/styles.css': 'app/assets/scss/styles.scss'}
           }
        }
    });

    grunt.registerTask('build:dev',  ['clean:dev', 'sass:dev', 'browserify:dev', 'jshint:all', 'copy:dev']);
    grunt.registerTask('build:prod', ['clean:prod', 'browserify:prod', 'jshint:all', 'copy:prod']);
    grunt.registerTask('test', ['jshint', 'simplemocha:dev']);
    grunt.registerTask('server', [ 'build:dev', 'express:dev','watch:express', 'notify' ]);
    grunt.registerTask('test:acceptance',['express:dev','casper']);
    grunt.registerTask('default', ['jshint', 'test','watch:express']);

};
