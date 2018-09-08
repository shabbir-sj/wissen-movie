_GLOBAL_MODULE.http = (function () {
	function checkStatus(obj) {
		var response = obj.response;
		if (response.status >= 200 && response.status < 300) {
			return {data: obj.data, headers: response.headers};
		} else {
			var error = new Error(obj.data.message || response.statusText);
			error.response = response;
			throw error;
		}
	}

	function getQueryString(params) {
		var esc = encodeURIComponent;
		return Object.keys(params)
			.map(function (k) {
				return esc(k) + '=' + esc(params[k]);
			})
			.join('&');
	}

	function doRequest(method, url, params, headers, body) {
		if (!!body) body = JSON.stringify(body);
		if (!!params) {
			url += '?' + getQueryString(params);
		}

		return fetch(url, {method: method, headers: headers, body: body})
			.then(function (response) {
				return response.json().then(
					function (json) {
						return {data: json, response: response};
					},
					function (error) {
						logService.error(error);
						return Promise.reject(error);
					}
				);
			})
			.then(checkStatus);
	}

	return {
		checkStatus: checkStatus,
		getQueryString: getQueryString,
		doRequest: doRequest
	};
})();