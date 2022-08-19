var search = ["百度", "百度翻译", "百度网盘", "百度地图",
    "a", "advice", "adidas",
    "b", "boy",
    "C", "Can",
    "谷歌", "谷歌浏览器", "谷歌地图",
    "搜", "搜索", "搜索框",
    "智", "智能", "人工智能", "智能搜索",
];

var domSearchInput = document.querySelector(".search-input");
var domSearchResult = document.querySelector(".search-result");


//当未输入时 ，默认值
domSearchInput.addEventListener("click", () => {
    let val = domSearchInput.value;
    var strDefalut = "";
    if (val.length <= 0) {
        strDefalut += "<li>" + "2020春运购票" + "</li>";
        strDefalut += "<li>" + "2019除夕" + "</li>";
        strDefalut += "<li>" + "2020元旦放假通知" + "</li>";

    }
    domSearchResult.innerHTML = strDefalut;
    domSearchResult.style.color = "red";
})


$(window).click(function () {
    var path = event.path || (event.composedPath && event.composedPath());

    for (let j of path) {
        if (j.className == "search-input" || j.id == "search-sea") {
            $(".search-result>li").css({
                "display": "inline-block",
            });
            return
        } else {
            $(".search-result>li").css({
                "display": "none",
            })
        }
    }
})
//添加监听事件

domSearchInput.oninput = function () {
    domSearchResult.style.color = "#333";
    var str = "";
    //获取输入的值
    var val = domSearchInput.value;
    console.log(val);

    //值的判断
    val = val.trim(); //去除两边空格

    val = val.split(" ");
    console.log(val);

    var resultVal = search.filter((item) => {
        for (var j = 0; j < val.length; j++) { //循环遍历输入框的多个词
            if (item.includes(val[j]) && Boolean(val[j])) {
                return true;
            }
        }
    })
    //加红关键字
    // resultVal = resultVal.map((item) => {
    //     for (var j = 0; j < val.length; j++) {
    //         console.log(item.split(val[j]));
    //         if (val[j] == "b") {
    //             item = item.split(" b").join(`<b>${val[j]}</b>`);
    //         } else {
    //             item = item.split(val[j]).join(`<b>${val[j]}</b>`);
    //         }
    //     }
    //     return item;
    // })


    //已找到的值


    resultVal = resultVal.map((item) => {
        for (var j = 0; j < val.length; j++) {
            item = item.split(val[j]).join("<b>" + val[j] + "</b>");
        }
        return item;
    })

    //赋值
    for (var i = 0; i < resultVal.length; i++) {
        str += "<li>" + resultVal[i] + "</li>";
    }
    domSearchResult.innerHTML = str;
}

function trimAll(str, before, after) {
    // console.log(str);
    if (str.indexOf(before) > -1) {
        //替换
        str = str.replace(before, after);
        //继续执行
        return trimAll(str, before, after)
    } else {
        return str;
    }

}



// var test = "a  b    c     d";
// console.log(trimAll(test, "  ", " "));



// var str = "构造a函a数b拆分";

// var arr = ["a", "b"];

//var arrAll = [];
function copyArr(arr) {
    var tmp = [];
    for (let i = 0; i < arr.length; i++) {
        tmp.push(arr[i]);
    }
    return tmp;
}

function splitAll(str, arr) {


    var arrAll = [];

    //存在拆分字符
    if (arr.length > 0) {
        //数b拆分

        var tmpArr = str.split(arr[0]);

        for (let i = 0; i < tmpArr.length; i++) {

            //是否存在下级拆分
            if (arr.length > 1) {

                if (tmpArr[i].indexOf(arr[1]) > -1) {

                    console.log("arr", arr);

                    var arrTmp = copyArr(arr);

                    console.log("arrTmp", arrTmp);

                    //存在就继续拆 
                    var arrTmp = arrTmp.pop(); //把第一个删除
                    console.log("arr del", arrTmp);

                    arrAll.push(splitAll(tmpArr[i], arrTmp));

                } else {
                    //不存在就换回自己
                    arrAll.push(tmpArr[i]);
                }
            } else {
                arrAll.push(tmpArr[i]);
            }
        }
        return arrAll;
    } else {
        return "";
    }

}
//["构造","函",["数","拆分"]]
//["构造","函", ["数","拆分"]  ]


// console.log(splitAll(str, arr));

//1、写成构造函数

//2、多词搜索




var swiper = new Swiper('.swiper-container-bannerlun', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 300,
    autoplay: {
        disableOnInteraction: false, //手动滑动之后不打断播放
        delay: 2000
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.btn-right',
        prevEl: '.btn-left',
    },
});



