var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');

gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['sass'], function() {
    var sassWatcher = gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('html', function() {
	return gulp.src(['src/html/pages/*.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./dist/html/'))
});