const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const pug = require("gulp-pug");
const webp = require("gulp-webp");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function convertImageToWEBP() {
  return src([
    "app/img/**/*.png",
    "app/img/**/*.jpg",
    "app/img/**/*.jpeg",
    "app/img/**/*.JPG",
  ])
    .pipe(webp())
    .pipe(dest("dist/"))
    .pipe(dest("app/images"));
}

function cleanDist() {
  return del("dist");
}

function videoDist() {
  return src("app/videos/**/*").pipe(dest("dist/videos"));
}

function images() {
  return (
    src("app/images/**/*")
      // .pipe(imagemin([
      // 	imagemin.gifsicle({interlaced: true}),
      // 	imagemin.mozjpeg({quality: 75, progressive: true}),
      // 	imagemin.optipng({optimizationLevel: 5}),
      // 	imagemin.svgo({
      // 		plugins: [
      // 			{removeViewBox: true},
      // 			{cleanupIDs: false}
      // 		]
      // 	})
      // ]))
      .pipe(dest("dist/images"))
  );
}

function scripts() {
  return src([
    // "node_modules/jquery/dist/jquery.js",
    "node_modules/bootstrap/dist/js/bootstrap.js", // uncomment only use bootstrap
    "app/js/*.js",
    "!app/js/main.min.js",
    "!app/js/axios.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function pugToHTML() {
  return src([
    "./app/**/*.pug",
    "!app/pug/sections/*.pug",
    "!app/pug/sections/global/*.pug",
  ])
    .pipe(
      pug({
        doctype: "html",
        pretty: true,
      })
    )
    .pipe(dest("./app"));
}

function styles() {
  return src([
    "node_modules/bootstrap/scss/bootstrap.scss", // uncomment only use bootstrap
    "app/scss/style.scss",
  ])
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 15 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/fonts/**/*",
      "app/js/main.min.js",
      "app/js/axios.js",
      "app/**/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
  watch(["app/**/*.pug"]).on("change", browserSync.reload);
  watch(["app/**/*.pug"], pugToHTML);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.pugToHTML = pugToHTML;
exports.default = parallel(
  styles,
  scripts,
  browsersync,
  watching,
  convertImageToWEBP,
  pugToHTML
);
exports.build = series(cleanDist, images, pugToHTML, videoDist, build);
// exports.build = series(cleanDist, images, convertImageToWEBP, build);
exports.images = images;
exports.cleandist = cleanDist;
exports.convertImageToWEBP = convertImageToWEBP;
