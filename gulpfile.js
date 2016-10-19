var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
 
gulp.task('imagemin', function () {
    gulp.src('pages/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('test',function() {
    console.log('it works');
});