/*
 * -------------------------------------------------------
 * @author   hzwangdong5(hzwangdong5@corp.netease.com)
 * -------------------------------------------------------
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del(['dist']);
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('build',function(){
    gulp.src('src/**/*.js')
        .pipe(concat('rg-echarts.js'))
        .pipe(gulp.dest('dist'))

    gulp.src('src/**/*.js')
        .pipe(concat('rg-echarts.min.js'))
        .pipe(uglify())
        .on('error', handleError)
        .pipe(gulp.dest('dist'))
});

gulp.task('watch',function () {
    gulp.watch('src/**/*.js', function(){
        runSequence('clean', 'build');
    })
});

gulp.task('default',['build','watch']);