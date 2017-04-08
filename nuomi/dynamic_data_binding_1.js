function Observer(o) {
	var newObj = {
		data: {}
	};

	for (var key in o) {
		(function(key) {
			Object.defineProperty(newObj.data, key, {
				enumerable: true,
				configurable: true,
				get: function() {
					console.log('你访问了 %s', key);
					return o[key];
				},
				set: function(newValue) {
					console.log('您设置了 %s，新的值为 %s', key, newValue);
					o[key] = newValue;
				}
			})
		})(key);
	}

	return newObj;
}