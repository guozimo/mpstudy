<template>
	<div class="table-info">
		<div class="total">
			共{{list.length || 0}}条记录
		</div>
		<div class="table-list">
			<table class="metadata-table">
				<thead>
					<tr>
						<th width="15%">序号</th>
						<th width="20%">字段名称</th>
						<th width="25%">字段类型</th>
						<th width="40%">字段描述</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list">
						<td>{{item.col_index}}</td>
						<td>{{item.name}}</td>
						<td>{{item.data_type}}</td>
						<td>{{item.description}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.table-info{
		padding: 10px;
		color: 333;
		background: #fff;
		.total{
			margin-bottom: 10px;
		}
	}
</style>
<script>
	export default {
		name: 'tableInfo',
		props: ['list'],
		data () {
			return {
				
			};
		},
		mounted () {

		},
		watch: {
			
		}
	};
</script>