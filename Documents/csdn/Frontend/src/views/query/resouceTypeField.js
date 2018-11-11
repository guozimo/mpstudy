function getFields () {
	return [
		{name: '存储类型', value: 'filter_store_engine'},
		{name: '数据库名称', value: 'filter_database'},
		{name: '数据表名称', value: 'filter_table'},
		{name: '技术负责人', value: 'filter_developer'}
	];
}

let common = [{name: '资源类型', value: 'filter_resource_type'}];
let description = [{name: '描述信息', value: 'index_resource_description'}];

export default {
	// 'common': ['filter_resource_type'],
	'strategy_data': {
		'normal': common.concat([
			{name: '资源level', value: 'filter_strategy_level'},
			{name: '一级名称', value: 'filter_strategy_level_1_name'},
			{name: '二级名称', value: 'filter_strategy_level_2_name'},
			{name: '三级名称', value: 'filter_strategy_level_3_name'}
		]),
		'other': []
	},
	'column': {
		'normal': common.concat(getFields()),
		'other': description
	},
	'db': {
		'normal': common.concat(getFields()),
		'other': description
	},
	'report': {
		'normal': common.concat(getFields()),
		'other': description
	},
	'table': {
		'normal': common.concat(getFields()),
		'other': description
	},
	'defination': {
		'normal': common.concat([{
			name: '状态码信息',
			value: 'index_defination_code'
		}]),
		'other': description
	}
};