//shop

var addCar = document.querySelectorAll(".detail-car");
var car = document.querySelector(".right").querySelector("a");
var pri = document.querySelectorAll(".price");
var numc = document.querySelector(".numc");
var cartlist = [];
// localStorage.clear()
var tmpCartList = window.localStorage.getItem("cartlist");

//添加数据

if (tmpCartList) {
    tmpCartList = JSON.parse(tmpCartList);
    cartlist = tmpCartList;
    numc.innerHTML = cartlist.length;
    changeValue();
}



//写入缓存
function changeValue() {
    numc.innerHTML = cartlist.length;
    let strCartList = JSON.stringify(cartlist);
    window.localStorage.setItem("cartlist", strCartList);
}


for (let i = 0; i < addCar.length; i++) {

    addCar[i].addEventListener("click", function () {
        this.innerHTML = "已添加";
        this.style.background = "rgb(172, 13, 13)";
        this.style.color = "#fff";
        let num = 1;
        //获取文本
        let title = this.parentNode.parentNode.querySelector(".detail-title").innerHTML;
        //获取价格
        let prices = Number(pri[i].innerHTML.substr(1));


        let infor = {
            "id": i,
            "title": title,
            "price": prices,
            "num": num,
            "check": 1,
        };
        let has = 0;

        //判断是否重复值
        for (let k = 0; k < cartlist.length; k++) {
            if (cartlist[k].id == i) {
                has = 1;
                num = cartlist[k].num++;
                break;
            }
        }
        if (has == 0) {
            cartlist.push(infor);
        }
        changeValue();
    });
}




function Purchase(a) {
    this.arr = a.arr;
    this.startarr = a.startarr;
    this.box = document.querySelectorAll(a.box);
    this.clickPuchar = document.querySelectorAll(a.click);
    this.tagTimes = document.querySelectorAll(a.times);
    this.valTimes = document.querySelectorAll(a.timesSub);
    this.valText = document.querySelectorAll(a.end);
    this.m = [];
    this.sh = [];
    var _this = this;

    this.change = function (leftsecond, index, newSta, newArr) {
        //开始抢购

        if (newSta <= 0) {
            this.valText[index].innerHTML = "结束";
            this.clickPuchar[index].innerHTML = "开始抢购";

            //点击抢购事件，如果大于五次就抢完
            this.clickPuchar[index].onclick = function () {
                _this.m.push(index);
                var obj = {};
                for (let i = 0; i < _this.m.length; i++) {
                    if (!obj[_this.m[i]]) {
                        obj[_this.m[i]] = 1;
                    } else {
                        obj[_this.m[i]]++
                    }
                }

                _this.maxValue = 0; //重复的值
                _this.maxStr = _this.m[0]; //重复谁的值
                for (let i in obj) {
                    if (obj[i] > _this.maxValue) {
                        _this.maxValue = obj[i];
                        _this.maxStr = i;
                    }
                }
                if (_this.maxValue >= 5) {
                    let strTagTime = "已抢光";
                    let strClickP = "#ccc";
                    let strBox = "#888";
                    _this.valChange(_this.maxStr, strTagTime, strClickP, strBox);
                    clearInterval(this.sh);
                }
            }
        }
        this.valChange = function (index, str1, str2, str3) {
            this.tagTimes[index].innerHTML = str1;
            this.clickPuchar[index].innerHTML = str1;
            this.box[index].style.cursor = "no-drop";
            this.clickPuchar[index].style.cursor = "no-drop";
            this.clickPuchar[index].style.background = str2;
            this.tagTimes[index].style.background = this.box[index].style.background = str3;
        }
        //抢购结束判断
        if (newArr <= 0) {
            this.minuts = this.second = this.hour = this.day = 0;
            let strTagTime = "已结束";
            let strClickP = "rgb(60, 60, 60)";
            let strBox = "#ccc";
            this.valTimes[index].innerHTML = "抢购已结束";
            this.valChange(index, strTagTime, strClickP, strBox);
            clearInterval(this.sh);
        }


    }

    this.Timefresh = function (arr, i, start) {
        this.nowtime = new Date(); //现在
        this.starttime = new Date(start); //开始
        this.endtime = new Date(arr) //结束
        this.newStart = parseInt((this.starttime.getTime() - this.nowtime.getTime()) /
            1000); //计算距离抢购开始还有多少秒
        this.newArr = parseInt((this.endtime.getTime() - this.nowtime.getTime()) /
            1000); //计算距离抢购结束相差多少秒

        if (this.newStart <= 0) { //已经抢购开始时间，就赋结束时间的值
            this.temp = this.newArr;
        } else { //未过开始时间，就赋开始时间的值
            this.temp = this.newStart;
        }

        //计算相应的时间
        this.day = parseInt(this.temp / 3600 / 24); //天数
        this.hour = parseInt((this.temp / 3600) % 24); //小时
        this.second = parseInt((this.temp / 60) % 60); //分钟
        this.minuts = parseInt(this.temp % 60); //秒数

        //输出时间
        // for (let k = 0; k < this.valTimes.length; k++) {
        // if (i == k)

        this.valTimes[i].innerHTML = this.day + "天 " + this.hour + "时 " + this.second + "分 " + this
            .minuts + "秒";
        // }

        this.change(this.temp, i, this.newStart, this.newArr); //更改相应的文字   

    }


    //创建定时器
    for (let i = 0; i <= this.valTimes.length; i++) {
        this.sh = setInterval(() => {
            // console.log(i);   
            this.Timefresh(this.arr[i], i, this.startarr[i])
        }, 10);

    }
}
var pur = new Purchase({
    arr: ["2020/01/26,18:45:10", "2020/12/15,18:30:12", "2020/11/11,12:00:52", "2020/06/13,18:00:10",
        "2020/12/16,10:00:10", "2020/07/11,18:00:00", "2020/12/30,18:02:00", "2020/04/12,18:00:00",
        "2020/05/12,18:30:00", "2020/03/13,18:10:00", "2020/05/11,12:00:10", "2020/11/13,18:00:00"
    ],
    startarr: ["2020/01/24,19:13:00", "2020/12/13,18:00:00", "2020/10/11,12:00:00", "2020/05/13,18:10:00",
        "2020/12/13,10:00:00", "2020/02/01,18:10:00", "2020/12/17,18:15:00", "2020/03/12,18:00:00",
        "2020/04/12,11:30:00", "2020/02/13,12:00:52", "2020/04/11,12:02:00", "2020/02/02,18:00:00"
    ],

    box: [".box"],
    click: [".click"],
    times: [".times"],
    timesSub: [".times-sub"],
    end: [".end"],
});



