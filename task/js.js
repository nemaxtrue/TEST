const {src, dest} 	= require('gulp');
const path 			= require('./../config/path.js');


function js() {
	return src(path.app.js, { sourcemaps: true })
	.pipe(dest(path.dist.js))
}

module.exports = js;