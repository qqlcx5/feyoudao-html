//座机号
//邮箱
//身份证
//手机号/座机号
//用户名
//密码
//邮编
//QQ
// function regQ() {
//     this.phone = function (value) {
//         var re = /^1[3456789][0-9]{9}/.test(value);
//         return re;
//     }
//     this.username = function (value) {
//         var re = /[^0-9]{6,12}/.test(value);
//         return re;
//     }
// }
// var reg = new regQ();

var TagUser = document.querySelector("#username"); //用户名必须由4-15位数字和字母组成,字母开头
var TagPsd = document.querySelector("#psd"); //以字母开头，长度在6~18之间，只能包含字母、数字
var TagRepsd = document.querySelector("#repsd"); //确认密码
var TagTel = document.querySelector("#tel"); //手机号码
var TagId = document.querySelector("#id"); //身份证号
var TagQQ = document.querySelector("#qq"); //qq
var TagMail = document.querySelector("#mail"); //email
var TagSubmit = document.querySelector(".submit"); //确认
var TagLabel = document.querySelectorAll(".hint"); //提示

//获取对象
//  var box = document.querySelector(".box");


function regQ() {
    this.username = function (value) {
        var re = /^[a-zA-Z][0-9a-zA-Z]{3,14}$/.test(value);
        return re;
    }
    this.psd = function (value) {
        var re = /^[a-zA-Z]\w{5,17}$/.test(value);
        return re;
    }
    this.phone = function (value) {
        var re = /^1[3456789][0-9]{9}/.test(value);
        return re;
    }
    this.id = function (value) {
        var re = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(value);
        return re;
    }
    this.qq = function (value) {
        var re = /^[1-9][0-9]{4,15}$/.test(value);
        return re;
    }
    this.mail = function (value) {
        var re = /^\w+([-+.\w])*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        return re;
    }

}
var reg = new regQ();

//ajax
function ajaxFun(opt) {

    //初始化
    var type = "post";
    var asyn = true;
    var withCredentials = false; //跨域
    var data = {};
    var url = "";
    var outtime = 10000;
    var success = function () { };
    var error = function () { };
    var onouttime = function () { };

    if (!opt.url) {
        console.log('必填访问地址');
        return false;
    }

    //替换传入值
    if (opt.type) {
        type = opt.type;
    }
    if (opt.asyn) {
        asyn = opt.asyn;
    }
    if (opt.withCredentials) {
        withCredentials = opt.withCredentials;
    }
    if (opt.data) {
        data = opt.data;
    }
    if (opt.url) {
        url = opt.url;
    }
    if (opt.outtime) {
        outtime = opt.outtime;
    }
    if (opt.success) {
        success = opt.success;
    }
    if (opt.onouttime) {
        onouttime = opt.onouttime;
    }

    //拼接查询字符串
    var datastr = "";
    for (key in data) {
        if (datastr) {
            datastr += "&";
        }
        datastr = datastr + `${key}=${data[key]}`;
    }

    // 获取 XMLHttpRequest对象
    var xmlHttp = new XMLHttpRequest();

    // 连接服务器
    xmlHttp.open(type, url, asyn); //api地址

    //跨域
    if (withCredentials) {
        xmlHttp.withCredentials = withCredentials; //跨域
    }

    // 设置请求头的Content-Type
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // console.log(datastr);

    // 发送数据
    xmlHttp.send(datastr);
    // 回调函数  success
    xmlHttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            success(this.responseText);
        }
    };
    xmlHttp.ontimeout = function () {
        onouttime();
    };
    xmlHttp.onerror = function () {
        console.log(arguments);
    }

}





TagSubmit.onclick = function () {
    //用户名必须由4-15位数字和字母组成,字母开头
    TagUserValue = /^[a-zA-Z][0-9a-zA-Z]{3,14}$/.test(TagUser.value);
    //以字母开头，长度在6~18之间，只能包含字母、数字
    TagPsdValue = /^[a-zA-Z]\w{5,17}$/.test(TagPsd.value);
    //手机号码
    TagTelValue = /^1[356978][0-9]{9}$/.test(TagTel.value);
    //身份证号
    TagIdValue =
        /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/
            .test(TagId.value);
    //QQ
    if (TagQQ.value.length > 0) {
        TagQQValue = /^[1-9][0-9]{4,15}$/.test(TagQQ.value);
    }
    else {
        TagQQValue = true;
    }
    //mail
    if (TagMail.value.length > 0) {
        TagMailValue = /^\w+([-+.\w])*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(TagMail.value);
    } else {
        TagMailValue = true;
    }
    if (!TagUserValue) {
        TagLabel[0].innerHTML = "用户名输入有误";

    } else if (!TagPsdValue) {
        TagLabel[0].style.visibility = "hidden";
        TagLabel[1].innerHTML = "密码输入有误";

    } else if (TagPsd.value != TagRepsd.value) {
        TagLabel[1].style.visibility = "hidden";
        TagLabel[2].innerHTML = "确认密码有误";
    } else if (!TagTelValue) {
        TagLabel[2].style.visibility = "hidden";
        TagLabel[3].innerHTML = "手机号码输入有误";
    } else if (!TagIdValue) {
        TagLabel[3].style.visibility = "hidden";
        TagLabel[4].innerHTML = "身份证号码有误";

    } else if (!TagQQValue) {
        TagLabel[4].style.visibility = "hidden";
        TagLabel[5].innerHTML = "不是QQ";
    } else if (!TagMailValue) {
        TagLabel[5].style.visibility = "hidden";
        TagLabel[6].innerHTML = "邮箱输入有误";
    } else {
        TagLabel[6].style.visibility = "hidden";
        //调用函数
        ajaxFun({
            type: "post",
            asyn: true,
            data: {
                "username": TagUser.value,
                "psd": TagPsd.value,
                "tel": TagTel.value,
                "carid": TagId.value,
                "mail": TagMail.value,
                "qq": TagQQ.value,
            },
            withCredentials: true,
            url: '../php/sigin.php',
            success: function (re) {
                // if (re) {
                //     re = JSON.parse(re);
                // }
                console.log(re);
                // console.log("发送成功");
                window.localStorage.setItem("username", re);
                // window.localStorage.clear();
                // console.log(window.localStorage.getItem("username"));

                setTimeout(function () {
                    window.location.assign("index.html");
                }, 3000);

                // alert("恭喜" + re + "注册成功");
            },
            outtime: 2000,
            onouttime: function () {
                console.log('超时了');

            }
        });
        // window.location.assign("http://www.bh.com/php/sigin.php");

        TagSubmit.innerHTML = "注册成功";


    }

}


