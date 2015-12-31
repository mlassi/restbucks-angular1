var gulp = require('gulp');
var Server = require('karma').Server

gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task('test', function (done) {
    var karma = require('karma').server;
    var karmaConf = require('./karma_gulp.conf.js')();
    karma.start(karmaConf, done);
});

gulp.task('default', ['test']);
