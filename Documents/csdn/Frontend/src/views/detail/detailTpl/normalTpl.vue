<template>
	<div class="normal">
		<main-tpl :detail="detail">
			<div class="left">
				<div class="basic-info">
					<div class="area-title">数据资源基本信息</div>
					<div class="info-area">
						<div class="info-row">
							<div class="info-td">
								<span class="title">标签：</span>
								<span class="text">
									<span class="tag tag-text" v-for="tag in detail.tags">{{tag}}</span>
								</span>
							</div>
							<div class="info-td">
								<span class="title">资源类型：</span>
								<span class="text">{{detail.type}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title">存储类型：</span>
								<span class="text">{{detail.store_engine}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title">在线状态：</span>
								<span class="text">{{detail.online_status}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title">所属level：</span>
								<span class="text">{{detail.level}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title">描述信息：</span>
								<span class="text">{{detail.description}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="other-info">
					<component :is="currentView" :detail="detail">

					</component>
				</div>
			</div>
			<div class="right">
				<div class="user-info">
					<user-info :user="detail"></user-info>
				</div>
				<div class="date-info">
					<div class="area-title">日期相关信息</div>
					<div class="info-area">
						<div class="info-row">
							<div class="info-td">
								<span class="title">创建时间：</span>
								<span class="text">{{detail.create_time}}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-td">
								<span class="title">最近修改时间：</span>
								<span class="text">{{detail.update_time}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="summary-info">
					<summary-info :summary="detail"></summary-info>
				</div>
			</div>
		</main-tpl>
	</div>
</template>
<script>
	import tableDetail from '../subview/table';
	import columnDetail from '../subview/column';
	import reportDetail from '../subview/report';
	import userInfo from '../user';
	import summaryInfo from '../summary';
	import detailType from '../detailType';
	import mainTpl from './main';
	export default {
		name: 'normal',
		props: ['detail'],
		data () {
			return {
				currentView: ''
			};
		},
		components: {
			mainTpl,
			tableDetail,
			columnDetail,
			reportDetail,
			userInfo,
			summaryInfo
		},
		mounted () {
			this.currentView = detailType.getView(this.detail.type);
		}
	};
</script>