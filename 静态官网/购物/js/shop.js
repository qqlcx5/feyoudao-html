function Grid(opt) {

    var __this = _this = this;
    //获取对象

    opt.el = opt.el.length > 0 ? opt.el : ".grid";
    this.grid = document.querySelector(opt.el);
    this.gridLi = document.querySelector(opt.el).querySelectorAll("li");


    //监听窗口变化

    this.windWidth = function () {
        _this.grid.style.height = _this.grid.clientWidth * .75 + "px";
    }
    window.addEventListener("resize", _this.windWidth);

    //默认窗口尺寸
    this.windWidth();


    //创建阴影盒子
    this.createBox = function (index) {
        var shade = document.createElement("div");
        shade.className = "box-shadow";
        _this.gridLi[index].appendChild(shade);
    }


    //鼠标移入修改阴影
    this.BoxRemove = function (index) {
        var showbox = document.querySelectorAll(".box-shadow");
        _this.gridLi[index].classList.add("show-box");
        showbox[index].style.background = "rgba(255,255,255,0)"; //阴影
    }

    //鼠标移出
    this.BoxShow = function (index) {
        var showbox = document.querySelectorAll(".box-shadow");
        _this.gridLi[index].classList.remove("show-box");
        showbox[index].style.background = "rgba(214, 214, 214, 0.2)";
    }

    //监听鼠标盒子

    for (let i = 0; i < this.gridLi.length; i++) {
        this.createBox(i);
        this.gridLi[i].addEventListener("mouseover", function () {
            _this.BoxRemove(i);
            _this.gridLi[i].addEventListener("mouseout", function () {
                __this.BoxShow(i);
            });
        });

    }


}

var grid1 = new Grid({
    el: ".grid",
});