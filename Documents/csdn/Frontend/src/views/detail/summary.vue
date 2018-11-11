<template>
	<div class="summary-info" v-if="summary.type !== 'column'">
		<div class="area-title">统计相关信息</div>
		<div class="info-area">
			<template  v-if="summary.type === 'report'">
				<div class="info-row">
					<div class="info-td">
						<span class="title">纬度数量：</span>
						<span class="text">{{summary.dimension_count}}</span>
					</div>
				</div>
				<div class="info-row">
					<div class="info-td">
						<span class="title">指标数量：</span>
						<span class="text">{{summary.metrics_count}}</span>
					</div>
				</div>
				<div class="info-row">
					<div class="info-td">
						<span class="title">总PV：</span>
						<span class="text">{{summary.total_pv}}</span>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="info-row">
					<div class="info-td">
						<span class="title">大小：</span>
						<span class="text">{{summary.space_used}}<span v-if="summary.space_used">Byte</span></span>
					</div>
				</div>
				<div class="info-row" v-if="summary.type === 'database'">
					<div class="info-td">
						<span class="title">数据表数量：</span>
						<span class="text">{{summary.table_count}}</span>
					</div>
				</div>
				<div class="info-row" v-if="summary.type === 'table'">
					<div class="info-td">
						<span class="title">数据字段数量：</span>
						<span class="text">{{summary.column_count}}</span>
					</div>
				</div>
			</template>
			
		</div>
	</div>
</template>
<style lang="less" scoped src="./detail.less"></style>
<script>
	export default {
		name: 'summaryInfo',
		props: ['summary'],
		data () {
			return {
				
			};
		},
		mounted () {

		}
	};
</script>