<template>
	<div class="metadata-box">
		<div class="header"><v-header></v-header></div>
		<nav class="nav">
			<a href="/" @click.prevent="$router.push('/metadata')">数据资源列表</a>
		</nav>
		<div class="view-container">
			<router-view></router-view>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.metadata-box{
		// height: 100%;
    flex: 1;
    overflow: auto;
    position: relative;
	}
  .header{
    text-align: center;
  }
	.nav{
		background-color: #f8f8f8;
		font-size: 16px;
		color: #333;
		height: 40px;
		line-height: 40px;
    margin: 0 0 21px 88px;
		display: flex;
		a{
			color: inherit;
      margin-left: 5px;
			border-bottom: 2px solid  #669BD8;
		}
	}
	.view-container{
		width: 1280px;
		margin: 0 auto;
		height: calc(~"100% - 80px - 40px - (21px*2)");
		box-sizing: border-box;
	}
	@media screen and (max-width: 1280px) {
		.view-container{
			padding-left: 88px;
		}
	}
</style>
<script>
	import vHeader from 'views/header/header';
	export default {
		name: 'app',
		components: {
			vHeader
		}
	};
</script>
