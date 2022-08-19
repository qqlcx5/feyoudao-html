/**
 * Created by lonely on 2017/5/15.
 */
$(function(){
    $(".parameter>.row>.col-sm-12 a").click(function(){
        var index=$(".parameter>.row>.col-sm-12 a").index($(this));
        $('.show').children().eq(index).show().siblings().hide();
    })
})

