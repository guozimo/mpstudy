<template>
	<div class="resource-type" >
		<div class="resource-box" 
		v-for="resource in resourceTypes"
		@click="search(resource.filter,resource.keys)"
		>
			<div class="img">
				<div class="image">
					<div class="inner-image" :class="[imgMap[resource.keys]]"></div>
				</div>
			</div>
			<div class="content">
				<div class="number">{{resource.number}}</div>
				<div class="type-name">{{resource.title}}</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="less" src="./resourceImage.less">
	
</style>
<script>
	import util from 'lib/util';
	export default {
		name: 'resouceImage',
		props: ['resourceTypes'],
		data () {
			return {
				imgMap: {}
			};
		},
		created () {
			this.imgMap = {
				'resource': 'resource',
				'column': 'column',
				'db': 'db',
				'report': 'report',
				'table': 'table',
				'strategy_data': 'strategy-data',
				'defination': 'defination'
			};
		},
		methods: {
			search (filter, key) {
				if (key === 'resource') {
					this.$router.push('/query');
					return;
				}
				util.redirectToList(this.$router, {
					[filter]: key
				});
			}
		}
	};
</script>