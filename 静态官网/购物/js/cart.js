var countPrice = document.querySelector(".price");
var Tagtop = document.querySelector(".top");
var main = document.querySelector(".main");
var count = document.querySelector(".footer-count").querySelectorAll("div")[2];
var goods = document.querySelector(".goods");
var checall = document.querySelectorAll(".checall");
var goodsnum = document.querySelector(".goodsnum");
var delAll = document.querySelector(".delall");
checall[0] = checall[1];
// console.log(footerChe);


var newcartList = [];
var cartList = [];
var che = [];
// localStorage.clear()
//取缓存数据
let strCartList = window.localStorage.getItem("cartlist");

//将缓存数据字符串转为json格式
if (strCartList) {
    cartList = JSON.parse(strCartList);
}
var TagDiv = [];

//创建节点
function createTag(i) {
    let Tagmain = document.createElement("li");
    for (let j = 0; j < 6; j++) {
        TagDiv[j] = document.createElement("div");
        Tagmain.appendChild(TagDiv[j]);

    }
    let TagInput1 = document.createElement("input");
    let TagInput2 = document.createElement("input");
    let TagImg = document.createElement("img");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let Taga = document.createElement("a");
    Tagmain.className = "main-content"
    Taga.href = "index.html";

    TagInput1.type = "checkbox";
    TagInput1.className = "check";
    TagInput2.type = "number";
    TagInput2.className = "num";
    btn1.innerHTML = "-";
    btn2.innerHTML = "+";
    TagInput1.checked = true;


    TagDiv[5].innerHTML = "--";

    Taga.innerHTML = cartList[i].title;
    TagInput2.value = cartList[i].num;
    TagImg.src = "images/phone" + (cartList[i].id + 1) + ".jpg"
    TagDiv[2].innerHTML = "￥" + cartList[i].price;
    TagDiv[0].appendChild(TagInput1);
    TagDiv[0].appendChild(TagImg);
    TagDiv[3].append(btn1);
    TagDiv[3].append(TagInput2);
    TagDiv[3].append(btn2);
    TagDiv[1].appendChild(Taga);
    main.appendChild(Tagmain);
    checkedAll();

}


//输出价格
var str = 0;

function countValue(i) {
    str = 0;
    let ss = [];
    if (cartList.length > 0) {
        var checkes = document.querySelectorAll(".check");
        for (let k = 0; k < checkes.length; k++) {
            if (checkes[k].checked) {
                ss.push(cartList[k]);
            }
        }
        if (i >= 0) {
            Tagmain[i].querySelectorAll("div")[4].innerHTML = cartList[i].price * cartList[i].num + "元";
        }
        for (let j = 0; j < ss.length; j++) {
            str += cartList[j].price * cartList[j].num;
        }
    }

    countPrice.innerHTML = "￥" + str;
    goods.innerHTML = cartList.length;
    countPrice.style.color = "rgb(212, 40, 40)";
}
//添加编辑事件
var flag = 1;
Tagtop.querySelectorAll("li")[4].addEventListener("click", () => {
    if (flag) {

        flag = 0;
        for (let i = 0; i < Tagmain.length; i++) {
            Tagmain[i].querySelectorAll("div")[5].innerHTML = "删除";
            Tagmain[i].querySelectorAll("div")[5].style.visibility = "visible";
            Tagmain[i].querySelectorAll("div")[5].style.cursor = "pointer";
            //删除元素
            Tagmain[i].querySelectorAll("div")[5].addEventListener("click", () => { //删除
                Tagmain[i].remove(); //移出li
                location.reload(); //刷新页面
                countValue(i); //价格

                cartList.splice(i, 1); //删除缓存元素
                setChange();
            });
        }


    } else {
        flag = 1;
        for (let i = 0; i < Tagmain.length; i++) {
            Tagtop.querySelectorAll("li")[4].style.color = "#333";
            Tagmain[i].querySelectorAll("div")[5].style.visibility = "hidden";
        }
    }
});





for (let i = 0; i < cartList.length; i++) {
    createTag(i); //创建节点
    var Tagmain = document.querySelectorAll(".main-content");

    countValue(i);

    //添加监听事件，监听数量-
    Tagmain[i].querySelectorAll("div")[3].querySelectorAll("button")[0].onclick = function () {
        if (cartList[i].num > 0) {
            cartList[i].num--;
            Tagmain[i].querySelectorAll("div")[3].querySelector("input").value = cartList[i].num;
            Tagmain[i].querySelectorAll("div")[3].querySelectorAll("button")[0].style.cursor = "default";
            changeValue(i);
            countValue(i); //得到价格
        } else {
            Tagtop.querySelector("input").checked = false;
            Tagmain[i].querySelectorAll("div")[3].querySelectorAll("button")[0].style.cursor = "not-allowed";
            Tagmain[i].querySelectorAll("div")[3].querySelectorAll("button")[0].style.background = "rgb(220,220,220)";
            checkes[i].checked = false;
            checkedAll()
        }

    }

    //添加监听事件，监听数量+
    Tagmain[i].querySelectorAll("div")[3].querySelectorAll("button")[1].onclick = function () {
        if (cartList[i].num < 100) {
            cartList[i].num++;
            Tagmain[i].querySelectorAll("div")[3].querySelector("input").value = cartList[i].num;
            changeValue(i);
            checkes[i].checked = true;
            checkedAll()
        }
        countValue(i);
    }




    //判断是否全被选中
    var checkes = document.querySelectorAll(".check");


    che.push(checkes[i]);
    checkes[i].addEventListener("click", () => {
        checkedAll();
        countValue(i);
    })


    TagDiv[4].style.color = "rgb(212, 40, 40)";

}

