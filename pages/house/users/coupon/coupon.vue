<template>
	<view class="container">
		<u-sticky  customNavHeight="0" bgColor="#fff">
		    <u-tabs 
			:list="tabs"
			lineColor="#ffffff"
			lineHeight="0"
			:activeStyle="{
				        fontSize:'30rpx',
			            color: '#ffffff',
						background:'#e93323',
						padding:'10rpx 30rpx',
						borderRadius:'100rpx',
						boxShadow:'inset 0px 0rpx 8rpx #450600',
			        }"
			:inactiveStyle="{
				        fontSize:'30rpx',
			            color: '#606266',
						background:'#ffffff',
						padding:'10rpx 30rpx',
						borderRadius:'100rpx',
						boxShadow:'inset 0px 0rpx 8rpx #666666',
			        }"		
			:current="currentTab"
			@change="utabschange"
			>
			</u-tabs>
		</u-sticky>
		<template v-if="currentTab==0">
			<view  class="uni-list">
				<block v-for="(data, index) in list" :key="index">

					<view class="uni-list-cell">
						<view class="icon">
							¥
						</view>
						<view class="money">{{data.discountPrice}}</view>
						<view class="content">
							<view>优惠券</view>
							<view>无使用门槛</view>
							<view class="date">
								{{$u.timeFormat(data.validStartTime, 'yyyy.mm.dd')}}~{{$u.timeFormat(data.validEndTime, 'mm.dd')}}
							</view>
						</view>
						<view class="btn">
							<u-button v-if="data.status==0" type="warning" :plain="true" shape="circle"
								:text="data.status|filterStatus(status)" @click="take(data)"></u-button>
							<u-button v-else-if="data.status==1" type="warning" :plain="true" shape="circle"
								:text="data.status|filterStatus(status)" @click="take(data)"></u-button>
							<u-button v-else-if="data.status==2" type="warning" :plain="true" shape="circle"
								:text="data.status|filterStatus(status)" @click="take(data)"></u-button>
							<u-button v-else-if="data.status==3" type="warning" :plain="true" shape="circle"
								:text="data.status|filterStatus(status)" @click="take(data)"></u-button>

						</view>

					</view>
				</block>
			</view>
			<u-empty v-if="loadStatus != 'loading' && list.length==0" mode="data" text=" " marginTop="150"></u-empty>
			<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
				:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" />
		</template>	
		<template v-else-if="currentTab==1">
		   <view  class="uni-list">
		   	<block v-for="(data, index) in mycouponlist" :key="index">
		   
		   		<view class="uni-list-cell">
		   			<view class="icon">
		   				¥
		   			</view>
		   			<view class="money">{{data.discountPrice}}</view>
		   			<view class="content">
		   				<view>优惠券</view>
		   				<view>无使用门槛</view>
		   				<view class="date">
		   					{{$u.timeFormat(data.validStartTime, 'yyyy.mm.dd')}}~{{$u.timeFormat(data.validEndTime, 'mm.dd')}}
		   				</view>
		   			</view>
		   			<view class="btn">
						<template v-if="data.couponApply==null">
							<u-button type="warning" :plain="true" shape="circle"  @click="goApply(data)"
								text="申请兑现"></u-button>
						</template>
						<template v-else>
						    <u-button v-if="data.couponApply.status==1" type="warning"      shape="circle" @click="showApply(data)" :customStyle="{color:'#ffffff'}"
								:text="data.couponApply.status|filterApplyStatus(applyStatus)"></u-button>
							<u-button v-else-if="data.couponApply.status==2" type="success" shape="circle" @click="showApply(data)"
								:text="data.couponApply.status|filterApplyStatus(applyStatus)"></u-button>
							<u-button v-else-if="data.couponApply.status==3" type="error"   shape="circle" @click="showApply(data)"
								:text="data.couponApply.status|filterApplyStatus(applyStatus)" :customStyle="{background:'#ff0000'}"></u-button>
						
						</template>

		   			</view>
		   
		   		</view>
		   	</block>
			<u-empty v-if="mycouponlist.length==0" mode="data" text=" " marginTop="150"></u-empty>
			<u-loadmore fontSize="28rpx" :line="true" status="nomore" loading-text="暂无内容"
				loadmore-text="暂无内容" nomore-text="暂无内容" />
		   </view>
		</template>	
		 

	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		components: {

		},
		data() {
			return {
				currentTab: 0, // 当前 tab
				tabs:[
					{
					  name: '领劵中心',
					  value: 'all',
					},
					{
					  name: '我的优惠券',
					  value: '1',
					}
				],
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
					pageSize: 10,
					status: 0,
					type: 1,
					productScope: 1
				},
				status: [
					"领取",
					"已领取",
					"已使用",
					"已失效"
				],
				applyStatus: [
					"",
					"兑换申请中",
					"审核通过",
					"审核拒绝"
				],
				mycouponlist:[]
			};
		},
		filters: {
			filterStatus(id, status) {
				if (id <= status.length) {
					return status[id];
				} else {
					return "未知状态"
				}
			},
			filterApplyStatus(id, status) {
				if (id <= status.length) {
					return status[id];
				} else {
					return "未知状态"
				}
			},
		},
		onLoad() {

			this.CouponTempate()

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
			this.CouponTempate()
		},
		onReachBottom() {
			console.log('=======onReachBottom=========');
			if (this.isloading) return;
			if (this.loadStatus == "nomore") return;
			this.queryParams.pageNo++;
			this.CouponTempate()
		},
		methods: {
			CouponTempate() {
				let that = this;
				this.loadStatus = 'loading';
				request.get('app-api/house/coupon-template/page', this.queryParams).then(async res => {
					console.log(res)
					let mycoupon = await that.MyCoupons();
					res.data.list.forEach(item => {
						if (item.image == "") {
							item.image = "/static/images/news/news.jpeg"
						}
						item.status = 0;
						mycoupon.forEach(coupon => {
							if (item.id == coupon.templateId) {
								item.status = coupon.status;
							}
					 
						})
						item.validEndTime = mycoupon.validEndTime
						item.validStartTime = mycoupon.validStartTime
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
			MyCoupons() {
				let that=this;
				return new Promise((resolve, reject) => {
					var queryParams = {
						pageNo: 1,
						pageSize: 100
					};
					request.get('app-api/house/coupon/getCouponPageLeftJoinCouponApply',queryParams).then(res => {
						console.log(res)
						that.mycouponlist=res.data.list;
						resolve(res.data.list);
					}).catch(err => {
						console.log(err)
					})
				})


			},
			take: function(detail) {
				let that=this
				console.log(detail)
				request.post('app-api/house/coupon/take', {
					templateId: detail.id
				}).then(res => {
					console.log(res)
					this.$util.Tips({
						title: "领取成功。"
					},function(){
						that.queryParams.pageNo = 1;
						that.total = 0;
						that.list = []
						that.CouponTempate()
					});
				}).catch(err => {
					console.log(err)

				})
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
			utabschange(e){
				console.log("aderror: " + JSON.stringify(e));
				this.currentTab = e.index;
			},
			goApply(data)
			{
				uni.navigateTo({
							//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
					  url: '/pages/house/users/couponapply/index',
					  success: function(res) {
						  // 通过eventChannel向被打开页面传送数据
						  res.eventChannel.emit('data', data)
					  }
				});
			},
			showApply(data)
			{
				console.log("============showApply")
				uni.navigateTo({
							//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
					  url: '/pages/house/users/couponapply/detail',
					  success: function(res) {
						  // 通过eventChannel向被打开页面传送数据
						  res.eventChannel.emit('data', data)
					  }
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	::v-deep .u-tabs__wrapper__nav__item{
		 flex:1;
	}
	.uni-list {
		margin: 0px 10px 10px 10px;
	}

	.uni-list-cell {
		color: #fff;
		padding: 30rpx 30rpx 40rpx 30rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: flex-end;
		border-radius: 20rpx;
		background: linear-gradient(to right, #f44336, #ff9800);

		.icon {
			font-size: 50rpx;
			padding-bottom: 15rpx;
		}

		.money {
			font-size: 100rpx;
		}

		.content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28rpx;
			line-height: 40rpx;

			.title {}

			.date {}
		}

		.btn {
			margin-bottom: 25rpx;

			.u-button {
				padding: 30rpx;
			}
		}
	}
</style>