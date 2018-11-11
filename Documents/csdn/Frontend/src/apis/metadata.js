import Http from './http';
const http = Http.getInstance();

const api = {
	getResourceType () {
		return http.ajaxGet('/api/metadata/resourceType');
	},
	getCategory () {
		return http.ajaxGet('/api/metadata/category');
	},
	getHotWord () {
		return http.ajaxGet('/api/metadata/hotWord');
	},
	query (params) {
		return http.ajaxGet('/api/metadata/query', params);
	},
	getDetail (params) {
		return http.ajaxGet('/api/metadata/detail', params);
	},
	getLineage (params) {
		return http.ajaxGet('/api/metadata/lineage', params);
	}
};

export default api;
