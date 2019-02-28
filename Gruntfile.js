'use strict';

let banner = '/*!\n' +
  '*  @license painter-render v<%= pkg.version %>\n' +
  '* (c) 2019 yelloxing <%= pkg.repository.url %>\n' +
  '* License: <%= pkg.license %>\n' +
  '*/\n';

// 打包文件
const source = [

  "src/tool.js",
  "src/layer.js"

];

module.exports = function (grunt) {

  // 独立配置文件
  const jshint_options = grunt.file.readJSON('jshint.json');

  /*配置插件*/
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    insert: { // 合并插入
      options: {
        banner: banner,
        link: ""
      },
      target: {
        options: {
          separator: '// @CODE build.js inserts compiled painter-render here',
          target: 'src/core.js'
        },
        files: {
          'build/<%= pkg.name %>.js': source
        }
      }
    },
    jshint: { //语法检查
      options: jshint_options,
      target: 'build/<%= pkg.name %>.js'
    },
    uglify: { //压缩代码
      options: {
        banner: banner
      },
      target: {
        options: {
          mangle: true
        },
        files: [{
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
        }]
      }
    }
  });

  /*加载插件*/
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-plug-insert');

  /*注册任务*/
  grunt.registerTask('release', ['insert:target', 'jshint:target', 'uglify:target']);
};
