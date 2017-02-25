var page = require('webpage').create(),
	sys = require('system'),
	baseurl = 'https://www.baidu.com/s?wd=',
	url,
	keyword,
	watchStart,
	watchEnd;
https: //www.baidu.com/s?wd=%E4%BA%94%E4%B8%89
	if (sys.args.length <= 1) {
		console.log('please enter a keyword for the search');
		phantom.exit(1);
	} else {
		keyword = sys.args[1];
		url = baseurl + encodeURI(keyword);
	}

phantom.outputEncoding = "utf-8"

page.onConsoleMessage = function(msg) {
	console.log(msg);
}

//calc time start
watchStart = Date.now();

page.open(url, function(status) {
	if (status === 'fail') {
		//calc failed time end
		watchEnd = Date.now();
		var failedResult = {
			code: 0,
			msg: '抓取失败',
			word: keyword,
			time: watchEnd - watchStart
		};


		console.log(JSON.stringify(failedResult));
		phantom.exit(1);
	}

	var successResult = {};



	try {
		successResult = page.evaluate(function() {
			var resultobjtmp = {},
				dataList = [];

			resultobjtmp.code = 1;
			resultobjtmp.msg = '抓取成功';

			var arr = Array.prototype.slice.call(document.querySelectorAll('[srcid][tpl=se_com_default]'), 0);
			arr.forEach(function(item, index) {
				var dataitem = {},
					titledom;

				titledom = item.querySelector('h3 a');

				dataitem.title = titledom.textContent;
				dataitem.info = item.querySelector('.c-abstract').textContent
				dataitem.link = titledom.getAttribute('href');

				dataList.push(dataitem);

			})

			resultobjtmp.dataList = dataList;

			return resultobjtmp;
		});
	} catch (e) {
		successResult.code = 1;
		successResult.msg = '抓取失败' + e;
	}

	successResult.word = keyword;

	//calc success time end
	watchEnd = Date.now();
	successResult.time = watchEnd - watchStart;

	console.log(JSON.stringify(successResult));
	phantom.exit();
})