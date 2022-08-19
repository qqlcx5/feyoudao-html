//卡号
var card = document.querySelector(".login-id").querySelector("input");

//密码
var loginPwd = document.querySelector(".login-pwd");
var pwd = loginPwd.querySelector("input");
var eye = loginPwd.querySelector("span");

//按钮
var btn = document.querySelector(".login-btn");
var loginBg = document.querySelector(".login-bg img");

loginBg.onclick = function () {
    window.location.assign("index.html");//跳转到下一个页面
}
function show(str, TagInput) {
    TagInput.value = str + "有误";
    TagInput.style.color = "red";
    TagInput.style.fontSize = "14px";
    setTimeout(function () {
        TagInput.value = "";
        TagInput.placeholder = str;
        TagInput.style.fontSize = "18px";
        TagInput.style.color = "#000";
    }, 2000);
}
//验证卡号
//大于12位是数字
var id = false;
var flagpwd = false;



//正则判断
card.onblur = function () {
    id = /^[a-zA-Z][0-9a-zA-Z]{3,14}$/.test(card.value);
    if (!id) {
        let str = "卡号";
        show(str, card);
    }
}

pwd.onblur = function () {
    flagpwd = /^[a-zA-Z]\w{5,17}$/.test(pwd.value);
    if (!flagpwd) {
        let str = "密码";
        show(str, pwd);
    }
}


//密码显示与隐藏
var flag = 0;
eye.onclick = function () {

    if (flag == 0) {
        pwd.type = 'text';
        eye.className = "iconfont icon-xianshimima";
        flag = 1;
    } else {
        pwd.type = 'password';
        eye.className = "iconfont icon-yincangmima";
        flag = 0;
    }
}



//点击下一步
btn.onclick = function () {
    validateCode();

}
var nextflag = 0;
//检查验证码是否正确
function validateCode() {
    SQluser();
}


//判断与数据库里的数据是否一致
function judge(str) {
    var ss = str.filter((item) => {
        if (item.username == card.value && item.pwd == pwd.value) {
            nextflag = 1;
            //获取显示区生成的验证码
            var checkCode = document.querySelector(".vcode");
            //获取输入的验证码
            var inputCode = document.querySelector(".vcode-in");

            if (inputCode.value.length <= 0) {
                str = "验证码";
                show(str, inputCode);
            } else if (inputCode.value.toUpperCase() != checkCode.innerHTML.toUpperCase()) {
                str = "验证码输入";
                show(str, inputCode);
                createCode(4);
            } else if (id && flagpwd && nextflag) {
                window.location.assign("index.html");//跳转到下一个页面
                window.localStorage.setItem("username", card.value);
                alert("欢迎" + card.value + "登录");
            } else {
                alert("请检查输入是否正确");
            }
        }
    });
}


//获取账号和密码
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
            judge(str);
        }
    }
}