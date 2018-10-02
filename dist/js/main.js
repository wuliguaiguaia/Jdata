/* global jQuery */
/*
 *   sort-parent
 *   sort-content
 *   this == jQuery element
 */
(function ($) {
    $.fn.extend({
        sort(options) {
            options = $.extend({
                axis: "y"
            }, options);
            let mouseStart = {
                x: 0,
                y: 0
            };
            let mouseOver = {
                x: 0,
                y: 0
            };
            let mouseDiff = {
                x: 0,
                y: 0
            };
            let offset = {
                x: 0,
                y: 0
            };
            let dragEle = null;
            let INDEX = 0;
            this.on("click", ".item", function () {
                INDEX = $(this).index();
            }).on("dragstart", ".item", function (e) {
                dragEle = this;
                $(this).css("zIndex",9999).on("selectstart",function(){
                    return false;
                });

                mouseStart.x = e.clientX;
                mouseStart.y = e.clientY;
            }).on("dragenter", ".item", function (e) {
                if(mouseDiff.y < 0 ){
                    $(this).before(dragEle);
                }else if(mouseDiff.y > 0){
                    $(this).after(dragEle);
                }
            }).on("dragover", ".item", function (e) {
                mouseOver.x = e.clientX;
                mouseOver.y = e.clientY;

                mouseDiff.x = mouseOver.x - mouseStart.x;
                mouseDiff.y = mouseOver.y - mouseStart.y;

                e.preventDefault();
            }).on("drop", ".item", function (e) {
                e.preventDefault();
                $(dragEle).css("zIndex","");
            });
            return this;
        },
    });
}(jQuery));
const TYPE = {
    singleLine: {
        caption: "未命名",
        default: "",
        prompt: "",
        setting:{
            sweepYard:"",
            mustWrite: true,
            norepeat:true,
            idVerify:true,
            scopeLimit:true,
            minNum:10,
            maxNum:0,
            customPlan:"",
            widthRatio:1,
            eleHide:true,
            autoComplate:true,
        }
    },
    multiLine: {

    },
    singleSelect: {

    },
    multiSelect: {

    }
};
const TIP = {
    caption: {
        title: "关于字段标题",
        content: "此属性用于告诉填写者应该在该字段中输入什么样的内容。通常是一两个简短的词语，也可以是一个问题。"
    },
    default: {
        title: "设置默认值",
        content: "设置后，此值将作为默认值显示在该字段的输入框中。如果不需要设置默认值，请将此处留空。"
    },
    prompt: {
        title: "关于字段提示",
        content: "此属性用于指定对该字段进行一些附加说明，一般用来指导填写者输入。"
    },
    sweepYard: {
        title: "微信扫码录入",
        content: "在微信中打开时可以使用扫码录入功能，扫码后会自动提取二维码/条形码信息填入字段；在对外查询使用该字段作为查询条件时，也可使用扫码查询。请注意，由于微信安全域名限制，自定义域名表单该功能将失效"
    },
    mustWrite: {
        title: "关于必填校验",
        content: "勾选后，该字段将不允许为空，在字段名称后会有红色的星号标出。如果填写者在提交表单时必填字段没有输入，系统将会给出相关错误提示，表单将无法提交。该属性常用于需要强制填写者必须输入的字段"
    },
    norepeat: {
        title: "关于重复校验",
        content: "勾选后，该字段将不允许提交重复值。填写者在提交表单时，会检测数据库中是否已存在相同的值；如果存在，将给出错误的提示信息，提交将失败。常用于电子邮件，用户名等需要验证填写者身份的字段。"
    },
    idVerify: {
        title: "关于身份证验证",
        content: "此处身份证验证只校验是否符合规定的身份证号格式，无法验证该号码真伪"
    },
    scopeLimit: {
        title: "关于限定范围",
        content: "勾选设置后，填写者只能提交这个列表范围内的数据，这个列表范围外的数据将不能提交表单。通常用于需要限制报名者身份的场景。"
    },
    minNum: {
        title: "关于最少填写字数",
        content: "勾选设置后，系统会限制填写者填写此字段的最小字数。"
    },
    maxNum: {
        title: "关于最多填写字数",
        content: "勾选设置后，系统会限制填写者填写此字段的最大字数。"
    },
    customPlan: {
        title: "设置提交出错时提示",
        content: "勾选后，填表者在提交不符合校验规则的数据时，会显示此处自定义的文案。"
    },
    widthRatio: {
        title: "关于占用整行的宽度",
        content: "你可以定义该字段在填写页面占用的页面宽度为多少"
    },
    eleHide: {
        title: "关于字段隐藏",
        content: "勾选后，该字段只有管理员及数据维护员可见，普通填写者将看不到此字段；通常适用于当你想为已提交数据设置一些特殊属性，如状态（处理/未处理）或优先级（重要/一般）"
    },
    autoComplate: {
        title: "关于缓存填写数据",
        content: "勾选后，填写者第二次打开你的表单时，第一次填写的字段数据将会自动显示出来，减少重复填写。（注：清除浏览器cookie后该功能将会失效）"
    },
    generalField: {
        title: "关于通用字段",
        content: "通用字段提供最基本的表单功能。"
    },
    contactInfo: {
        title: "关于联系信息字段",
        content: "联系信息字段可以让表单获取更多关于填写者的个人信息。"
    },
    goodsOrders: {
        title: "关于商品字段",
        content: "商品字段是金数据为小电商和中小企业定制的一种特殊的字段，它可以让表单具备商品销售功能。",
        link: "查看如何使用商品字段"
    }
};

