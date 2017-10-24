// browserify --debug --transform babelify ./examples/index.js > ./examples/build.dev.js
var browserify = require('browserify');
var watchify = require("watchify");

var b = browserify("./examples/index.js", {
	paths: ["./node_modules", "./packages"],
	transform: 'babelify',
	plugin: [watchify]
});

var path = require('path'),
	fs = require('fs'),
	bundlePath = path.join(__dirname, 'examples/build.dev.js');

b.bundle()
	.on('error', function (err) { console.error(err); })
	.pipe(fs.createWriteStream(bundlePath));
