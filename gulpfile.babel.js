import gulp from "gulp";
import sourcemap from "gulp-sourcemaps";
import sass from "gulp-sass";
import csso from "gulp-csso";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import autoprefixer from "gulp-autoprefixer";
import run from "run-sequence";
import del from "del";
import combiner from "stream-combiner2";
import browserSync from "browser-sync";
import webpackStream from "webpack-stream"; //配合webpack


const file = {
    sass: ["./app/sass/widget.scss","./app/sass/main.scss", "./app/sass/media.scss"],
    script: ["./app/js/jquery.sort.js","./app/js/dataType.js","./app/js/index.js","./app/js/route.js","./app/js/browserType.js"],
    html: ["./index.html"]
};

const fileAll = [];
for (let item of Object.values(file)) {
    fileAll.push(...item);
}

gulp.task("del", () => {
    return del(["./dist/js", "./dist/css"]);
});

gulp.task("sass", () => {
    let combined = combiner.obj([
        gulp.src(file.sass),
        sourcemap.init(),
        sass(),
        csso(),
        autoprefixer(),
        concat("main.css"),
        sourcemap.write(),
        gulp.dest("./dist/css")
    ]);
    combined.on("error", console.error.bind(console));
    return combined;
});
gulp.task("script", () => {
    let combined = combiner.obj([
        gulp.src(file.script),
        sourcemap.init(),
        concat("main.js"),
        gulp.dest("./dist/js"),
        webpackStream({
            mode:"production",
            devtool:"source-map",
            modules:{
                rules:[
                    {
                        test:/\.js$/,
                        loader:"babel-loader"
                    }
                ]
            }
        }),
        uglify(),
        sourcemap.write(),
        gulp.dest("./dist/js")
    ]);
    combined.on("error", console.error.bind(console));
    return combined;
});

gulp.task("watch", ["script", "sass"], () => {
    let combined = combiner.obj([
        gulp.watch(file.sass, ["sass"]),
        gulp.watch(file.script, ["script"]),
        gulp.watch(fileAll).on("change", browserSync.reload)
    ]);
    combined.on("error", console.error.bind(console));
});

gulp.task("open", () => {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "./index.html"
        }
    });
});

gulp.task("default", () => {
    run("del", "open", "watch");
});