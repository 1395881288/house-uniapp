<template>
	<view class="container">
		<x-tree :items="list" :num="0"></x-tree>
		<u-empty v-if="list.length==0" mode="data" text=" ">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" />

	</view>
</template>

<script>
	import request from "@/utils/request.js";
	import * as BrokerageAPI from '@/api/house/brokerage/brokerage.js'
	import XTree from '@/components/x-tree/x-tree';
	import * as util from '@/utils/util'
	export default {
		components: {

		},
		data() {
			return {
				banner: {},

				last_id: '',
				reload: false,

				list: [],
				loadStatus: 'loadmore',
				// 加载前值为loadmore，加载中为loading，没有数据为nomore
				loadText: {
					loadmore: '上拉加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				// 总条数
				total: 0,
				isloading: false,
				queryParams: {
					pageNo: 1,
					pageSize: 999999,
					status: 0,
					type: 1
				}
			};
		},
		onLoad() {

			this.getList();
		},
		onPullDownRefresh() {
			console.log("======onPullDownRefresh======")
			if (this.loadStatus == 'loading') return;
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);

			this.queryParams.pageNo = 1;
			this.total = 0;
			this.list = []
			this.getList()
		},
		onReachBottom() {
			console.log('=======onReachBottom=========');
			if (this.isloading) return;
			if (this.loadStatus == "nomore") return;
			this.queryParams.pageNo++;
			this.getList()
		},
		methods: {
			getList() {
			 
				this.loadStatus = 'loading';
				BrokerageAPI.getBrokerageUserChildSummaryPage(this.queryParams).then(res => {
					console.log(res)
					let treedata = util.handleTree(res.data.list, "id", "bindUserId", "children")
					console.log(treedata)
					//this.list.push(...res.data.list)
					this.list.push(...treedata)
					console.log(this.list)
					this.total = res.data.total
					this.loadStatus = 'loadmore';
					//alert(this.list.length+" "+this.total)
					if (this.list.length >= this.total || 0 == 0) {
						this.loadStatus = 'nomore';
					}
				}).catch(err => {
					console.log(err)
					this.loadStatus = 'loadmore';
				})
			},

			goDetail: function(detail) {
				console.log(detail)
				uni.navigateTo({
					//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
					url: '/pages/news/detail',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('setNewsDetail', detail)
					}
				});
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						//published_at: dateUtils.format(e.published_at),
						published_at: e.published_at,
						title: e.title
					});
				});
				return newItems;
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			}
		}
	};
</script>

<style lang="scss" scoped>
	.uni-list {
		margin: 0px 10px 10px 10px;
	}

	.uni-list-cell {
		color: #666666;
		border-bottom: 1px solid $u-border-color;
		padding: 20rpx 0;
		display: flex;
		align-items: flex-start;

		.content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;

			.title {
				min-height: 58px;
			}

			.date {
				color: $u-light-color;
			}
		}
	}
</style>