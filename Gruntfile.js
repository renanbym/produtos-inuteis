module.exports = function(grunt) {

    grunt.initConfig({
        injector: {
            options: {},
            local_dependencies: {
                files: {
                    'web/index.ejs': [
                        'web/app/**/*.module.js'
                        ,'web/app/app.js'
                        ,'web/app/theme/**/*.js'
                        ,'web/app/pages/**/*.js'
                    ]
                }
            }
        }

        ,sass : {
            css: {
                files: [{
                    expand: true,
                    cwd: 'web/scss/',
                    src: ['**/*.scss'],
                    dest: 'web/styles/',
                    ext: '.css'
                }]
            }
        }


        ,watch : {
            js:  { files: 'web/app/**/*.js', tasks: [ 'injector' ] }
            ,css:  { files: 'web/scss/app/**/*.scss', tasks: [ 'sass' ] }
        }

    })

    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default',['injector', 'sass', 'watch']);
}
