<template>
	<div class="metadata-list" 
		v-loading="loading"
		>
		<div class="quick-search-box">
			<el-collapse :value="['tag']">
				<el-collapse-item name="tag"  @click.stop="">
					<template slot="title" >
						<div class="tag-title">
							<span>筛选项列表（在当前搜索条件下进行快速筛选）：</span>
							<div class="tags">
								<span class="tag-item" v-for="(t,index) in conditionTags">
									<el-tag
									  color="#669BD8"
									  :key="t[0]"
									  closable
									  @close="handleClose(index)">
									  {{t[1]}}
									</el-tag>
								</span>
							</div>
						</div>
					</template>
					<div class="quick-search">
						<div class="tag-row" v-for="tag in tags">
							<span class="title">{{tag.title}}：</span>
							<div class="text">
								<a 
									v-for="tagItem in tag.list" 
									@click="searchByTag(tagItem.key, tag.key)">
										{{tagItem.key}}({{tagItem.doc_count}})
								</a>
							</div>
							
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		
		<div class="content">
			<div class="content-item" v-for="item in lists">
				<div class="name">
					<a :href="'/detail?id='+item.gdid" target="_blank" v-html="item.index_resource_name"></a>
					<!-- <router-link :to="'/detail/'+item.gdid">{{item.index_resource_name}}</router-link> -->
				</div>
				<div class="tags">
					<span class="title tag-title">标签：</span>
					<div>
						<span class="tag-text" v-for="label in item.filter_label">{{label}}</span>
					</div>
				</div>
				<div class="other-info">
					<div 
						class="info"
						:class="{'defination': field.value==='index_defination_code'}"
					 	v-for="field in resourceTypeField[item.filter_resource_type].normal">
					<template v-if="item[field.value]">
						<span class="field-title" v-html="field.name+'：'"></span>
						<span class="field-text" v-html="item[field.value]"></span>
					</template>
					</div>
				</div>
				<div 
					class="description" 
					v-if="resourceTypeField[item.filter_resource_type].other.length>0" 
					v-for="field in resourceTypeField[item.filter_resource_type].other">
						<span class="title des-title">{{field.name}}：</span>
						<div class="des-text" v-html="item[field.value]"></div>
				</div>
			</div>
			<div class="pager">
				<el-pagination 
				  layout="prev, pager, next"
				  :total="total" 
				  :page-size="pageSize" 
				  :current-page.sync="condition.page" 
				  @current-change="getPagerData"
				  >
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped src="./query.less">
	
</style>
<style lang="less">
	.tag-title .tags {
		span,i{
			color: #fff;
		}
	}
</style>
<script>
	import metadataAPI from 'apis/metadata';
	import util from 'lib/util';
	import resourceTypeField from './resouceTypeField';
	export default {
		components: {
		},
		data () {
			return {
				resourceTypeField: resourceTypeField,
				tags: [],
				lists: [],
				total: 0,
				pageSize: 10,
				conditionTags: [],
				loading: true,
				condition: {
					page: parseInt(util.getUrlQuery().page) || 1
				}
				
			};
		},
		mounted () {
			this.initPage();
		},
		watch: {
			$route (to) {
				this.initPage();
			}
		},
		methods: {
			initPage () {
				this.initCondition();
				this.initConditionTag();
				this.getMetadataList();
			},
			initConditionTag () {
				this.conditionTags = [];
				let filter = this.condition.filter;
				for(var f in filter) {
					this.conditionTags.push([f, filter[f]]);
				}
			},
			getConditionTag () {
				let filter = Object.create(null);
				this.conditionTags.forEach((item) => {
					filter[item[0]] = item[1];
				});
				return filter;
			},
			initCondition () {
				let query = this.$route.query;
				this.condition.query = query.query || '';
				// this.condition.page = parseInt(query.page) || 1;
				delete query.query;
				delete query.page;
				this.condition.filter = query;
			},
			async getMetadataList () {
				this.lists = [];
				this.loading = true;
				let resData = (await metadataAPI.query({
					search: this.condition
				})).info.data;
				this.loading = false;
				this.tags = resData.tags;
				this.lists = resData.lists;
				this.total = resData.total;
				this.pageSize = resData.limit;
			},
			getPagerData (current) {
				// this.getMetadataList(); 不用这个方式刷新，因为要让url随着分页而变化
				util.redirectToList(this.$router, this.condition);
			},
			searchByTag (value, key) {
				this.condition.page = 1;
				this.condition.filter[key] = value;
				util.redirectToList(this.$router, this.condition);
			},
			handleClose (index) {
				let tag = this.conditionTags.splice(index, 1)[0];
				this.condition.page = 1;
				delete this.condition.filter[tag[0]];
				util.redirectToList(this.$router, this.condition);
			}
		}
	};
</script>