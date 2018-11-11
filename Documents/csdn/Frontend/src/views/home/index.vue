<template>
	<div class="home" v-loading="loading">
		<div class="resource-type">
			<!-- <div class="resource" v-for="resource in resourceTypes">
				<div class="img">
					<resouce-image :type="resource.keys"></resouce-image>
				</div>
				<div class="content">
					<div class="number">{{resource.number}}</div>
					<div class="type-name">{{resource.title}}</div>
				</div>
			</div> -->
			<resouce-image :resourceTypes="resourceTypes"></resouce-image>
		</div>
		<div class="category">
			<div class="title">数据资源分类</div>
			<div class="category-item" v-for="category in categories">
				<a  @click="search(category.filter,category.title)">{{category.title}}（{{category.number}}）</a>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../../common/css/style/variable.less';
	@import '../../common/css/style/mixins.less';
	.home{
		height: 100%;
		color: #669BD8;
		background: #fff;
		display: flex;
		a{
			color: inherit;
		}
		.resource-type{
			flex: 1;
			padding: 10px;

		}
		.category{
			width: 200px;
			border-left: 1px solid #E1E1E1;
			padding: 0 16px;
			.title{
				.bold-title();
				margin: 10px 0;
			}
			.category-item{
				font-size: 14px;
				margin-top: 10px;
			}
		}
	}
</style>
<script>
	import metadataAPI from 'apis/metadata';
	import resouceImage from './resourceImage';
	import util from 'lib/util';
	export default {
		name: 'home',
		async mounted () {
			this.loading = true;
			await this.getResourceType();
			await this.getCategory();
			this.loading = false;
		},
		data () {
			return {
				resourceTypes: [],
				categories: [],
				loading: false
			};
		},
		methods: {
			async getResourceType () {
				let resData = await metadataAPI.getResourceType();
				this.resourceTypes = resData.info;
			},
			async getCategory () {
				let resData = await metadataAPI.getCategory();
				this.categories = resData.info;
			},
			search (filter, key) {
				util.redirectToList(this.$router, {
					[filter]: key
				});
			}
		},
		components: {
			resouceImage
		}
	};
</script>
