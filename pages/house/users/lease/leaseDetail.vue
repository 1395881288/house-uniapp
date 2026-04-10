<template>
	<view class="container">
		<u-sticky offsetTop="0" customNavHeight="0" bgColor="#fff">
			<view class="header">
				<view style="font-size: 32rpx;font-weight: bold;">{{lease.buildingName+" - "+lease.roomName}}</view>

				<view style="margin-top: 20rpx;display: flex;">
					<view style="flex:1">租金：{{lease.rental/100.0}} 元/月</view>
				</view>
				 
			</view>
		</u-sticky>
		<view class="itemtitle">合同信息</view>
		<u-cell-group>
			<u-cell
			    :title="'第'+contract.num+'次签约'"
			    :value="contract.duration"
			    label=""
			    center
			    :isLink="true" arrow-direction="right"
			    @click="goDetail('/pages/house/users/lease/contractDetail',contract)"
			>
			<view slot="label" class="u-slot-value">
				 {{$u.timeFormat(contract.rentalStartDate, 'yyyy/mm/dd') +" - "+ $u.timeFormat(contract.rentalDueDate, 'yyyy/mm/dd')}}
			</view>
			</u-cell>
		</u-cell-group>
		
		<view class="itemtitle">签约信息</view>
		<u-cell-group>
			<u-cell title="租期" value="">
				<view slot="value" class="u-slot-value">{{lease.leaseDuration}}</view>
			</u-cell>
			<u-cell title="起止日" value="">
		  	    <view slot="value" class="u-slot-value">{{$u.timeFormat(lease.leaseStartDate, 'yyyy/mm/dd') +" - "+ $u.timeFormat(lease.leaseEndDate, 'yyyy/mm/dd')}}</view>
			</u-cell>
			<u-cell title="付款方式" value="一月一付"></u-cell>
			<u-cell title="租金" :value="lease.rental/100.0+'元/月'"></u-cell>
			<u-cell title="账单日" value="">
				<view slot="value" class="u-slot-value">每月{{contract.billDay}}号</view>
			</u-cell>
			<u-cell title="付款日" value="">
				<view slot="value" class="u-slot-value">
					<template v-if="contract.preOrPayDay=='prePayDay'">每期提前{{contract.payDay}}号收租</template>
					<template v-else>固定{{contract.payDay}}号收租</template>
				</view>
			</u-cell>
			<!-- <u-cell title="其他费用:" value=""  :isLink="true" arrow-direction="down"></u-cell> -->
<!-- 			<u-cell title="管理费" value="200元/月" size="small"></u-cell>
			<u-cell title="专项维修基金" value="500元/月"></u-cell> -->
		</u-cell-group>
		<view class="itemtitle">住户信息</view>
		<u-cell-group>
			<u-cell title="姓名" :value="lease.customerName"></u-cell>
			<u-cell title="电话" :value="lease.customerMobile"></u-cell>
			<u-cell title="证件类型" :value="lease.customerIdType">
				<view slot="value" class="u-slot-value">
					<template v-if="lease.customerIdType==0">身份证</template>
					<template v-else-if="lease.customerIdType==1">护照</template>
					<template v-else-if="lease.customerIdType==2">台胞证</template>
					<template v-else-if="lease.customerIdType==3">港澳通行证</template>
					<template v-else-if="lease.customerIdType==4">营业执照</template>
				</view>
			</u-cell>
			<u-cell title="证件号码" :value="lease.customerIdNumber"></u-cell>
		</u-cell-group>
		<view class="itemtitle">管家信息</view>
		<u-cell-group>
			<u-cell title="姓名" :value="building.managerName"></u-cell>
			<u-cell title="电话" :value="building.managerPhone"></u-cell>
		</u-cell-group>
		<view class="itemtitle">历史签约</view>
		<u-cell-group>
		    <u-cell
			    v-for="(data,index) in list"
		        :title="'第'+(index+1)+'次签约'"
		        :value="data.duration"
		        label=""
		        center
			    :isLink="true" arrow-direction="right"
			    @click="goDetail('/pages/house/users/lease/contractDetail',contract)"
		    >
			<view slot="label" class="u-slot-value">
				 {{$u.timeFormat(data.rentalStartDate, 'yyyy/mm/dd') +" - "+ $u.timeFormat(data.rentalDueDate, 'yyyy/mm/dd')}}
			</view>
			</u-cell>
		</u-cell-group>
		 

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
					pageSize: 100,
					leaseId: 0
				},
				lease:{
					
				},
				contract:{
					
				},
				building:{
					
				}
			};
		},
		onLoad(options) {
			if(options.leaseId)
			{
				this.queryParams.leaseId=options.leaseId;
			}
			this.getLease();
	
		},
		onPullDownRefresh() {
			return;
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
			return;
			console.log('=======onReachBottom=========');
			if (this.isloading) return;
			if (this.loadStatus == "nomore") return;
			this.queryParams.pageNo++;
			this.getList()
		},
		methods: {
			getLease(){
				request.get('app-api/house/lease/get', {id:this.queryParams.leaseId})
				.then(res => {
					console.log(res)
					this.lease=res.data
					this.getList();
					console.log("=======getBuilding1=========")
					this.getBuilding()
				}).catch(err => {
					console.log(err)
				})
			},
			getBuilding(){
				console.log("=======getBuilding2=========")
				
				request.get('app-api/house/building/get', {id:this.lease.buildingId})
				.then(res => {
					console.log(res)
					this.building=res.data
		 
				}).catch(err => {
					console.log(err)
				})
			},
			getList() {
				var that=this
				this.loadStatus = 'loading';
				request.get('app-api/house/contract/page', this.queryParams)
				.then(res => {
					console.log(res)
					var contractIds=JSON.parse(this.lease.contractIds)
					var contractId=contractIds[contractIds.length-1]
					res.data.list.forEach(item => {
						if (item.image == "") {
							item.image = "/static/images/news/news.jpeg"
						}
						if(item.id==contractId)
						{
							that.contract=item;
							that.contract.num=contractIds.length;
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
				this.navTo(url+'?leaseId='+detail.leaseId+'&contractId='+detail.id)
				
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
		}
	};
</script>

<style lang="scss" scoped>
	.header{
		padding: 30rpx;
		color:#ffffff;
		background: #fff5f0;
		background: url(/static/images/user_bg.png) center top no-repeat;
		background-size: 100% auto;
        box-shadow: 0px 3px 5px 1px #cdcdcd;
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
	.itemtitle{
		display: flex;
		align-items: center;
		padding:0 0rpx 0 40rpx;
		font-weight:bold;
		font-size: 30rpx;
		line-height: 90rpx;
		position: relative;
		background: #eaeaea;
	}
	.itemtitle::before{
		content:" ";
		width:10rpx;
		height:36rpx;
		display: block;
		position: absolute;
		left: 20rpx;
		border-radius:3rpx;
		background-color:#e93323;
		
	}
	.u-slot-value{
		color: #606266;
	}
</style>