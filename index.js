window.addEventListener('load', function () {
	// 获取事件源
	//获取按键
	var stroke_l = document.querySelector('.stroke_l');
	var stroke_r = document.querySelector('.stroke_r');
	// 获取中心
	var module = document.querySelector('.module');
	var moduleWidth = module.offsetWidth;
	// 鼠标移到中心显示按键
	module.addEventListener('mouseenter', function () {
		stroke_l.style.display = 'block';
		stroke_r.style.display = 'block';
		clearInterval(time);
	});
	// 鼠标离开中心隐藏按键
	module.addEventListener('mouseleave', function () {
		stroke_l.style.display = 'none';
		stroke_r.style.display = 'none';
		time = setInterval(function () {
			stroke_r.click();
		}, 2000);
	});

	// 动态生成圆点数量
	// 获取ul
	var ul = module.querySelector('ul');
	// 获取ol
	var ol = document.querySelector('.module_dot');
	for (var i = 0; i < ul.children.length; i++) {
		// 创建li
		var li = document.createElement('li');
		// 添加自定义属性
		li.setAttribute('data-index', i);
		// 添加li
		ol.appendChild(li);
		// 当点击圆点时更改样式 排他
		li.addEventListener('click', function () {
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';
			}
			this.className = 'white';
			// 每次点击把圆点的自定义属性获取
			var index = this.getAttribute('data-index');
			console.log(moduleWidth);
			console.log(index);
			// 圆点的序号乘图片宽度
			animate(ul, -index * moduleWidth);
		});
	}
	// 把第一个圆设置样式
	ol.children[0].className = 'white';
	// 克隆第一张图片
	var first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	// 点击右侧按钮时切换下一张
	var num = 0;
	var str = 0;
	stroke_r.addEventListener('click', function () {
		// 当图片到第四张时 再次点击回到第一张
		if (num == 4) {
			ul.style.left = 0;
			// 并把num重新赋值
			num = 0;
		}
		num++;
		// 点击按钮的次数乘图片宽度
		animate(ul, -num * moduleWidth);
		str++;
		// 让圆点和图片转换同步
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		if (str == 4) {
			str = 0;
		}
		ol.children[str].className = 'white';
	});
	// 点击左侧按键切换下一张
	stroke_l.addEventListener('click', function () {
		// 当图片到第四张时 再次点击回到第一张
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = -num * moduleWidth + 'px';
		}
		num--;
		// 点击按钮的次数乘图片宽度
		animate(ul, -num * moduleWidth);
		str--;
		str = str < 0 ? ol.children.length - 1 : str;
		// 让圆点和图片转换同步
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		if (str == 4) {
			str = 0;
		}
		ol.children[str].className = 'white';
	});
	var time = setInterval(function () {
		stroke_r.click();
	}, 2000);

	// 返回顶部缓动画
	var fixedtool = document.querySelector('.fixedtool').querySelector('ul');
	var fixedTop = fixedtool.lastElementChild;
	fixedTop.addEventListener('click', function () {
		// 里面的x和y 不跟单位的 直接写数字即可
		// window.scroll(0, 0);
		// 因为是窗口滚动 所以对象是window
		animater(window, 0);
	});
	// 动画函数
	function animater(obj, target, callback) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			// 步长值写到定时器的里面
			// 把我们步长值改为整数 不要出现小数的问题
			var step = (target - window.pageYOffset) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if (window.pageYOffset == target) {
				// 停止动画 本质是停止定时器
				clearInterval(obj.timer);
				// 回调函数写到定时器结束里面
				if (callback) {
					// 调用函数
					callback();
				}
			}
			// 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
			// obj.style.left = window.pageYOffset + step + 'px';
			window.scroll(0, window.pageYOffset + step);
		}, 10);
	}
	console.log(fixedTop);
});
