var oClose = document.getElementById('banner_close');

var topBanner = document.getElementById('Top_banner');

var oOpen = document.getElementById('banner_open');

// 定时器 5s后关闭
var start = 10;
var timer = setInterval(function(){
	start--;
	if(start === 0){
		clearInterval(timer);
		topBanner.style.display = 'none';
		oOpen.style.display = 'block';
	}
},1000);


// 点击关闭
oClose.onclick = function(){
	topBanner.style.display = 'none';

	oOpen.style.display = 'block';
}
// 点击打开
oOpen.onclick = function(){
	topBanner.style.display = 'block';

	oOpen.style.display = 'none';
}

//搜索框默认提示信息

		function place(placehold) {
			var notice = ['牛奶新鲜日  品牌尝鲜，部分满99减20', '鸿运面膜 转运开始，部分满99减50', '\“家\”有小确幸', '纯正新西兰进口牛排，爆款满99减30'];
			// 显示默认值
			var index = 0;
			placehold.value = notice[index];

			var timer = null;

			autoMove();

			function autoMove() {
				if(placehold.value === '' || placehold.value === notice[index]) {
					timer = setInterval(function () {
						index++;
						if(index >= notice.length) {
							index = 0;
						}
						placehold.value = notice[index];
					}, 2000);
				}
	 		}


			placehold.onfocus = function () {
				clearInterval(timer);
				if(this.value === notice[index]) {
					this.value = '';
				}
			};

			placehold.onblur = function () {
				autoMove();
				if(this.value === '') {
					this.value = notice[index];
				}
			}
		};
		var placehold = document.getElementById('placehold');
		var placeholds = document.getElementById('placeholds');


		place(placehold);
		place(placeholds);

var ssUo = document.getElementById('ss_uo');

function callback(data) {
			ssUo.innerHTML = '';
			data.result.forEach( v => {
				var newLi = document.createElement('li');
				newLi.innerHTML = v[0];
				ssUo.appendChild(newLi);
			});
		}
		placehold.oninput = function () {
			// 创建script标签
			var script = document.createElement('script');

			script.src = 'https://suggest.taobao.com/sug?code=utf-8&q='+ this.value +'&_ksTS=1524750507019_398&callback=callback';
			// script.src = 'https://ds.suning.cn/ds/his/new/-'+ this.value +'-0-1_0-autoComplateCallback_184b31b125a59d8c382d3d8382d23350.jsonp?callback=callback&_=1525112848982';
			document.body.appendChild(script);
		};
		placeholds.oninput = function () {
			// 创建script标签
			var script = document.createElement('script');

			script.src = 'https://suggest.taobao.com/sug?code=utf-8&q='+ this.value +'&_ksTS=1524750507019_398&callback=callback';
			// script.src = 'https://ds.suning.cn/ds/his/new/-'+ this.value +'-0-1_0-autoComplateCallback_184b31b125a59d8c382d3d8382d23350.jsonp?callback=callback&_=1525112848982';
			document.body.appendChild(script);
		};

