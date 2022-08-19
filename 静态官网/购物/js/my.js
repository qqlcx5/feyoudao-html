//获取账号和密码
SQluser();
function SQluser() {
    var Xmlhttp = null;

    //创建
    if (window.XMLHttpRequest) {
        Xmlhttp = new XMLHttpRequest();
    } else {
        Xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //异步获取
    Xmlhttp.open("POST", "../php/login.php", true);
    Xmlhttp.send();


    //状态值
    Xmlhttp.onreadystatechange = function () {


        if (Xmlhttp.readyState == 4 && Xmlhttp.status == 200) {
            var str = JSON.parse(Xmlhttp.responseText); //获取到的数据
            // console.log(str);
            shuju(str);
        }
    }
}
var listTag = document.querySelector("#list");
var use = window.localStorage.getItem("username");
function shuju(res) {
    console.log(res);
    var temp = "<ul class='rowlist'><li>用户名</li><li>密码</li><li>电话号码</li><li>身份证号码</li><li>QQ</li><li>邮箱</li><li>操作</li></ul>"
    if (res&&use) {
        if (use == "admin") {
            for (let i = 0; i < res.length; i++) {
                temp += `<ul class='rowlist'><li><input value="${res[i].username}" disabled></li><li><input value="${res[i].pwd}"></li><li><input value="${res[i].tel}"></li><li><input value="${res[i].carid}"></li><li><input value="${res[i].qq.length > 1 ? res[i].qq : "无"}"></li><li><input value="${res[i].mail.length > 1 ? res[i].mail : "无"}"></li><li><button onclick="chan(${i + 1})">修改</button><button onclick="del(${i + 1})">删除</button></li></ul>`
            }

        } else {
            for (let i = 0; i < res.length; i++) {
                if (res[i].username == use) {
                    temp += `<ul class='rowlist'><li>${res[i].username}</li><li>${res[i].pwd}</li><li>${res[i].tel}</li><li>${res[i].carid}</li><li>${res[i].qq.length > 1 ? res[i].qq : "无"}</li><li>${res[i].mail.length > 1 ? res[i].mail : "无"}</li><li>非管理员不能修改</li></ul>`
                }
            }
        }
        // console.log(temp);
        listTag.innerHTML = temp
    } else { }
}

//修改，删除
function chan(k) {
    // console.log(k);
    var listdata = document.querySelectorAll(".rowlist")[k].querySelectorAll("li");
    // console.log(listdata[0]);
    ajaxFun({
        type: "post",
        asyn: true,
        data: {
            "username": listdata[0].querySelector("input").value,
            "psd": listdata[1].querySelector("input").value,
            "tel": listdata[2].querySelector("input").value,
            "carid": listdata[3].querySelector("input").value,
            "mail": listdata[5].querySelector("input").value,
            "qq": listdata[4].querySelector("input").value,
        },
        withCredentials: true,
        url: '../php/my.php',
        success: function (re) {
            // if (re) {
            //     re = JSON.parse(re);
            // }
            console.log(re);
            if (re != "修改失败") {
                alert("修改成功");
            } else {
                alert("修改失败");
            }
            // window.localStorage.setItem("username", re);
        },
        outtime: 2000,
        onouttime: function () {
            console.log('超时了');
        }
    });
}
function del(k) {
    var listdata = document.querySelectorAll(".rowlist")[k].querySelectorAll("li");
    // console.log(listdata[0]);
    ajaxFun({
        type: "post",
        asyn: true,
        data: {
            "username": listdata[0].querySelector("input").value,
            "k": 1
        },
        withCredentials: true,
        url: '../php/my.php',
        success: function (re) {
            // if (re) {
            //     re = JSON.parse(re);
            // }
            console.log(re);
            if (re != "修改失败") {
                alert("删除成功");
            } else {
                alert("删除失败");
            }
            // window.localStorage.setItem("username", re);
        },
        outtime: 2000,
        onouttime: function () {
            console.log('超时了');
        }
    });
}



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