<template>
	<div class="column">
		<el-tabs type="border-card">
		  <el-tab-pane label="血缘信息">
		  	<div class="dep">
		  		<div class="dep-title">数据资源依赖图：</div>
		  		<lineage :flag="1" :dep="0" :name="detail.database+'.'+detail.table+'.'+detail.name"></lineage>
		  	</div>
		  	<div class="dep">
		  		<div class="deped-title">数据资源被依赖图：</div>
		  		<lineage :flag="1" :dep="1" :name="detail.database+'.'+detail.table+'.'+detail.name"></lineage>
		  	</div>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<style lang="less" scoped>
	@import '../../../common/css/style/mixins.less';
	.table{
		color: 333;
		background: #fff;
		.total{
			margin-bottom: 10px;
		}
		.dep-title,
		.deped-title{
			.bold-title();
		}
	}
</style>
<script>
	import lineage from '../lineage';
	export default {
		name: 'columnDetail',
		props: ['detail'],
		data () {
			return {

			};
		},
		mounted () {

		},
		watch: {
			detail() {

			}
		},
		components: {
			lineage
		}
	};
</script>
