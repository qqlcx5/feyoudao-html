/*
	封装轮播图类
*/
// class Carousel {
// 	constructor({el, timeout = 3000}) {
// 		this.el = el;
// 		this.timeout = timeout;

// 		// 鼠标移入移出事件
// 		let directionBtn = this.el.getElementsByClassName('direction-btn')[0];
// 		this.el.onmouseover = () => {
// 			directionBtn.style.display = 'block';
// 			// 清除定时器
// 			clearInterval(this.timer);
// 		}
// 		this.el.onmouseout = () => {
// 			directionBtn.style.display = 'none';
// 			// 再次自动轮播
// 			this.autoMove();
// 		}


// 		// 复制carousel-list的第一个LI到最后
// 		let carouselList = this.el.getElementsByClassName('carousel-list')[0];
// 		let firstLi = carouselList.children[0];
// 		this.liWidth = firstLi.offsetWidth;    // 每张图片的宽度
		
// 		carouselList.innerHTML += firstLi.outerHTML; // 复制第一张图片
// 		this.imgLen = carouselList.children.length; // 图片的个数

// 		// 设置最新的UL宽度
// 		carouselList.style.width = this.imgLen * this.liWidth + 'px';

// 		this.carouselList = carouselList;


// 		// 添加LI的下标
// 		this.liIndex = 0;
// 		// 添加按钮的下标
// 		this.dotIndex = 0;

// 		// 获取按钮的长度
// 		this.dots = this.el.getElementsByClassName('dots')[0];
// 		this.dotLen = this.dots.children.length;

// 		for(let i = 0; i < this.dotLen; i++) {
// 			this.dots.children[i].onmouseover = () => {
// 				this.liIndex = i;
// 				this.dotIndex = i;

// 				// 让UL运动
// 				bufferMove(this.carouselList, {left: - this.liIndex * this.liWidth});
// 				// 切换按钮
// 				this.dotMove();
// 			}
// 		}

// 		// 给左侧按钮添加点击事件
// 		let prev = this.el.getElementsByClassName('prev')[0];

// 		prev.onclick = () => {
// 			this.leftMove();
// 		}

// 		// 给右侧按钮添加点击事件
// 		let next = this.el.getElementsByClassName('next')[0];

// 		next.onclick = () => {
// 			this.rightMove();
// 		}

// 		// 自动轮播
// 		this.autoMove();
// 	}

// 	autoMove() {
// 		this.timer = setInterval(() => {
// 			this.rightMove();
// 		}, this.timeout);
// 	}

// 	leftMove() {
// 		this.liIndex--;
// 		if(this.liIndex < 0) {
// 			this.carouselList.style.left = - (this.imgLen - 1) * this.liWidth + 'px';
// 			this.liIndex = this.imgLen - 2;
// 		}
// 		bufferMove(this.carouselList, {left: - this.liIndex * this.liWidth});

// 		// 按钮切换
// 		this.dotIndex--;
// 		this.dotMove();
// 	}

// 	rightMove() {
// 		// 图片运动
// 		this.liIndex++;

// 		if(this.liIndex >= this.imgLen) {
// 			this.carouselList.style.left = 0
// 			this.liIndex = 1
// 		}
// 		bufferMove(this.carouselList, {left: - this.liIndex * this.liWidth});

// 		// 按钮切换
// 		this.dotIndex++;
// 		this.dotMove();
// 	}
// 	dotMove() {

// 		// 左侧方向的判断
// 		if(this.dotIndex < 0) {
// 			this.dotIndex = this.dotLen - 1;
// 		}
// 		// 右侧方向的判断
// 		if(this.dotIndex >= this.dotLen) {
// 			this.dotIndex = 0;
// 		}

// 		for(let i = 0; i < this.dotLen; i++) {
// 			this.dots.children[i].className = '';
// 		}
// 		this.dots.children[this.dotIndex].className = 'active';
// 	}
// }

//淡入淡出轮播图

$(function(){
            //第一张显示
            $(".pic li").eq(0).show();
            //鼠标滑过手动切换，淡入淡出
            $("#position li").mouseover(function() {
                $(this).addClass('cur').siblings().removeClass("cur");
                var index = $(this).index();
                i = index;//不加这句有个bug，鼠标移出小圆点后，自动轮播不是小圆点的后一个
                // $(".pic li").eq(index).show().siblings().hide();
                $(".pic li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
            });
            //自动轮播
            var i=0;
            var timer=setInterval(play,3000);
            //向右切换
            var play=function(){
                i++;
                i = i > 4 ? 0 : i ;
                $("#position li").eq(i).addClass('cur').siblings().removeClass("cur");
                $(".pic li").eq(i).fadeIn(1000).siblings().fadeOut(1000);
            }
            //向左切换
            var playLeft=function(){
                i--;
                i = i < 0 ? 4 : i ;
                $("#position li").eq(i).addClass('cur').siblings().removeClass("cur");
                $(".pic li").eq(i).fadeIn(1000).siblings().fadeOut(1000);
            }
            //鼠标移入移出效果
            $("#container").hover(function() {
                clearInterval(timer);
            }, function() {
                timer=setInterval(play,3000);
            });
            //左右点击切换
            $("#prev").click(function(){
                playLeft();
            })
            $("#next").click(function(){
                play();
            })
        })