<template>
	<div class="defination">
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
								<span class="title">描述信息：</span>
								<span class="text">{{detail.description}}</span>
							</div>
							
						</div>
					</div>
				</div>
				<div class="defination-list">
					<div class="table-list">
						<table class="metadata-table">
							<thead>
								<tr>
									<th>名称</th>
									<th>码值</th>
									<th>业务含义</th>
									<th>附加信息</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in detail.key_list">
									<td>{{item.key}}</td>
									<td>{{item.code}}</td>
									<td>{{item.name}}</td>
									<td>{{item.other}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main-tpl>
	</div>
</template>
<style lang="less" scoped>
	.defination-list{
		margin-top: 10px;
	}
</style>
<script>
	import mainTpl from './main';
	export default {
		name: 'defination',
		props: ['detail'],
		components: {
			mainTpl
		}
	};
</script>
