<template>
	<div class="report">
		<el-tabs type="border-card">
		  <el-tab-pane label="纬度信息">
		  	<table-info :list="dimensions"></table-info>
		  </el-tab-pane>
		  <el-tab-pane label="字段信息(注意计算方式)">
		  	<table-info :list="metrics"></table-info>
		  </el-tab-pane>
		  <el-tab-pane label="血缘信息">血缘信息</el-tab-pane>
		</el-tabs>
	</div>
</template>
<style lang="less" scoped>
	.report{
		color: 333;
		background: #fff;
		.total{
			margin-bottom: 10px;
		}
	}
</style>
<script>
	import tableInfo from '../tableInfo';
	export default {
		name: 'reportDetail',
		props: ['detail'],
		data () {
			return {
				dimensions: this.detail.dimensions || [],
				metrics: this.detail.metrics || []
			};
		},
		mounted () {

		},
		watch: {
			detail() {
				this.dimensions = this.detail.dimensions;
				this.metrics = this.detail.metrics;
			}
		},
		components: {
			tableInfo
		}
	};
</script>