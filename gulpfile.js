var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    newer = require('gulp-newer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8888/markdown"
    });
});

gulp.task('sass', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sass({
        outputStyle:'compressed',
        includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
     }))
    .pipe(gulp.dest('./css'));

});

gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('scss/*.scss', ['sass']).on("change", browserSync.reload);
    gulp.watch('scss/**/*.scss', ['sass']).on("change", browserSync.reload);
    gulp.watch('js/dev/*.js', ['js']).on("change", browserSync.reload);
});

var jsInput = {
    js: 'js/dev/**/*.js'
}

var jsOutput = 'js/dist/';


gulp.task('js', function(){
  return gulp.src(jsInput.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/dist/'))
});

//gulp.task('default', ['styles', 'images']);

gulp.task('default',['sass', 'browser-sync', 'watch', 'js']);
