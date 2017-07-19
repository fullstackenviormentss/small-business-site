var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('html', function() {
	return gulp.src(['src/html/pages/*.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./dist/html/'))
});


gulp.task('index', function() {
	return gulp.src(['src/html/pages/index.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/html/pages/index.html', ['index']); 
    gulp.watch('src/html/**/*.html', ['html']);
});

gulp.task('default', ['sass', 'index', 'html']);