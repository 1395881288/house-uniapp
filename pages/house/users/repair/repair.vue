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
						padding:'10rpx 20rpx',
						borderRadius:'100rpx',
						boxShadow:'inset 0px 0rpx 8rpx #450600',
			        }"
			:inactiveStyle="{
				        fontSize:'30rpx',
			            color: '#606266',
						background:'#ffffff',
						padding:'10rpx 20rpx',
						borderRadius:'100rpx',
						boxShadow:'inset 0px 0rpx 8rpx #666666',
			        }"		
			:current="currentTab"
			@change="utabschange"
			>
			</u-tabs>
		</u-sticky>
		<view class="uni-list">
			<block v-for="(data, index) in list" :key="index">

				<view class="uni-list-cell" @click="goDetail('/pages/house/users/repair/detail',data)">
					<view class="content">
						<view class="title">
							 {{data.buildingName+"-"+data.roomName}}
						</view>
						<view class="date">提交时间：{{$u.timeFormat(data.createTime, 'yyyy/mm/dd hh:MM:ss')}}</view>
						<view class="date">上门时间：{{$u.timeFormat(data.expTime, 'yyyy/mm/dd hh:MM:ss')}}</view>
						
						<view class="date"> {{data.description}}</view>
					</view>
					<view class="price">
						<u-tag v-if="data.status==0" text="待接单" plain size="mini" type="error"></u-tag>
						<u-tag v-else-if="data.status==2" text="已接单" plain size="mini" type="warning"></u-tag>
						<u-tag v-else-if="data.status==3" text="维修中" plain size="mini" type="info"></u-tag>
						<u-tag v-else-if="data.status==4" text="已关闭" plain size="mini" type="success"></u-tag>
						<u-tag v-else-if="data.status==5" text="待租客确认" plain size="mini" type="success"></u-tag>
						<u-tag v-else-if="data.status==6" text="已完成" plain size="mini" type="success"></u-tag>
						
					</view>
				</view>
			</block>
		</view>
		<u-empty v-if="loadStatus != 'loading' && list.length==0" mode="data" text=" " marginTop="150">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" :height="30"/>
        <u-gap height="60"></u-gap>
		<view class="btnview">
			  <u-button class="btn" type="primary" shape="circle" text="我要报修" @click="navTo('/pages/house/users/repair/add')"></u-button>
		</view>
	</view>
</template>

<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import request from "@/utils/request.js";
	export default {
		components: {
  
		},
		data() {
			return {
				currentTab: 0, // 当前 tab
				tabs:[
					{
					  name: '全部',
					  value: undefined,
					},
					{
					  name: '待接单',
					  value: 0,
					},
					{
					  name: '已完成',
					  value: 6,
					}
				],

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
					pageSize: 100,
					status:undefined
				}
			};
		},
	    computed: mapGetters(['isLogin', 'userInfo']),
		onLoad(options) {
			if (!this.isLogin) {
				toLogin();
				return;
			}
			if(options.leaseId)
			{
				this.queryParams.leaseId=options.leaseId
			}
			
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
				request.get('app-api/repair/repair/page', this.queryParams)
				.then(res => {
					console.log(res)
					res.data.list.forEach(item => {
						 
					})
					res.data.list.sort(function (a, b) {
						return a.periodNumber - b.periodNumber; // 升序排列
						// 若要降序排列，则可以改为：
						// return b - a;
					});
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
				this.navTo(url+'?id='+detail.id)
				return;
				uni.navigateTo({
					//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
					url: url+'?id='+detail.id+'&masterId='+detail.masterId,
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
			utabschange(e){
				console.log("aderror: " + JSON.stringify(e));
				this.currentTab = e.index;
				this.queryParams.status=e.value
				uni.startPullDownRefresh();
			},
		}
	};
</script>

<style lang="scss" scoped>
	::v-deep .u-tabs__wrapper__nav__item{
		 flex:1;
	}
	::v-deep .u-tabs__wrapper__nav__item__text{
		width: 100%;
        text-align: center;
	}
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
        position: relative;
		.price{
			position: absolute;
			display: flex;
			right: 20rpx;
			align-items: center;
			justify-content: center;
			top:50%;
			transform: translate(0, -50%);
			color: #ff0000;
			
			span{
				margin-right: 10rpx;
			}
			.status0{
				color: #ff0000;
			}
			.status1{
				color: #f9ae3d;
			}
			.status2{
				
			}
			.status4{
				color: #5ac725;
			}
		}
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
			}

			.date {
				color: #666666; 
			}
		}
	}
	.btnview{
		padding: 30rpx 20rpx;
		position: fixed;
		left:0rpx;
		right: 0rpx;
		bottom: 0;
		background-color: #ffffff;
		::v-deep .u-button,.btn{
			background: linear-gradient(90deg, #FF7931 0%, #F11B09 100%) !important;
			border: 1px solid #FF7931;
		}
	}
 
</style>