let typeMap = {
	'database':  'database',
	'table':  'table',
	'field':  'field',
	'report':  'report',
};

export default {
	getView (type) {
		if (type === typeMap.database) { return ''; }
		if (type === typeMap.table) { return 'tableDetail' }
		if (type === typeMap.field) { return 'columnDetail' }
		if (type === typeMap.report) { return 'reportDetail' }
	},
	getDetailTpl (type) {
		if (~['startegy_level_1','startegy_level_2','startegy_level_3'].indexOf(type)) {
			return 'startegyTpl';
		}
		if (type === 'defination') {
			return 'definationTpl';
		}
		return 'normalTpl';
	}
};