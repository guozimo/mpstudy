<template>
	<div class="startegy">
		<main-tpl :detail="detail">
			<div class="left">
			<div class="basic-info">
				<div class="area-title">数据资源基本信息</div>
				<div class="info-area">
					<div class="info-row">
						<div class="info-td">
							<span class="title strategy-title">标签：</span>
							<span class="text">
								<span class="tag tag-text" v-for="tag in detail.tags">{{tag}}</span>
							</span>
						</div>
						<div class="info-td">
							<span class="title strategy-title">资源类型：</span>
							<span class="text">{{detail.type}}</span>
						</div>
					</div>
					<div class="info-row">
						<div class="info-td">
							<span class="title strategy-title">资源level：</span>
							<span class="text">{{detail.strategy_level}}</span>
						</div>
					</div>
					<div class="info-row">
						<div class="info-td">
							<span class="title strategy-title">一级名称：</span>
							<span class="text">{{detail.level_1_name}}</span>
						</div>
					</div>
					<div class="info-row" v-if="detail.type !== 'startegy_level_1'">
						<div class="info-td">
							<span class="title strategy-title">二级名称：</span>
							<span class="text">{{detail.level_2_name}}</span>
						</div>
					</div>
					<div class="info-row" v-if="detail.type === 'startegy_level_3'">
						<div class="info-td">
							<span class="title strategy-title">三级名称：</span>
							<span class="text">{{detail.level_3_name}}</span>
						</div>
					</div>
					<div class="info-row" v-if="detail.type === 'startegy_level_1'">
						<div class="info-td">
							<span class="title strategy-title">二级列表：</span>
							<span class="text">{{detail.list_2_list.join('、')}}</span>
						</div>
					</div>
					<div class="info-row" v-if="detail.type === 'startegy_level_2'">
						<div class="info-td">
							<span class="title strategy-title">三级列表：</span>
							<span class="text">{{detail.list_3_list.join('、')}}</span>
						</div>
					</div>
					<template v-if="detail.type === 'startegy_level_3'">
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">一级业务纵线：</span>
								<span class="text">{{detail.ordinate_level_1}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">一级业务纵线负责人：</span>
								<span class="text">{{detail.leader_ordinate_level_1}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">二级业务纵线：</span>
								<span class="text">{{detail.ordinate_level_2}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">二级业务纵线负责人：</span>
								<span class="text">{{detail.leader_ordinate_level_2}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">是否存在数据仓库：</span>
								<span class="text">{{detail.is_in_warehouse}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">收集方式：</span>
								<span class="text">{{detail.collect_way}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">预计采集点：</span>
								<span class="text">{{detail.expected_collect_time}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">实际采集点：</span>
								<span class="text">{{detail.actual_collect_time}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">最新进展：</span>
								<span class="text">{{detail.recent_process}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">数据类型：</span>
								<span class="text">{{detail.data_type}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title strategy-title">当前状态：</span>
								<span class="text">{{detail.status}}</span>
							</div>
						</div>
					</template>
				</div>
			</div>
			</div>
		</main-tpl>
	</div>
</template>
<style lang="less" scoped>
	.startegy{
		.basic-info {
			.strategy-title{
				width: 160px;
			}
		}
	}

</style>
<script>
	import mainTpl from './main';
	export default {
		name: 'startegy',
		props: ['detail'],
		components: {
			mainTpl
		}
	};
</script>
