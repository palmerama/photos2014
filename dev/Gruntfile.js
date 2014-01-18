/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://wehaverhythm.com/; */'
      },

    concat: {
      dist: {
        src: ['<banner:meta.banner>'
              , 'libs/misc/Function.prototype.bind.js'
              , 'libs/misc/jquery.hotkeys.js'
              , 'libs/misc/keyBinding.js'
              , 'libs/misc/hashchange.js'
              , 'rhythm/utils/Tools.js'
              , 'rhythm/app/Main.js'
              , 'rhythm/utils/JSAddress.js'
              , 'rhythm/app/AppManager.js'
              , 'rhythm/app/Init.js'

        ], dest: 'bin/<%=pkg.name%>_<%=pkg.version%>_uncompressed.js'
      }
    },

    removelogging: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest %>',

        options: {
          // see below for options. this is optional.
        }
      }
    },

    uglify: {
      options: {
        mangle: true,
        //report: 'gzip',
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

      my_target: {
        files: {
          '../www/js/<%=pkg.name%>_<%=pkg.version%>.min.js': ['<%= removelogging.dist.dest %>']
        }
      }
    },

  //http://www.jshint.com/docs/#options
    jshint: {
      files: ['gruntfile.js', 'rhythm/**/*.js'],
      options: {
        // options here to override JSHint defaults
        asi:true, // supress missing semi-colon.
        smarttabs: true, // supress mixed tabs/spaces
        laxcomma:true,
        curly: true,
        eqeqeq: true,
        unused: false,

        globals: {
          module: true,
          document: true,
          $: true, 
          Debug:true, 
          RHYTHM:true, 
          requestAnimFrame:true, 
          self:true, 
          io:true, 
          CanvasRenderingContext2D:true, 
          escape:true, 
          unescape:true, 
          jQuery: true, 
          console:true, 
          Modernizr:true, 
          alert:true, 
          swfobject:true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-remove-logging");

  // Default task.
  //grunt.registerTask('default', ['jshint', 'concat', 'uglify']);//'removelogging'
  grunt.registerTask('default', ['concat', 'uglify']);
};
