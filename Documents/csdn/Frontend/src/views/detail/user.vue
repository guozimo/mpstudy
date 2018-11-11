<template>
	<div class="user-info">
		<div class="area-title">用户相关信息</div>
		<div class="info-area">
			<div class="info-row"  v-if="user.type === 'report'">
				<div class="info-td">
					<span class="title">仓库负责人：</span>
					<span class="text">{{user.dw_developer_name}}</span>
				</div>
			</div>
			<div class="info-row"   v-if="user.type === 'report'">
				<div class="info-td" >
					<span class="title">web负责人：</span>
					<span class="text">{{user.web_developer_name}}</span>
				</div>
			</div>
			<div class="info-row"  v-if="user.type !== 'report'">
				<div class="info-td">
					<span class="title">创建人：</span>
					<span class="text">{{user.creator_name}}</span>
				</div>
			</div>
			<div class="info-row">
				<div class="info-td">
					<span class="title">所有人：</span>
					<span class="text">{{user.owner_name}}</span>
				</div>
			</div>
			<div class="info-row">
				<div class="info-td">
					<span class="title">最近修改人：</span>
					<span class="text">{{user.updater_name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped src="./detail.less">
</style>
<script>
	export default {
		name: 'userInfo',
		props: ['user'],
		data () {
			return {
				
			};
		},
		mounted () {

		}
	};
</script>