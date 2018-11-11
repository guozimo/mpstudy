<template>
	<div class="lineage"></div>
</template>
<style>
	.lineage{
		height: 500px;
		width: 690px;
		overflow: scroll;
	}
</style>
<script>
	import metadataAPI from 'apis/metadata';
	import echarts from 'echarts';

	export default {
		name: 'lineage',
		// dep = 0(依赖) | 1(被依赖)
		// flag = 0(table) | 1(column)
		props: ['dep','flag','name'],
		mounted () {
			this.getLineage();
		},
		methods: {
			async getLineage () {
				let data = (await metadataAPI.getLineage({
					name: this.name,
					dep: this.dep,
					flag: this.flag
				})).info;
				data.collapsed = true;
				this.drawTree(data);
			},
			drawTree (data) {
				let myChart = echarts.init(this.$el);
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
		                type: 'tree',

		                data: [data],

		                top: '1%',
		                left: '35%',
		                bottom: '1%',
		                right: '20%',

		                symbolSize: 7,

		                label: {
		                    normal: {
		                        position: 'left',
		                        verticalAlign: 'middle',
		                        align: 'right',
		                        fontSize: 9
		                    }
		                },

		                leaves: {
		                    label: {
		                        normal: {
		                            position: 'right',
		                            verticalAlign: 'middle',
		                            align: 'left'
		                        }
		                    }
		                },

		                expandAndCollapse: true,
		                animationDuration: 550,
		                animationDurationUpdate: 750
            		}]
        		});
			}
		}
	};
</script>