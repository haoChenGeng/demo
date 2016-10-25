//定义依赖和插件
var gulp = require('gulp'),
  connect = require('gulp-connect'); //livereload

//定义名为js的任务
/* gulp.task('js', function() {

   gulp.src(jsSrc)
       .pipe(concat('main.js'))
       .pipe(gulp.dest(jsDist))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(gulp.dest(jsDist))
       .pipe(connect.reload())

});*/

//定义html任务
gulp.task('html', function() {

  gulp.src('html/*.html')
    .pipe(connect.reload());

});

//定义livereload任务
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});


//定义看守任务
gulp.task('watch', function() {

  gulp.watch('html/*.html', ['html']);

  gulp.watch('js/*.js', ['js']);

});


//定义默认任务
gulp.task('default', ['html', 'watch', 'connect']);