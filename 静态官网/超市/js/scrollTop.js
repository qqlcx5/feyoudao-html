window.onload = function(){
	
	// var nav = document.getElementById('scrollTop');
	// window.onscroll = function(){
	// 	var top = document.documentElement.scrollTop || document.body.scrollTop;

	// 	if(top >= 800){
	// 		nav.classList.add('show');
	// 	} else{
	// 		nav.classList.remove('show');
	// 	}
	// };


    var TIMER;//定义全局变量
    $(window).scroll( function() {
        clearTimeout(TIMER);//必须要有这句
        if( $(document).scrollTop() >= 800 ){
	        TIMER = setTimeout(function(){
	            $("#scrollTop").addClass("show").fadeIn(1000);
	            // console.log($(document).scrollTop());
	        },100);
	    }else{
	        TIMER = setTimeout(function(){
	            $("#scrollTop").removeClass("show").fadeOut(1500);
	        },100);
	    }
    });
};