function Rush(arg) {
    //初始化状态值
    var state = 1;

    //判断实例化时是否传值
    this.el = "rush-item";
    if (arg.el) this.el = arg.el;

    //判断实例化时是否传值
    this.attr = "data-timenow";
    if (arg.attr) this.attr = arg.attr;

    //判断实例化时是否传值
    this.dataEndTime = null;
    if (arg.dataEndTime) this.dataEndTime = arg.dataEndTime;

    //所有item数组 即构造出的模板
    this.item = document.getElementsByClassName(this.el);

    //计时器每秒更新方法体
    timing = setInterval(() => {
        this.before();
    }, 1000);

    //初始化执行一次该方法
    this.before();
}

Rush.prototype.getElements = function (i) {
    //获取显示抢购状态的DOM节点
    this.getTime = this.item[i].getElementsByClassName("shadow")[0].getElementsByClassName("img")[0].getElementsByClassName('get-time')[0];

    //获取抢购按钮的DOM节点
    this.btn = this.item[i].getElementsByClassName("info")[0].getElementsByTagName("button")[0];
}

Rush.prototype.setTime = function (second) {
    //把传入的秒数差转换成对应的小时、分钟、秒
    h = Math.floor((second / 3600) % 24);
    m = Math.floor((second / 60) % 60);
    s = Math.floor(second % 60);
}

Rush.prototype.timeAndDom = function (state, second) {
    //将抢购开始的状态值获取的second传入h、m、s计算的方法里面
    this.setTime(second);

    //当前状态值时，执行该方法里面的代码修改dom内容
    this.setDom(state);
}

