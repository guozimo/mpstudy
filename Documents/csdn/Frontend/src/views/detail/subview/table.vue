<template>
	<div class="table">
		<el-tabs type="border-card">
		  <el-tab-pane label="字段信息">
		  	<div class="field-info">
		  		<table-info :list="columns"></table-info>
		  	</div>
		  </el-tab-pane>
		  <el-tab-pane label="分区信息">
		  	<div class="partitions-info">
		  		<table-info :list="partitions"></table-info>
		  	</div>
		  </el-tab-pane>
		  <el-tab-pane label="血缘信息">
		  	<div class="dep">
		  		<div class="dep-title">数据资源依赖图：</div>
		  		<lineage :flag="0" :dep="0" :name="detail.database+'.'+detail.name"></lineage>
		  	</div>
		  	<div class="deped-title">
		  		<div>数据资源被依赖图：</div>
		  		<lineage :flag="0" :dep="1" :name="detail.database+'.'+detail.name"></lineage>
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
	import tableInfo from '../tableInfo';
	import lineage from '../lineage';
	export default {
		name: 'tableDetail',
		props: ['detail'],
		data () {
			return {
				columns: this.detail.columns || [],
				partitions: this.detail.partitions || []
			};
		},
		mounted () {

		},
		watch: {
			detail() {
				this.columns = this.detail.columns;
				this.partitions = this.detail.partitions;
			}
		},
		components: {
			tableInfo,
			lineage
		}
	};
</script>
