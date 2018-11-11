<template>
	<div class="main-tpl">
		<div class="global-info">
			<div class="info-row">
				<div class="info-td">
					<span class="title">资源GDID：</span>
					<span class="text">{{detail.gdid}}</span>
				</div>
			</div>
			<div class="info-row">
				<div class="info-td">
					<span class="title">资源名称：</span>
					<span class="text">{{detail.name}}</span>
				</div>
			</div>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<style lang="less" scoped src="../detail.less"></style>
<script>
	export default {
		name: 'main',
		props: ['detail'],
		data () {
			return {
			};
		}
	};
</script>