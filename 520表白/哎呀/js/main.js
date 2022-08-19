
/*字符拼接区*/
var introduce =' \/*\n  * Hi,林茜小姐姐 \n  * 我寻思着你这么漂亮得有人送你白色情人节礼物啊，别嫌弃哟~ \n  * 作为一个程序猿,发挥程序猿的特长就送你张网页吧~  \n  * 我现在要在这个空白的网页上加点东西\n */';
	var sty1='\n  /* 首先改变一下背景吧~ 仙女要粉粉的~ */ \n  body{\n\t background:-webkit-linear-gradient(#f54ea2,#ff7676);\n\t font-family:"微软雅黑";\n   }\n   /* 我们接下来要有个写代码的地方~ */\n   #wrap{\n\t overflow:auto;\n\t width:40%;\n\t height:420px;\n\t border-radius:5px;\n\t box-shadow:0 0 15px #fff;\n\t font-size:14px;\n\t font-weight:bold;\n   }';
	var trs1 = '\n  \/* 代码太丑了,我们要让代码看起来好看一点,加一些高亮~ *\/';
var lightheight = '\n  #wrap{\n\t background:#002B36;\n\t color: #BE84F2;\n   }\n  .token.property{\n\t color:#64d5ea;\n   }\n   .token.comment{\n\t color:857F6B;\n   }\n';
    var trs2 = '  \/* 我现在需要时间想想要对你说的话~先让代码到一边凉快一会~ *\/';
    var scrollRight = '\n  #wrap{\n\t transform: rotateY(-10deg);\n\t position:fixed;\n\t left:53%;\n\t top: 4%;\n\t height: 85%\n   } \n   \/* 我想好了,现在我需要一张信纸 *\/\n  ';
var drawBoard = '#loveme{\n\t background: url(../1.png);\n\t overflow:auto;\n\t position:fixed;\n\t top:40px;\n\t left:5%;\n\t width:40%;\n\t height:85%;\n\t color:#000;\n\t white-space: pre-wrap;\n\t box-shadow:0 0 15px #fff;\n\t border-radius:5px;\n\t transform:rotateY(10deg);\n   }';
var loveme = '\n<p>林茜小姐姐:<p>一定是特别的缘分~才可以一路走来变成了一家人,他多爱你几分,你多还他几分,找幸福的可能从此不再是一个人!</p></p><h2>在长沙的时候</h2><p>还记得在长沙工作你刚来公司的时候,感觉你很高冷,没怎么说过话对你也不怎么了解,都不记得我们是怎么搭上话的,如果没记错的话应该是抖音让我们相识.</p><h2>最好的回忆</h2><p>还记得以前每周都会给你买酸奶一起分赃,呸不对,是一起分享.每次拿给你感觉你都挺不好意思的,我一直觉都得你是比较内向的女孩.第一次问你喜欢吃什么味道你说草莓,我以为你喜欢草莓以后就都是买的这一款,原来特喵的你并不是特别喜欢只是随便说的.尽管如此想想还是很好玩.</p><h2>零体验</h2><p>本来以为你是很正紧的,没想到那段期间我拿你当朋友,你竟然拿我当男友,贪图我的美色,哎呀说出来真是有点不太好意思.认识你之后我们从学英语到学韩剧学了各种各样的语言,掌握了多国的换算人民币汇率~感谢你带给我的欢乐.</p><h2>Ending</h2><div><p>You are my today and all of my tomorrows.<br>你是我的今天和所有的明天。</p></div>';
var trs3 = ' \n   \/* 这个看起来不太好看的样子,需要稍作修改好看一丢丢 *\/\n   #loveme h2{\n\t display: inline-block;\n\t border-bottom: 1px solid;\n\t margin: 1em 0 .5em;\n\t font-size: 15px;\n\t font-weight: 700;\n\t line-height: 2;\n\t font-family: microsoft yahei;\n   }\n   #loveme p{\n\t line-height: 1.8;   }\n   #loveme div p{\n\t margin: 1em;\n\t padding: .5em;\n\t background: rgba(221,221,221,.5);\n   }\n\t\/*美感不怎么滴,只能这样了~*/';/* *** 最后为大家带来一个小惊喜，倒数三个数  \n\t* 3\n\t* 2\n\t* 1\n\t*** */
	var str = introduce.concat(sty1).concat(trs1).concat(lightheight).concat(trs2).concat(scrollRight).concat(drawBoard).concat(loveme).concat(trs3);


	var styleTag = document.getElementById('styleTag');
	var sourceBoard = document.getElementById('wrap');
	var n = 0;

var controller= setInterval(put,40);
	 function put(){

			n++;

			if(n>0&&n<=976){
					sourceBoard.innerHTML =str.substring(0,n)

				styleTag.innerHTML =str.substring(0,n);

			}

			if(n>=280){
					$('#wrap').animate({
						scrollTop: 1000
						}, 50);
			}

			if(n>=465&&n<=976){
				sourceBoard.innerHTML =  Prism.highlight(str.substring(0,n), Prism.languages.css);

			}

			if(n>=678&&n<=976){

				if(document.getElementById('loveme')){
					console.log('loveme元素已经存在');

				}
				else{
					var drawBoard = document.createElement('pre');
				    drawBoard.id = 'loveme';
				    document.body.appendChild(drawBoard);

				}

			}

			if(n>976&&n<1507){
			var drawBoard = document.getElementById('loveme');
				drawBoard.innerHTML =str.substring(976,n);
					$('#loveme').animate({
						scrollTop: 1000
						}, 50);
			}

			if(n>=1507){
				sourceBoard.innerHTML +=str.substring(n,n+1)
			    styleTag.innerHTML +=str.substring(n,n+1);
				//sourceBoard.innerHTML =  Prism.highlight(str.substring(0,976), Prism.languages.css);

			}
	     if(n>=1507){
	     	  sourceBoard.innerHTML =  Prism.highlight(str.substring(0,976), Prism.languages.css)+Prism.highlight(str.substring(1507,n), Prism.languages.css);

	     }

		if(n>str.length){window.clearInterval(controller)}





};
