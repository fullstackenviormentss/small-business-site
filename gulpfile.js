var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('app/src/stylesheets/*.scss')
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['sass'], function() {
    var sassWatcher = gulp.watch('app/src/stylesheets/**/*.scss', ['sass']);
});
