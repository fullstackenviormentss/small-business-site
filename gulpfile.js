// include plugins 
// _____________________________________________ 

var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
 
// set tasks
// _____________________________________________ 

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(gulp.dest('src/css/'));
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

gulp.task('minify-css', function () {
    gulp.src('src/css/*.css') 
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('minify-js', function () {
    gulp.src('src/js/*.js') 
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/html/pages/index.html', ['index']); 
    gulp.watch('src/html/**/*.html', ['html']);
    gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/js/*.js', ['minify-js']);
});

gulp.task('default', ['sass', 'index', 'html', 'minify-css', 'minify-js', 'watch']);