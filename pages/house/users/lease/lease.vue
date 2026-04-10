<template>
	<view class="container">

		<view class="uni-list">
			<block v-for="(data, index) in list" :key="index">

				<view class="uni-list-cell">
					<view class="content">
						<view class="title">
						 <view style="display: flex;flex: 1;">
						 	<u-icon name="home" color="#333333" size="24"></u-icon>
						 	<view style="width: 3px;"></view>
						 	<span>{{data.buildingName+" - "+data.roomName}}</span>
						 </view>
						  
						  <u-tag v-if="data.confirmed==0" text="待确认" plain size="mini" type="warning" @click="confirmLease(data)"></u-tag>
						  <u-tag v-else-if="data.confirmed==1" text="已确认" plain size="mini" type="success"></u-tag>
						  
						</view>
						<view class="date">合同周期：{{$u.timeFormat(data.leaseStartDate, 'yyyy/mm/dd')}} - {{$u.timeFormat(data.leaseEndDate, 'yyyy/mm/dd')}}</view>
						<view class="date">签约日期：{{$u.timeFormat(data.createTime, 'yyyy/mm/dd')}}</view>
						<view class="date">月租金：{{data.rental/100.0}}元/月</view>
						<view style="display: flex;align-items: center;justify-content: flex-end;">
							<u-button type="primary" :plain="true" size="small" text="查看账单"  @click="goDetail('/pages/house/users/lease/bill',data)"></u-button>
							<view  style="width: 30rpx;"></view>
							<u-button type="success" :plain="true" size="small" text="查看租约" @click="goDetail('/pages/house/users/lease/leaseDetail',data)"></u-button>
						</view>
					</view>


				</view>
			</block>
		</view>
		<u-empty v-if="loadStatus != 'loading' && list.length==0" mode="data" text=" " marginTop="150">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" :height="30"/>

	</view>
</template>

<script>
	import request from "@/utils/request.js";
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
					pageSize: 10
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
				request.get('app-api/house/lease/page', this.queryParams)
				.then(res => {
					console.log(res)
					res.data.list.forEach(item => {
						if (item.image == "") {
							item.image = "/static/images/news/news.jpeg"
						}
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
			goDetail: function(url,detail) {
				console.log(detail)
				this.navTo(url+'?leaseId='+detail.id)
				return;
				uni.navigateTo({
					//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
					url: url+'?id='+detail.id,
					success: function(res) {
						 
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
			//接收菜单结果
			confirm(e) {
				this.indexArr = e.index;
				console.log(this.indexArr );
				this.valueArr = e.value;
				console.log(this.valueArr);
				console.log(e);
			},
			getStatus(status)
			{
				var t = "";
				switch (status) {
					case 0:
						t = "待租客确认";
						break;
					case 1:
						t = "签约成功";
						break;
					case 2:
						t = "续租待确认";
						break;
					case 3:
						t = "即将到期";
						break;
					case 4:
						t = "已逾期";
						break;
					case 5:
						t = "已退租";
						break;
					case 6:
						t = "已删除";
						break;
					case 8:
						t = "换房";
						break;
					case 9:
						t = "待结算";
						break;
					case 10:
						t = "续租待审核";
						break;
					case 11:
						t = "退租待审核"
				}
				return t;
			},
			confirmLease(data)
			{
				let that=this
				uni.showModal({
					title: '提示',
					content: '修改状态为已确认吗？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.confirmLeaseSubmit(data)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});  
			},
			confirmLeaseSubmit(data)
			{
				if(!data.confirmed==0)
				{
					return;
				}
 				
				var queryParams={id:data.id,confirmed:1}
				request.put('app-api/house/lease/confirm', queryParams)
				.then(res => {
					 console.log(res)
					 //uni.$u.toast('暂无租约')
					 if(res.data==1)
					 {
						this.$util.Tips({title:'确认成功'});
					    uni.startPullDownRefresh(); 
					 }
					 else
					 {
						 this.$util.Tips({title:'确认失败'});
					 }
					 
				}).catch(err => {
					console.log(err)
					 
				})
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.uni-list {
		margin: 0px 10px 10px 10px;
	}
    .u-button{
		width: auto !important;
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
            color: #555555;
		    line-height: 60rpx;
			width: 100%;
			.title {

				font-size: 30rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				span:first-child{
					flex:1
				}
			}

			.date {
				color: #666666; 
			}
		}
	}
	::v-deep .u-button {
	width: auto !important;
	}
</style>