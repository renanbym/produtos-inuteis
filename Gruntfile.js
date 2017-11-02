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

        ,watch : {
            js:  { files: 'web/app/**/*.js', tasks: [ 'injector' ] }
        }
    })

    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['injector', 'watch']);
}
