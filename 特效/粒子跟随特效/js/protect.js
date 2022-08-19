document.onkeydown=function(){
    var e = window.event||arguments[0];
    if(e.keyCode==123){
    	alert('鼠标跟随特效');
            return false;
    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
    	alert('鼠标跟随特效');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==85)){
            alert('鼠标跟随特效');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==83)){
           alert('鼠标跟随特效');
           return false;
    }
}
document.oncontextmenu=function(){
	alert('鼠标跟随特效');
    return false;
}