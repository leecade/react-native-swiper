module.exports = function(grunt) {
  var pkg = require('./package.json');

  grunt.initConfig({
    shell: { // grunt-shell-spawn
      options: {
        stdout: true,
        stderr: true
      },
      mocha: {
        command: './node_modules/.bin/mocha --reporter spec test/**/*.js',
      }
    }
  });


  grunt.loadNpmTasks('grunt-shell-spawn');

  grunt.registerTask('test', ['shell:mocha']);
};
