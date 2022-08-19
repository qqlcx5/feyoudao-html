function play68_init() {
	updateShare(0);
}

function play68_submitScore(score) {
	updateShareScore(score);
	Play68.shareFriend(); 
}

function updateShare(bestScore) {
	var descContent = "奔跑吧！兔子";
	switch(true){
		case bestScore > 800 :
			shareTitle = "我跑了" + bestScore + "分，跑到人生巅峰，已载入史册！";
			break;
		case bestScore > 500 :
			shareTitle = "我跑了" + bestScore + "分，跑出了自己的风格！";
			break;
		case bestScore > 200 :
			shareTitle = "我跑了" + bestScore + "分，请问终点在哪里？";
			break;
		case bestScore > 0 :
			shareTitle = "我跑了" + bestScore + "分，手一抖就撞墙了！不要问我头疼不疼！";
			break;
		default: shareTitle = "没事儿我就出来跑一跑，求个偶遇，缘分这种事谁说得清呢？";
	}
	appid = '';
	Play68.setShareInfo(shareTitle,descContent);
}

function updateShareScore(bestScore) {
	updateShare(bestScore);
}