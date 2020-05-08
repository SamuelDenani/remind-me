  
let gulp = require('gulp')
let sass = require('gulp-sass')

let scssSrc = './scss'

gulp.task('sass', () => {
    return gulp.src(`${scssSrc}/main.scss`)
    .pipe(sass())
    .pipe(gulp.dest('.'))
})

gulp.task('watch', () => {
    gulp.watch(`${scssSrc}/**/*.scss`, gulp.series(['sass']))
})