Rush.prototype.before = function (second) {
    //让上面接收的值赋给方便调用的变量
    let dataNum = this.dataEndTime;

    //临时变量
    var tmp = [];

    //用for循环遍历之前的所有实例化模板对象的数组
    for (let i = 0; i < this.item.length; i++) {
        //更新状态值
        state = 1;

        this.getElements(i);

        //判断构造函数内是否有定义默认值
        if (this.dataEndTime == null) {
            //开始定义null，实例化时未传参，就获取DOM节点上面用data-储存的数据
            dataNum = this.getTime.getAttribute(this.attr);
        }

        //设置结束时间为data-上面定义的数据
        var endTime = new Date(dataNum);

        //实例化当前时间副本
        var nowTime = new Date();

        //getTime()方法获取Date()的毫秒时间，用抢购开始时间减去当前时间就是倒计时了，除以1000是将毫秒时间差转换成秒数，然后用Math.floor()取整数
        var second = Math.floor((endTime.getTime() - nowTime.getTime()) / 1000);

        this.timeAndDom(state, second);

        //判断之前设置的时间差，大于为未开始，小于等于（开始抢购了） 执行
        if (second <= 0) {
            //更新状态值
            state = 2;

            //第一次时间判断为抢购前到抢购开始
            //抢购开始后又有一次时间差的判定，用来确认抢购中的时间
            //在上一个endTime的时间基础上，将它的毫秒数加一个小时的毫秒数，就定义为抢购时间为一个小时
            var second = Math.floor(((endTime.getTime() + 1000 * 60 * 60 * 2) - nowTime.getTime()) / 1000);

            this.timeAndDom(state, second);

            //这里再次判断 加了 抢购一小时后的时间是否到了，到了则为抢购结束该执行的代码
            if (second <= 0) {
                //更新状态值
                state = 3;
                this.setDom(state);

                //把抢购时间结束的值，推进一个空数组里面存放，当数组长度等于 总共的 实例化对象数量的时候，代表所有的物品抢购时间已经结束，这时候就停止计时器
                if (tmp.push(second) == 6) {
                    clearInterval(timing);
                }
            }
        }
    }
}

Rush.prototype.setDom = function (state) {
    if (state == 1) {
        //html默认是隐藏了抢购时间标签，这里开始计时时显示
        this.getTime.style.display = "block";

        //初始化抢购状态为未开始，将文本写入到html里面
        this.getTime.innerHTML = "距离抢购<strong>开始</strong>还有<br>" + "<strong>" + h + "</strong>" + " 小时 " + "<strong>" + m + "</strong>" + " 分 " + "<strong>" + s + "</strong>" + " 秒";
    }
    if (state == 2) {
        //抢购开始时将html对应节点内容更新状态
        this.getTime.innerHTML = "抢购<strong>剩余时间</strong><br>" + "<strong>" + h + "</strong>" + " 小时 " + "<strong>" + m + "</strong>" + " 分 " + "<strong>" + s + "</strong>" + " 秒";
        this.btn.innerHTML = "立即抢购";
        this.btn.style.backgroundColor = "#f60";
    }
    if (state == 3) {
        //抢购结束后更新html对应内容和样式
        this.getTime.innerHTML = "抢购结束<br>敬请关注";
        this.btn.innerHTML = "已抢光";
        this.btn.style.backgroundColor = "#f2f2f2";
        this.btn.style.color = "#999";
        this.btn.style.cursor = "no-drop";
    }
}




//一加载滚动
$("html, body").scrollTop(0).animate({
    "scrollTop": $(".section1").offset().top + "px",
});



//当浏览器滚动时
function scrchange() {
    var STop = document.documentElement.scrollTop;
    let rushItem = $('.rush-list').offset().top - document.documentElement.clientHeight;
    if (STop >= rushItem) {
        $(".rush-list").css({
            "margin-top": "20px",
        });
    }

    $.each($('.box'), (i) => {
        // console.log($('.gallery-box').eq(i).offset().top);
        let imghei = $('.box').eq(i).offset().top - document.documentElement.clientHeight;
        if (STop >= imghei) {
            $(".box").eq(i).css({
                // "opacity": 1,
                "margin-top": "0px"
            })
        }
    })
    $.each($('.main'), (i) => {
        // console.log($('.gallery-box').eq(i).offset().top);
        let imghei2 = $('.main').eq(i).offset().top - document.documentElement.clientHeight;
        if (STop >= imghei2) {
            $(".main").eq(i).css({
                // "opacity": 1,
                "margin": "1rem auto"
            })
        }
    })
}

var k = 1;
scrchange();
window.onscroll = function () {
    scrchange();
}


/*点击选择省份，根据省名找到下标0所对应的数，
         *判断省名下标0，找到市下标2所对应的城市并输出市
         *
         */
