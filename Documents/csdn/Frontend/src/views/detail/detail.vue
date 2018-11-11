<template>
	<div class="metadata-detail" v-loading="loading">
		<component :is="tpl" :detail="detail"></component>
	</div>
</template>
<script>
	import metadataAPI from 'apis/metadata';
	import normalTpl from './detailTpl/normalTpl';
	import startegyTpl from './detailTpl/startegyTpl';
	import definationTpl from './detailTpl/definationTpl';
	import detailType from './detailType';
	export default {
		data () {
			return {
				gdid: this.$route.query.id,
				detail: {},
				loading: false,
				tpl: ''
			};
		},
		mounted () {
			this.getDetail();
		},
		components: {
			normalTpl,
			startegyTpl,
			definationTpl
		},
		methods: {
			async getDetail () {
				this.loading = true;
				let detail = (await metadataAPI.getDetail({
					gdid: this.gdid
				})).info.data;
				this.loading = false;
				this.detail = detail;
				this.tpl = detailType.getDetailTpl(detail.type);
			}
		}
	};
</script>