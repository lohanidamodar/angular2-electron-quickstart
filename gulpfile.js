var gulp = require('gulp'),
    del = require('del'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten');
    runSeq = require('run-sequence');

gulp.task('clean', function(){
    return del('dist/frontend/**/*', {force:true});
});

gulp.task('copy:scripts', function(){
    return gulp.src([
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/zone.js/dist/zone.js",
          ])
        .pipe(gulp.dest('./dist/frontend/js'));
});

gulp.task('browserify',function(){
  return gulp.src('src/frontend/app/main.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        })).pipe(rename('bundle.js'))
        .pipe(gulp.dest('./dist/frontend/js'));

});

gulp.task('copy:html',function(){
  return gulp.src([
    './src/frontend/**/*.html',
  ])
  .pipe(flatten())
  .pipe(gulp.dest('./dist/frontend'));
});

gulp.task('frontend', function(done){
    return runSeq('clean', ['copy:scripts','copy:html','browserify'], done);
});

gulp.task('clean-electron', function(){
    return del('dist/electron-package/**/*', {force: true});
});

gulp.task('copy:electron-manifest', function(){
   return gulp.src('./src/assets/package.json')
       .pipe(gulp.dest('./dist/electron-package'));
});

gulp.task('copy:electron-scripts', function(){
    return gulp.src('./src/main/**/*')
        .pipe(gulp.dest('./dist/electron-package'));
});

gulp.task('copy:spa-for-electron', function(){
    return gulp.src("./dist/frontend/**/*")
        .pipe(gulp.dest('dist/electron-package'));
});

gulp.task('electron', function(done){
    return runSeq('clean-electron','frontend', ['copy:electron-manifest', 'copy:electron-scripts', 'copy:spa-for-electron'], done);
});

gulp.task('build-linux',function(){

})
