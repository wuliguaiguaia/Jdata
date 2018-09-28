window.onload=function(){
	;(function(win,doc){
	  doc.documentElement.style.fontSize = 20/1920*doc.documentElement.clientWidth+'px';
	  win.addEventListener('resize',function(){
	    doc.documentElement.style.fontSize = 20/1920*doc.documentElement.clientWidth+'px';
	  },false);
	})(window,document);
}

// 高度除以25
