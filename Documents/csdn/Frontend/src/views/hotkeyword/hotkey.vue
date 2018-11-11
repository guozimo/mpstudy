<template>
	<div class="hot">
		<div v-if="hotkeys.length > 0"><span class="key">热点词：</span></div>
		<ul class="key-container">
			<li  v-for="key in hotkeys">
				<a class="key" @click="query(key)">{{key}}</a>
			</li>
		</ul>
	</div>
</template>
<style lang="less">
	.hot{
		display: flex;
		font-size: 12px;
    color: #6698D8;
	}
	.key-container{
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		text-align: left;
		margin: 0;
		padding: 0;
		li{
			margin-right: 10px;
			margin-bottom: 10px;
		}
		.key{
			padding: 0;
			font-size: 12px;
      cursor: pointer;
		}
	}
</style>
<script>
	import metadataAPI from 'apis/metadata';
	import util from 'lib/util';
	export default {
		name: 'hotkey',
		mounted () {
			this.getHotkey();
		},
		data () {
			return {
				hotkeys: []
			};
		},
		methods: {
			async getHotkey () {
				this.hotkeys = (await metadataAPI.getHotWord()).info;
			},
			query (key) {
				location.href = `/query?query=${key||''}&page=1`;
				// util.redirectToList(this.$router, {
				// 	query: key
				// });
			}
		}
	};
</script>
