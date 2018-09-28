/* global $*/
// class Router {
//     constructor() {
//         this.routes = {};
//         this.current = "";
//     }
//     route(path, callback) {
//         this.routes[path] = callback || function () {};
//         console.log("SAd");
//     }
//     refresh() {
//         this.current = location.hash.slice(1) || "/";
//         console.log(this.current);
//         this.routes[this.current]();
//     }
//     init() {
//         window.addEventListener("load", this.refresh.bind(this), false);
//         window.addEventListener("haschange", this.refresh.bind(this), false);
//     }
// }
// let Eouter = new Router();
// Eouter.init();
// Eouter.route("/", () => {
//     console.log("/");
// });
function Router() {
    this.routes = {}; //动态hash，执行回调
    this.currentUrl = ""; //临时当前hash
}
Router.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () {};
};
Router.prototype.refresh = function () { //获取当期hash，
    this.currentUrl = location.hash.slice(1) || "/";
    this.routes[this.currentUrl]();
};
Router.prototype.init = function () {
    window.addEventListener("load", this.refresh.bind(this), false);
    window.addEventListener("hashchange", this.refresh.bind(this), false);
    window.addEventListener("reisze", this.refresh.bind(this), false);
};
window.Router = new Router();
window.Router.init();

Router.route("/", function () {
    _ROUTE("form");
});
Router.route("/form", function () {
    _ROUTE("form");
});
Router.route("/app", function () {
    _ROUTE("app");
});
Router.route("/help", function () {
    _ROUTE("help");
});
Router.route("/concat", function () {
    _ROUTE("concat");
});
Router.route("/package", function () {
    _ROUTE("package");
});
Router.route("/form/overview", function () {
    _ROUTE("overview");
});
Router.route("/form/edit", function () {
    _ROUTE("edit");
});
Router.route("/form/rule", function () {
    _ROUTE("rule");
});
Router.route("/form/setting", function () {
    _ROUTE("setting");
});
Router.route("/form/data", function () {
    _ROUTE("data");
});
Router.route("/form/report", function () {
    _ROUTE("report");
});
Router.route("/form/publish", function () {
    _ROUTE("publish");
});


function _ROUTE(ele) {
    $(`#${ele}`).show().siblings(".hock").hide();
    $(`.${ele}`).addClass("active").siblings(".link-hock").removeClass("active");
    $(".nav-hock").each((ins, item) => {
        $(item).removeClass("active");
        $(`.${ele}`).addClass("active");
    });
    if (location.hash.includes("form")) {
        $(".form").addClass("active");
    }
}