var privces = [
    [1, "云南省", 0],
    [2, "四川省", 0],
    [3, "陕西省", 0],
    [4, "山东省", 0],
    [5, "江苏省", 0],
    [6, "安徽省", 0],
];
var citys = [
    //云南省
    [1, "昆明市", 1],
    [2, "曲靖市", 1],
    [3, "玉溪市", 1],
    //四川省
    [4, "成都市", 2],
    [5, "绵阳市", 2],
    [6, "德阳市", 2],
    //陕西
    [7, "西安市", 3],
    [8, "咸阳市", 3],
    [9, "宝鸡市", 3],

    //山东
    [10, "济南市", 4],
    [11, "青岛市", 4],
    [12, "淄博市", 4],
    //江苏
    [13, "南京市", 5],
    [14, "无锡市", 5],
    [15, "徐州市", 5],
    //安徽
    [16, "合肥市", 6],
    [17, "芜湖市", 6],
    [18, "蚌埠市", 6],

];
var cityChild = [
    //云南省
    //昆明市
    [1, "五华区", 1],
    [2, "盘龙区", 1],
    //曲靖市
    [3, "马龙县", 2],
    //玉溪市
    [4, "红塔区", 3],

    //四川省
    //成都市
    [5, "武侯区", 4],
    [6, "双流区", 4],
    [7, "锦江区", 4],
    //绵阳市
    [8, "涪城区", 5],
    [9, "三台县", 5],
    //德阳市
    [10, "旌阳区", 6],
    [11, "中江县", 6],

    //陕西省
    //西安市
    [12, "新城区", 7],
    [13, "碑林区", 7],
    //咸阳市
    [14, "秦都区", 8],
    [15, "杨凌区", 8],
    //宝鸡市
    [16, "渭滨区", 9],
    [17, "岐山县", 9],

    //山东省
    //济南市
    [18, "历下区", 10],
    [19, "槐荫区", 10],
    //青岛市
    [20, "市南区", 11],
    [21, "市北区", 11],
    //淄博市
    [22, "淄川区", 12],
    [23, "张店县", 12],

    //江苏省
    //南京市
    [24, "玄武区", 13],
    [25, "白下区", 13],
    //无锡市
    [26, "崇安区", 14],
    [27, "南长区", 14],
    //徐州市
    [28, "鼓楼区", 15],
    [29, "云龙区", 15],

];

//获取省列表
var province = document.getElementById("province");
var city = document.getElementById("city");
var district = document.getElementById("district");
// let str = "<option>-请选择省-</option>";
let str = "";
for (let i in privces) {
    opt = document.createElement("option");
    opt.className = "priOpt";
    province.appendChild(opt);
    opt.innerHTML = privces[i][1];
    str += "<option>" + privces[i][1] + "</option>"
}
province.innerHTML = str;
//得到省值
// var priOpt = document.getElementsByClassName("priOpt");
// console.log(priOpt[0].value);

//根据省值得到首位对应的值。得到相应的城市
function printCity(name) {
    // console.log("name", name.length);
    let str = "";
    for (let i = 0; i < name.length; i++) {
        str += "<option>" + name[i][1] + "</option>";
    }
    city.innerHTML = str;
}

function getPriv(name) {
    // console.log(name[0][0]);
    var newGetcity = citys.filter(
        (item) => {
            if (item[2] == name[0][0]) {
                return true;
            }
        }
    );
    // console.log(newGetcity);
    return printCity(newGetcity);
}

function provic() {
    // proval();
    var province = document.getElementById("province");
    var newpriOpt = privces.filter((item) => {
        if (item[1] == province[province.options.selectedIndex].value) { //获取首位值
            return true;
        }
    });
    return getPriv(newpriOpt); //得到值省首位值,
}


// console.log(citys);
// console.log(cityChild[2]);

function printChild(name) {
    let strchild = "";
    for (let i = 0; i < name.length; i++) {
        strchild += "<option>" + name[i][1] + "</option>";
    }

    district.innerHTML = strchild;

}
function dis() {
    window.localStorage.setItem("neloca", $("#district option:selected").val());
    $("#header-loca-di").text(localStorage.getItem("neloca"));
    // localStorage.clear();
}
if (localStorage.getItem("neloca")) {
    $("#header-loca-di").text(localStorage.getItem("neloca"));
} else {
    $("#header-loca-di").text("成都");
}
function getsCity(name) {
    // console.log("naem", name[0][0]);
    var newcityChild = cityChild.filter((item) => {
        // console.log("item", item[2]);
        if (item[2] == name[0][0]) { //根据
            return true;
        }
    });
    // console.log("找到对应去", newcityChild);
    return printChild(newcityChild);
}

function cityclick() {
    var cityCl = document.getElementById("city");
    var newcity = citys.filter((item) => {
        if (item[1] == cityCl[cityCl.options.selectedIndex].value) {
            return true;
        }
    });
    // console.log("newcity", newcity);
    return getsCity(newcity); //得到市值
}
// localStorage.clear();
var usevalue = window.localStorage.getItem("username");

if (usevalue == null || usevalue.length <= 0) {
    usevalue = "请登录";
}


$("#header-user").html(usevalue);
if ($("#header-user").html() == "请登录") {
    var timerUser = setInterval(function () {
        // alert("请登录博汇商城，满足你的需求");
    }, 36000);
} else {
    clearInterval(timerUser);
}
