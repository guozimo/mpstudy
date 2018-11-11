<template>
	<div class="header">
		<!-- <div class="logo">
			<router-link to="/"><i></i></router-link>
			<router-link to="/"><span class="logo-text">数据地图</span></router-link>
		</div> -->
		<div class="search">
			<input type="text"
				@keydown.enter="search"
				@compositionstart="this.chinese=true"
				@compositionend="this.chinese=false"
				v-model="query"
				class="keyword"
				placeholder="请输入数据资源的名称或者描述" />
			<i class="search-icon" @click="search"></i>
		</div>
		<div class="hot">
			<hotkey></hotkey>
		</div>
		<!-- <div class="other">
			<span class="problem"><span class="problem-text">问题反馈</span></span>
			<span class="remark"><span class="remark-text">使用说明</span></span>
		</div> -->
	</div>
</template>
<style lang="less" scoped src="./header.less">

</style>
<script>
	import Hotkey from '../hotkeyword/hotkey';
	import util from 'lib/util';
	export default {
		name: 'vHeader',
		components: {
			Hotkey
		},
		data () {
			return {
				query: this.$route.query.query,
				chinese: false
			};
		},
		watch: {
			$route (to) {
				this.query = to.query.query || util.getUrlQuery().query;
			}
		},
		methods: {
			search () {
				if (this.chinese) {
					return;
				}
				location.href = `/query?query=${this.query||''}&page=1`;
				// util.redirectToList(this.$router, {
				// 	query: this.query,
				// 	page: 1
				// });
			}
		}
	};
</script>
