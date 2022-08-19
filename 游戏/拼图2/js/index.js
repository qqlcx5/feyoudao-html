var list = $('.picBox .list');
var listW = list.width();
var listH = list.height();
var imgW = listW / 3;
var imgH = listH / 3;
var origArr = [];
var randArr = [];
var key = true;
var imgCell;
var num = 3;
var seleBox = $('.selectbox');
var seleLi = seleBox.find('li');
var seleBtn = seleBox.find('.text');
init()
function init() {
    render(num)
    gameState()
    select()
}


function render(n) {
    list.html('')
    imgW = listW / n;
    imgH = listH / n;
    origArr = [];
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            origArr.push(i * n + j);
            var li = $('<li>')
            li.css({
                left: j * imgW + 'px',
                top: i * imgH + 'px',
                backgroundPosition: -j * imgW + 'px ' + -i * imgH + 'px',
                width: imgW + 'px',
                height: imgH + 'px'
            })
            list.append(li)
            imgCell = list.find('li')
        }
    }
} //生成9个li


function select() {
    seleBtn.on('click', function () {
        $(this).siblings('.box').slideToggle()
        seleBox.toggleClass('active');
    })
    seleLi.on('click', function () {
        var index = $(this).index();
        var text = $(this).text();
        seleBtn.text(text)
        seleBox.find('.box').slideUp()
        seleBox.removeClass('active')
        if(index == seleLi.length-1){
            num = 12
            return 
        }else if(index == seleLi.length-2){
            num = 8
            return 
        }
        num = Math.floor(index*1.5) + 3;
    })
}

function gameState() {
    $('.btn').on('click', function () {
        if (key) {
            key = false;
            $(this).text('复原')
            render(num)
            randomArr()
            cellOrder(randArr, num)
            drag()
            seleBtn.attr('disabled','disabled')
            $(imgCell).css('cursor','move')
            seleBox.find('.box').slideUp()
            seleBox.removeClass('active')
        } else {
            key = true
            $(this).text('开始')
            cellOrder(origArr,num)
            imgCell.off('mousemove mouseup mousedown mouseover mouseout')
            seleBtn.attr('disabled',false)
            $(imgCell).css('cursor','pointer')
        }
    })
} //游戏状态改变
function randomArr() {
    randArr = [];
    var len = origArr.length;
    var order;
    var temp = {}
    for (var i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len)
        if (randArr.length > 0) {
            while ($.inArray(order, randArr) > -1) {
                order = Math.floor(Math.random() * len)
            }
        }
        randArr.push(order)
    }
    return
} //乱序数组
function cellOrder(arr, n) {
    var len = arr.length;
    for (var a = 0; a < len; a++) {
        var j = arr[a] % n;
        var i = Math.floor(arr[a] / n);
        animateFn(a, j, i,n)
    }
} //改变图片位置
function drag() {
    var disX, disY
    var initL = list.offset().left;
    var initT = list.offset().top;
    imgCell.on('mousedown', function (e) {
        var e = e || window.e;
        disX = e.pageX - $(this).offset().left
        disY = e.pageY - $(this).offset().top
        var self = this
        var index1 = $(this).index()
        $(document).on('mousemove', function (e) {
            e.preventDefault()
            var e = e || window.e
            var l = e.pageX - disX - initL
            var t = e.pageY - disY - initT
            $(self).css({
                left: l + 'px',
                top: t + 'px',
                zIndex: 1000,
                opacity: '0.6'
            })
        }).on('mouseup', function (e) {
            var e = e || window.e
            var l = e.pageX - initL
            var t = e.pageY - initT
            var index2 = changeIndex(l, t, index1, num)
            if (index1 == index2) {
                cellReturn(index1, num)
            } else {
                cellChange(index1, index2, num)
            }
            $(this).off('mousemove').off('mouseup')
        })
    }).on('mouseover', function () {
        $(this).css({
            opacity: '0.8'
        })
    }).on('mouseout', function () {
        $(this).css({
            opacity: '1'
        })
    })
} //拖拽图片
function changeIndex(x, y, index, n) {
    if (x < 0 || x > listW || y < 0 || y > listH) {
        return index
    }
    var row = Math.floor(y / imgH);
    var col = Math.floor(x / imgW);
    var l = row * n + col;
    var i = 0; len = randArr.length;
    while ((i < len) && (randArr[i] !== l)) {
        i++
    }
    return i;
} //改变index值

function cellReturn(index, n) {
    var i = Math.floor(randArr[index] / n);
    var j = randArr[index] % n;
    animateFn(index, j, i,num)
} //飞回原来位置
function cellChange(from, to,n) {
    var fromI = Math.floor(randArr[from] / n);
    var fromJ = randArr[from] % n;
    var toI = Math.floor(randArr[to] / n);
    var toJ = randArr[to] % n;
    var temp = randArr[from];
    animateFn(from, toJ, toI,num)
    animateFn(to, fromJ, fromI,num, function () {
        randArr[from] = randArr[to]
        randArr[to] = temp
        check()
    })
} //图片交换位置

function check() {
    if (origArr.toString() == randArr.toString()) {
        alert('厉害了老铁')
    }
} //检查是否正确

function animateFn(index, j, i,n, callBack) {
    imgW = listW / n;
    imgH = listH / n;
    imgCell.eq(index).animate({
        left: j * imgW + 'px',
        top: i * imgH + 'px'
    }, function () {
        $(this).css({
            zIndex: '0',
            opacity: '1'
        })
        typeof callBack == 'function' ? callBack.call(this, arguments) : ''
    })
} //动画执行