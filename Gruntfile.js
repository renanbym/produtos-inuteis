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
            csss : {
                options : { style : 'compressed' },
                files : {
                    'web/styles/style.css' : ['web/scss/app/*.scss', 'web/scss/app/pages/*.scss']
                }
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
