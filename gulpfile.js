var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var deploy      = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');



gulp.task('useref', function(){
    return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
  });





// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

//images
gulp.task('images', function(){
    return gulp.src('src/assets/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/assets'))
  });



//gulp delete
gulp.task('clean:dist', function() {
    return del.sync('dist');
  })
//fonts
  gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
  })


// Move the javascript files into our /src/js folder

// gulp.task('js', function() {
//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
//         .pipe(gulp.dest("src/js"))
//         .pipe(gulp.dest("dist/js"))
//         .pipe(browserSync.stream());
// });

// gulp.task('buildjs', function() {
//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js']);
//         .pipe(gulp.dest("dist/js"))
//         .pipe(browserSync.stream());
// });
gulp.task('buildcss', function() {
    return gulp.src(['src/css/styles.css', 'src.bootstrap.css'])
        .pipe(gulp.dest("dist/css"));
});



// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
      .pipe(deploy())
  });

  gulp.task('build', function (callback) {
    runSequence('clean:dist', 
      ['sass', 'buildcss', 'buildjs', 'useref'],
      callback
    )
  })


gulp.task('default', ['serve']);