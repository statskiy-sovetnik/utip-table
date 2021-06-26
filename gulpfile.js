var gulp = require('gulp'),
	{ series, parallel, watch } = require('gulp'),
	sass = require('gulp-sass'),
	browserify = require('browserify'),
	browserSync = require('browser-sync').create(),
    source = require('vinyl-source-stream'),
	prefix = require('gulp-autoprefixer');

sass.compiler = require('sass');

const js_entry = 'src/js/index.js';
const css_entry = 'src/sass/app.scss';

function scripts() {
	return browserify({
		basedir: '.',
		debug: true,
		entries: [js_entry],
		cache: {},
		packageCache: {},
	})
		.transform('babelify', {
			presets: ['es2015'],
			extensions: ['.js'],
            plugins: ["babel-plugin-transform-class-properties"],
		})
		.bundle()
		.pipe(source('app.bundle.js'))
		.pipe(gulp.dest('src'));
}

function styles() {
	return gulp
		.src([css_entry])
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix())
		.pipe(gulp.dest('src/css'));
}

function server() {
	browserSync.init({
        server: {
            baseDir: './src'
        },
		notify: false,
	});
}

function watchFiles(cb) {
	watch(['./src/sass/**/*.scss'], gulp.series(styles));
	watch(['./src/js/**/*.js'], gulp.series(scripts));
}

exports.default = series(styles, scripts, watchFiles);
exports.styles = styles;
exports.scripts = scripts;
exports.server = server;