let toggleObj = [
    ["singleLine", "multiLine"],
    ["singleSelect", "multiSelect", "dropDownList"],
    ["photoSingleSelect", "photoMultiSelect"],
];
let toggleText = [
    ["单行文字", "多行文字"],
    ["单项选择", "多项选择", "下拉框"],
    ["图片单选", "图片多选"],
];
// 1. 基本初始化 
// 2. 重用函数
// 3. 事件触发 的 函数



/* global $ KindEditor TYPE TIP toggleObj toggleText*/
 
$(function () {
    let basicConfig = function () {
        init();
        resize();
    };
    let editor;
    KindEditor.ready(function (K) {
        editor = K.create("#kindEditor_demo", {
            items: ["source", "undo", "redo", "plainpaste", "wordpaste", "clearhtml", "quickformat",
                "selectall", "fullscreen", "fontname", "fontsize", "|", "forecolor", "hilitecolor",
                "bold", "italic", "underline", "hr", "removeformat", "|", "justifyleft", "justifycenter",
                "justifyright", "insertorderedlist", "insertunorderedlist", "|", "link", "image",
                "unlink", "baidumap", "emoticons"
            ]
        });
    });

    // init
    basicConfig();
    $(window).resize(function () {
        resize();
    });

    

    // toggle  切换类型：toggle-par包裹 toggle-con和toggle-bar平级
    $(".toggle_but").click(function () {
        Toggle_callback();
        let ele = $(this).siblings(".toggle_con");
        if (ele.hasClass("dropdown")) {
            ele.toggle();
        } else if (ele.hasClass("Jdata-add")) {
            if (ele.is(":visible")) {
                ele.stop().animate({
                    left: -240
                }, 1000).fadeOut();
            } else {
                ele.stop().animate({
                    left: 0
                }, 1000).show();
            }
        } else if (ele.hasClass("Jdata-right")) {

            if (parseInt(ele.css("right")) == 0) {
                ele.stop().animate({
                    right: -240
                }, 1000);
            } else {
                ele.stop().animate({
                    right: 0,
                }, 1000);
            }
        } else {
            ele.fadeToggle();
        }
    });
    // 点击空白区域 让 toggle_con 消失
    $("body").on("click", function (e) {
        if (!$(e.target).parents().hasClass("toggle_par")) {
            Toggle_callback();
        }
    });
    $(".toggle_con li").on("click", function () {
        $(this).parent(".toggle_con").slideUp();
    });


    // fixed bug
    $("nav").siblings(".hock").css("marginTop", "123px");
    $("input").on("focus", ["header", "nav"], function () {
        $("header").css("position", "absolute");
        $("nav").css("position", "absolute");
    }).on("blur", ["header", "nav"], function () {
        $("header").css("position", "fixed");
        $("nav").css("position", "fixed");
    });

    // input_icon
    $(".input input").on("focus blur", function () {
        $(".input").toggleClass("active");
    });

    // 项目卡切换 
    $(".toggle-card-btn").on("click", function () {
        let index = $(this).index();
        $(this).parent().siblings(".toggle-card").eq(index).show().siblings(".toggle-card").hide();
        $(this).parents(".toggle_con").siblings(".hide-btn-group").find(".toggle-card-btn").eq(index).addClass("active").siblings("button").removeClass("active");
    });
    $(".hide-btn-group .toggle-card-btn").click(function () {
        let index = $(this).index();

        $(this).parent().next().find(".toggle-card").eq(index).show().siblings(".toggle-card").hide();

        $(this).parent().next().find(".toggle-card-btn").eq(index).addClass("active").siblings("button").removeClass("active");
    });

    $(".toggle-btn-group ").on("click", "button", function () {
        $(this).addClass("active").siblings("button").removeClass("active");
    });

    //JData-list的一系列事件
    let dobble_btn = $(`
        <div class="dobble-btn flex">
            <div class="copy">
                <i class="icon-copy"></i>
                <span class="text">复制</span>
            </div>
            <div class="del">
                <i class="icon-alter_delete"></i>
                <span class="text">删除</span>
            </div>
        </div>
    `);
    let sortPlaceholder = $("<div class='sort-placeholder item'></div>");
    // find 
    let INDEX = $(".JData-list .item").length - 1;
    $(".JData-list").on("click", ".item", function () {
        $(this).addClass("active").siblings(".item").removeClass("active");
        $(".JData-list").find(".dobble-btn").hide();
        $(this).find(".dobble-btn").show();
        INDEX = $(this).index();
        toggleRight(this.classList[0]);
        $(".toggle-card-btn:first").trigger("click");
        // $(this).addClass("sort-content");

        // 1.根据当前对象 生成右边的自定义区域
        

    }).on("addButton", function () {
        $(this).find(".item").append(dobble_btn).attr("draggable", true).addClass("sort-content");
    }).on("mouseover", ".dobble-btn i", function () {
        $(this).siblings("span").show().parent().siblings().children("span").hide();
    }).on("mouseout", ".dobble-btn i", function () {
        $(this).siblings().hide();
    }).on("click", ".copy", function () {
        let code = $(this).parents(".item").clone(true);
        code.find(".dobble-btn span").hide();
        $(this).parents(".item").after(code);
    }).on("click", ".del", function () {
        $(this).parents(".item").remove();
        INDEX--;
    }).on("dragover", ".item", function (e) {
        sortPlaceholder.height(50);
        $(this).after(sortPlaceholder);
    }).on("drop", ".item", function (e) {
        let data = e.originalEvent.dataTransfer.getData("text");
        let ele = $(`#template .${data}`);
        ele.append(dobble_btn).attr("draggable", true).addClass("sort-content");
        $(this).after(ele[0]);
        sortPlaceholder.hide();
    }).trigger("addButton");


    // right toggle-tab  的自动添加
    $(".Jdata-edit .refresh").on("click", function (e) {
        let tab = $(".Jdata-edit .toggle-tab");
        tab.html("");
        let cName = $(this).parent().parent().attr("class").slice(7);
        let code = "";
        let cNameArr = [];
        toggleObj.forEach(function (it, pos) {
            if (it.indexOf(cName) != -1) {
                cNameArr.c = it;
                cNameArr.i = pos;
            }
        });
        for (let i = 0; i < cNameArr.c.length; i++) {
            code += `<div class="tab ${cNameArr.c[i]}">${toggleText[cNameArr.i][i]}</div>`;
        }
        $(".Jdata-edit .toggle-tab").html(code).show().on("click", ".tab", function () {
            let cName = this.classList[1];
            toggleRight(cName);
        });

    }).trigger("addTab");

    // J-add的系列事件
    $("body").on("drop dragover", function (e) {
        e.preventDefault();
    });
    $(".Jdata-add").on("click", "li", function (e) {
        let cName = $(this).attr("class").slice(0, -4);
        let code = $("#template").find(`.${cName}`).clone();
        code.append(dobble_btn).attr("draggable", true).addClass("sort-content");
        $(".JData-list").children(".item").eq(INDEX).after(code);
    }).on("dragstart", "li", function (e) {
        sortPlaceholder.show();
        $(this).css("background", "#333").css("color", "#fff");
        e.originalEvent.dataTransfer.setData("text", $(this).attr("class").slice(0, -4));
    }).on("dragend", "li", function (e) {
        sortPlaceholder.hide();
        $(this).css("background", "#fff").css("color", "#333");
    });

    // choice
    $(".eye-icon").click(function () {
        $(this).removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close").css("color", "#00a6ff");
    });

    $(".plue-icon").click(function () {
        let plus_choice = $(this).parents(".choice-item");
        plus_choice.clone(true).insertAfter(plus_choice);
    });

    $(".delete-icon").click(function () {
        $(this).parents(".choice-item").remove();
    });

    //  重排序
    $(".sort-parent").sort({
        axis: "y",
    });
    $(".sortable").sortable({
        axis: "y",
    });

    // 拖拽
    $(".draggable").draggable({
        connectToSortable: ".sortable",
        containment: "parent",
        // helper: true,
        change: function () {
        }
    });

    // 折叠面板
    let icons = {
        header: "ui-icon-triangle-1-s",
        activeHeader: "ui-icon-triangle-1-e"
    };
    $(".accordion").accordion({
        icons: icons,
        collapsible: true,
        heightStyle: "content",
        animate: "linear"
    });
    $(".ui-accordion-content").each(function () {
        if ($(this).is(":visible")) {
            $(this).siblings("h3").children(".ui-icon").css("filter", "invert");
        }
    });


    // toggle组件 toggle-a toggle-b    ---切换类型：a一直存在， 点击对b进行切换隐藏
    $(".checklable").on("click", [".form-group"], function () {
        console.log(this);
        let hasChecked = $(this).siblings(":checkbox").prop("checked");
        $(this).siblings(":checkbox").prop("checked", !hasChecked);
        $(this).parents(".toggle-a").siblings(".toggle-b").toggle();
    });
    $(":checkbox").on("click", [".form-group"], function () {
        let hasChecked = $(this).prop("checked");
        if (hasChecked) {
            $(this).parents(".toggle-a").siblings(".toggle-b").show();
        } else {
            $(this).parents(".toggle-a").siblings(".toggle-b").hide();
        }
    });


    // other
    $(".J-edit-photoSingleSelect .field_choices ul li .img-choice").hover(function () {
        $(this).children("span").toggle();
    });

    $(".J-edit-photoSingleSelect .field_choices .choice-item textarea").on("input", function () {
        if ($(".J-edit-photoSingleSelect .field_choices .choice-item textarea")[0].scrollHeight >= 25) {
            $(".J-edit-photoSingleSelect .field_choices .choice-item textarea").css("height", $(this)[0].scrollHeight);
        }

    });

    // 图片上传
    $("#imgLoad").change(function () {
        $(".imgLoadScan").attr("src", $(this).val());
        let oFReader = new FileReader();
        let file = $(this)[0].files[0];
        oFReader.readAsDataURL(file);
        oFReader.onloadend = function (oFRevent) {
            let src = oFRevent.target.result;
            alert(src);
        };
    });

    // 富文本

    // tip 对象 - help
   
    let tip = $("<div id='tip' class='flex-col'><span class='triangle'></span><div class='text'><h5></h5><p></p></div></div>");
    $("#edit").append(tip);
    $("body").on("click", ".glyphicon-help", function (e) {
        let cName = $(this).parent().parent()[0].classList[2];
        if($(this).parent().parent().hasClass("Jdata-add")){
            cName = $(this).parent().attr("class");
        }
        $.each(TIP, (key, value) => {
            if (key == cName) {
                tip.find("h5").text(value.title).siblings("p").text(value.content);
            }
        });
        let left = $(this).offset().left + 6 - tip.width()/2;
        let _left =  tip.width() / 2 - 11;
        let maxLeft = $(window).width() - tip.width();
        if(left < 0 ){
            _left -= -left;
            left = 0;
        }else if(left > maxLeft){
            _left -= maxLeft - left;
            left = maxLeft;
        }
        let top = $(this).offset().top + 23;
        tip.css({
            top: top,
            left: left,
        }).find(".triangle").css({
            left: _left
        }).end().fadeToggle();
    });

});

