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