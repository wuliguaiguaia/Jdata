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