//  init
function init() {
    $(".hock").hide();
    $(".hock").first().show().find(".hock").first().show();
    $(".Jdata-style").hide();
    $(".Jdata-edit .toggle-tab").hide();
    $(".Jdata-add ul li").attr("draggable", true);
    $(".toggle-b").hide();
    $("#tip").hide();
}

function resize() {
    let W = $(window).width();
    if (W <= 872) {
        $(".header-right ul").addClass("toggle_con");
        $(".main-container .left .Jdata-add").addClass("toggle_con");
    } else {
        $(".header-right ul").removeClass("toggle_con");
        $(".main-container .left .Jdata-add").removeClass("toggle_con").show();
    }
    if (W <= 768) {
        $(".main-container .right .Jdata-right").addClass("toggle_con");
    } else {
        $(".main-container .right .Jdata-right").removeClass("toggle_con").show();
    }

    let JData_h = $(window).height() - $("header").height() - $("nav").height();
    let JData_con_h = JData_h - 30;
    let JData_right_h = JData_con_h - 50;
    $(".middle").height(JData_h);
    $(".Jdata-add").height(JData_h);
    $(".toggle-card").height(JData_right_h);

}

function Toggle_callback() {
    $("body").find(".toggle_con.dropdown").slideUp().end()
        .find(".Jdata-add.toggle_con").stop().animate({
            left: -240
        }, 1000).end()
        .find(".Jdata-right.toggle_con").stop().animate({
            right: -240
        }, 1000);
    $("#tip").stop().fadeOut();
}

function toggleRight(cName) {
    $(`.J-edit-${cName}`).show().siblings().hide();
}

function toggle(ele) {
    $(ele).siblings(".toggle-b").toggle();
}
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
let Mobileoption = ["ipad", "iphone", "andriod", "mobile", ];
let userType;

function testMobile() {
    let str = "";
    let userAgent = navigator.userAgent.toLocaleLowerCase();
    let isMobile = Mobileoption.some((item) => {
        return userAgent.match(item) == item;
    });
    return isMobile;
}
userType = testMobile() == true ? "mobile" : "pc";
if (userType === "mobile") {
    console.log("mobile");
} else {
    console.log("pc");
}