//删除选中
delAll.addEventListener("click", () => {
    fundelAll();
});
function fundelAll() {
    var m = [];
    for (let k = 0; k < checkes.length; k++) {
        if (checkes[k].checked) {
            Tagmain[k].remove();
            countValue(k);
            m.push(cartList[k]);
        }
    }
    reAll(m);
    setChange();
}
function reAll(m) {
    var aaa = [];
    for (let i = 0; i < cartList.length; i++) {
        var tmp = 1;
        for (j = 0; j < m.length; j++) {

            if (cartList[i] == m[j]) { //如果不存在就push
                tmp = 0;
            }
        }
        if (tmp) {
            aaa.push(cartList[i]);
        }
    }
    cartList = aaa;
    location.reload();
}





//选择框函数
function checkedAll() {
    var checkes = document.querySelectorAll(".check"); //获取每件商品的选择框
    //判断是否都被选中
    var everyChecked = che.every((item) => {
        if (item.checked == true) {
            return true;
        }
    });

    if (everyChecked == true) {
        checall[0].checked = true;
        checall[1].checked = true;
    } else {
        checall[0].checked = false;
        checall[1].checked = false;
    }
    goodsNums();


    //已选择件数
    function goodsNums() {
        var s = 0;
        for (var k = 0; k < checkes.length; k++) {
            if (checkes[k].checked) {
                s += 1;
            }
            goodsnum.innerHTML = s;
        }
    }


    //当点击全选时触发
    checall[1].addEventListener("click", () => {
        for (let j = 0; j < checkes.length; j++) {
            if (checall[1].checked) {
                checkes[j].checked = true;
                checall[0].checked = true;
            } else {
                checkes[j].checked = false;
                checall[0].checked = false;
            }
        }
        goodsNums();
        countValue();
    });
    checall[0].addEventListener("click", () => {
        for (let j = 0; j < checkes.length; j++) {
            if (checall[0].checked) {
                checkes[j].checked = true;
                checall[1].checked = true;
            } else {
                checkes[j].checked = false;
                checall[1].checked = false;
            }
        }
        goodsNums();
        countValue();
    });
}


//结算提示
count.addEventListener("click", () => {
    var countp = prompt("确认支付", str + "元");
    var usevalue = window.localStorage.getItem("username");
    if (usevalue == null || usevalue.length <= 0) {
        alert("请先登录，将跳转到登录界面");
        window.location.assign("login.html");//跳转到下一个页面
    } else {
        if (countp) {
            alert("支付成功");
            fundelAll();
        } else {
            alert("支付失败");
        }
    }

});


//更新缓存
function changeValue(i) {

    let infor = {
        "id": cartList[i].id,
        "title": cartList[i].title,
        "price": cartList[i].prices,
        "num": cartList[i].num,
        "check": 1,
    };
    setChange();
}

function setChange() {
    ncartList = JSON.stringify(cartList);
    //修改，重新赋值                             
    window.localStorage.setItem("cartlist", ncartList);
}

var usevalue = window.localStorage.getItem("username");
if (usevalue == null || usevalue.length <= 0) {
    var timerUser = setInterval(function () {
        alert("请登录博汇商城，满足你的需求");
    }, 36000);
} else {
    clearInterval(timerUser);
}







//解析地址，获取数据
// var loc = location.href;
// console.log(loc);
// var n1 = loc.length;
// var n2 = loc.indexOf("=");
// var id = decodeURI(loc.substr(n2 + 1, n1 - n2));
// id = id.split(",");
// if (id.length > 1) {
//     for (let i = 0; i < id.length; i++) {
//         num[id[i]].value = "1";
//         check[id[i]].checked = "checked";
//     }
// }

//初始化-网页加载
//拿缓存
// var cartlist = ////.
// [
//     {id:5,title:"a",num:1,check:0},
//     {id:6,title:"a",num:1,check:0},
//     {id:7,title:"a",num:1,check:0}
// ]

// carlist = cartlist.filter((item)=>{
//     if(item.id!=""){
//         return true
//     }
// })


//判断缓存
//showList(datalist)
//遍历数据

//输出列表


//单个删除事件
// 1、删除DOM标签 2、删除全局数据变量对应的数 3、写缓存 4、计算总价 5、选框判断

//单选

//全选

//批量删除事件

//数量增加

//数量减少

//计算总价