var syntax = 'sass'; // Syntax: sass or scss;

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	cache = require('gulp-cache'), // Подключаем библиотеку кеширования
	imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	del = require('del'); // Подключаем библиотеку для удаления файлов и папок


gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function () {
	return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({
			level: {
				1: {
					specialComments: 0
				}
			}
		})) // Opt., comment out when debugging
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

gulp.task('js', function () {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/bootstrap/js/bootstrap.bundle.js',
			'app/js/common.js', // Always at the end
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// gulp.task('rsync', function() {
// 	return gulp.src('app/**')
// 	.pipe(rsync({
// 		root: 'app/',
// 		hostname: 'username@yousite.com',
// 		destination: 'yousite/public_html/',
// 		// include: ['*.htaccess'], // Includes files to deploy
// 		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}))
// });

gulp.task('watch', ['styles', 'js', 'browser-sync'], function () {
	gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('clean', function () {
	return del.sync('docs'); // Удаляем папку docs перед сборкой
});

gulp.task('img', function () {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
			// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant()]
		})) /**/ )
		.pipe(gulp.dest('docs/img')); // Выгружаем на продакшен
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('build', ['clean', 'img', 'styles', 'js'], function () {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
			'app/css/*.css',
			'app/libs/fullpage.js/dist/fullpage.min.css'
		])
		.pipe(gulp.dest('docs/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('docs/fonts'))

	var buildJs = gulp.src(['app/js/**/*','app/libs/fullpage.js/dist/fullpage.js']) // Переносим скрипты в продакшен
		.pipe(gulp.dest('docs/js'))

	var buildVideos = gulp.src('app/video/*.mp4') // Переносим видео в продакшен
		.pipe(gulp.dest('docs/video'));

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
		.pipe(gulp.dest('docs'));
	
});

gulp.task('default', ['watch']);