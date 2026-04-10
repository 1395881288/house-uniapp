<template>
	<view class="container">
		<view class="uni-list">
			<block v-for="(data, index) in list" :key="index">

				<view class="uni-list-cell  ss-col-center" @click="goDetail(data)">
					<view class="content">
						<view class="title">{{data.description}}</view>
						<view class="date">发布日期:{{$u.timeFormat(data.createTime, 'yyyy年mm月dd日')}}</view>
						<view class="ss-flex" v-if="data.workerUserId">
							<view class="ss-flex-1">接单:{{data.workerContact}}({{data.workerMobile}})</view><view>{{$u.timeFormat(data.workerCreateTime, 'yyyy年mm月dd日')}}</view>
						</view>
					</view>
 
                    <u-tag :text="getStatus(data.status)" size="mini" type="warning"></u-tag>
				</view>
			</block>
		</view>
		<u-empty v-if="loadStatus != 'loading' && list.length==0" mode="data" text=" ">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" />

	</view>
</template>

<script>
    import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import * as RepairApi from '@/api/repair/repair/index.js';
	export default {
		components: {

		},
		computed: mapGetters(['isLogin', 'userInfo']),
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
					userId:0,
					pageNo: 1,
					pageSize: 10
				}
			};
		},
		onLoad() {
			if (!this.isLogin) {
				toLogin();
			}
			//console.log(JSON.stringify(this.userInfo))
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
				RepairApi.getPage(this.queryParams,{noAuth: true})
				.then(res => {
					console.log(res)
					res.data.list.forEach(item => {
						if (item.image == "") {
							item.image = "/static/images/news/news.jpeg"
						}
						item.pictures=JSON.parse(item.pictures)
					})
					this.list.push(...res.data.list)
					this.total = res.data.total
					this.loadStatus = 'loadmore';
					if (this.list.length >= this.total) {
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
					url: '/pages/repair/detail',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('setRepairDetail', detail)
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
			},
			getStatus(id){
				var title="";
				switch(id)
				{
					case 0:
					  title="待接单";
					  break;
					case 2:
					  title="待维修";
					  break;
					case 3:
					  title="待支付";
					  break;
					case 4:
					  title="已关闭";
					  break;
					case 5:
					  title="待租客确认";
					  break;
					case 6:
					  title="已完成";
					  break;
				}
				return title;
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
            flex:1;
			font-size: 26rpx;
			.title {
	
			}

			.date {
				line-height: 60rpx;
			}
		}
	}
	
/* ==================
          flex布局
 ==================== */

.ss-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ss-flex-1 {
  flex: 1;
}

.ss-flex-col {
  display: flex;
  flex-direction: column;
}

.ss-flex-wrap {
  flex-wrap: wrap;
}

.ss-flex-nowrap {
  flex-wrap: nowrap;
}

.ss-col-center {
  align-items: center;
}

.ss-col-top {
  align-items: flex-start;
}

.ss-col-bottom {
  align-items: flex-end;
}

.ss-col-stretch {
  align-items: stretch;
}

.ss-row-center {
  justify-content: center;
}

.ss-row-left {
  justify-content: flex-start;
}

.ss-row-right {
  justify-content: flex-end;
}

.ss-row-between {
  justify-content: space-between;
}

.ss-row-around {
  justify-content: space-around;
}
</style>