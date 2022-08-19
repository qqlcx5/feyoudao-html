(function ($) {
	// 创建Tab构造函数
	var Tab = function (tab) {
		// 获取菜单LI
		var aMenuLi = tab.find('.buy_nav ul li');

		// 获取所有的panel
		var aPanel = tab.find('.lazy_t_ul');

		aMenuLi.click(function () {
			var index = $(this).index();

			// 切换菜单
			aMenuLi.removeClass('active').eq(index).addClass('active');

			// 切换panel
			aPanel.removeClass('active').eq(index).addClass('active');
		});
	};

	// 注册成jQuery方法
	$.fn.extend({
		tab: function () {
			this.each(function (k, v) {
				new Tab($(v));
			});
		}
	});
})(jQuery);

(function ($) {
	// 创建Tab构造函数
	var Tabs = function (tab) {
		// 获取菜单LI
		var aMenuLi = tab.find('.rank_t_ul li');

		// 获取所有的panel
		var aPanel = tab.find('.rank_b');

		aMenuLi.click(function () {
			var index = $(this).index();

			// 切换菜单
			aMenuLi.removeClass('active_two').eq(index).addClass('active_two');

			// 切换panel
			aPanel.removeClass('active_block').eq(index).addClass('active_block');
		});
	};

	// 注册成jQuery方法
	$.fn.extend({
		tabs: function () {
			this.each(function (k, v) {
				new Tabs($(v));
			});
		}
	});
})(jQuery);
