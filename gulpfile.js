// modules
const {watch, series, parallel} = require('gulp');
const {src, dest} 	= require('gulp');
const browsersync 	= require('browser-sync').create();
const path 			= require('./config/path.js');


// import tasks
const clean			= require('./task/clean.js');
const html			= require('./task/html.js');
const css			= require('./task/css.js');
const js			= require('./task/js.js');
const img			= require('./task/img.js');
const font			= require('./task/font.js');



// server
function server() {
		browsersync.init({
		server: {
			baseDir: path.root							
		},
		browser: 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe',
		notify: false,
	})
}

// watch
function watcher() {
	watch(path.watch.html, html).on('all', browsersync.reload);
	watch(path.watch.css, css).on('all', browsersync.reload);
	watch(path.watch.js, js).on('all', browsersync.reload);
	watch(path.watch.img, img).on('all', browsersync.reload);
	watch(path.watch.font, font).on('all', browsersync.reload);
}

// tasks
exports.default = series(
	clean,
	html,
	css,
	js,
	img,
	font,
	parallel(watcher, server)
);




