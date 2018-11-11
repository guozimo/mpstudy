function redirectToList ($router, query, queryStr = []) {
	for(let key in query) {
		if (typeof query[key] === 'object') {
			redirectToList($router, query[key], queryStr);
			return;
		}
		if (query[key]) {
			queryStr.push(`${key}=${encodeURIComponent(query[key])}`);
		}
	}
	queryStr = queryStr.join('&');
	$router.push(`/query?${queryStr}`);
}

function getUrlQuery (url = location.search) {
	url = url.replace('?', '');
	let ret = {};
	let querys = url.split('&');
	querys.forEach((query) => {
		let q = query.split('=');
		if (q[1]) {
			ret[q[0]] = decodeURIComponent(q[1]);
		}
	});

	return ret;
}

export default {
	redirectToList,
	getUrlQuery
};
