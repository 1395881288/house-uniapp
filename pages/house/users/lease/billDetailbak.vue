<template>
	<view class="container">
		<u-sticky offsetTop="0" customNavHeight="0" bgColor="#fff">
			<view class="header">
				<view style="font-size: 32rpx;font-weight: bold;">{{bill.buildingName+" - "+bill.roomName}}</view>
				<view style="margin: 20rpx 0;">
					<template v-if="bill.billType==4">
						押金
					</template>
					<template v-else-if="bill.billType==5">
						退租
					</template>
					<template v-else-if="bill.billType==0">
						应缴费用第{{ bill.periodNumber }}期（{{$u.timeFormat(bill.rentalBeginDate, 'yyyy/mm/dd') +" - "+ $u.timeFormat(bill.rentalEndDate, 'yyyy/mm/dd')}}）
					</template>
					<template v-else-if="bill.billType==8">
						换房费
					</template>
			    </view>

				<u-line color="#ffb488"></u-line>
				<view style="margin-top: 20rpx;display: flex;">
					<view style="flex:1">待付金额：{{(bill.totalcost-bill.transactionAmount)/100}} 元</view><view style="flex:1">应付日期：{{$u.timeFormat(bill.receivableDate, 'yyyy/mm/dd')}}</view>
				</view>
				<view style="margin-top: 20rpx;display: flex;">
					<view style="flex:1">账单总额：{{bill.totalcost/100}} 元</view><view style="flex:1">已付金额：{{bill.transactionAmount/100}} 元</view>
				</view>
				 
			</view>
		</u-sticky>
		<view class="uni-list">
			<block v-for="(data, index) in billMaster.feeBills" :key="index">

				<view class="uni-list-cell" v-if="[1201,1202,1203,1204].includes(data.feeType)">
					<view class="content">
						<view class="title">{{data.feeDetails[0].name}}</view>
						<view class="date">
							{{(data.deviceRecords[0].latestReading-data.deviceRecords[0].preReading)/10}}{{getUnit(data.feeType)}}（{{data.deviceRecords[0].preReading/10+" - "+data.deviceRecords[0].latestReading/10}}{{getUnit(data.feeType)}}）
						</view>
					</view>
					<view class="price">
						<span>¥ {{data.totalCost/100}}</span>
					</view>
				</view>
 
				<view class="uni-list-cell" v-else>
					<view class="content">
						<view class="title">{{data.feeDetails[0].name}}</view>
						<view class="date">{{$u.timeFormat(data.receivableDate, 'yyyy/mm/dd')}}</view>
					</view>
					<view class="price">
						<span>¥ {{data.totalCost/100}}</span>
					</view>
				</view>
			</block>
		</view>
<!-- 		<u-empty v-if="loadStatus != 'loading' && billMaster.feeBills.length==0" mode="data" text=" " marginTop="150">
		</u-empty> -->
		<u-loadmore v-if="!loadStatus=='nomore'" fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" :height="30"/>
       <view v-if="loadStatus=='nomore' && bill.totalCost!=bill.transactionAmount" style="display: flex;align-items: center;justify-content: center;">
             <u-button class="btn" type="error" shape="circle" @click="submit">支付</u-button>
       </view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	import * as transactionApi from '@/api/house/transaction/index.js';
	export default {
		components: {
  
		},
		data() {
			return {
				currentTab: 0, // 当前 tab
				tabs:[
					{
					  name: '已支付',
					  value: 'all',
					},
					{
					  name: '未支付',
					  value: '1',
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
					pageSize: 10,
				},
	
				bill:{},
				billMaster:{feeBills:[]},
				options:{}
			};
		},
		onLoad(options) {
            this.options=options
			this.getBill(options.id);
			this.getBillMaster(options.masterId)
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
			getBill(id) {
			    var queryParams= {
					id: id,
				}
				request.get('app-api/house/bill/get', queryParams)
				.then(res => {
					console.log(res)
					this.bill=res.data
				
				}).catch(err => {
					console.log(err)
					
				})
			},
			getBillMaster(id){
				var queryParams= {
					id: id,
				}
				request.get('app-api/house/bill-master/getBillMasterDetail', queryParams)
				.then(res => {
					console.log(res)
					this.billMaster=res.data
				    this.loadStatus = "nomore"
				}).catch(err => {
					console.log(err)
					
				})
			},
			getList() {
				this.loadStatus = 'loading';
				request.get('app-api/house/news/page', this.queryParams,{noAuth: true})
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
				this.navTo(url+'?id='+detail.id)
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
			utabschange(e){
				console.log("aderror: " + JSON.stringify(e));
				this.currentTab = e.index;
			},
			getUnit(typeid)
			{
		
			   var title="未定义";
			   switch(typeid)
			   {
				  case 1201:
					title="吨";
					break;
				  case 1202:
					title="度";
					break;
				  case 1203:
					title="立方米";
					break;
				  case 1204:
					title="吨";
					break;
			   }
			   return title;
			},
			submit(){
				uni.showLoading({
					title:"加载中..."
				})
				var json={};
				json.leaseId=this.bill.leaseId;
				json.billId=this.bill.id
				json.billType=this.billMaster.billType
				json.buildingId=this.billMaster.buildingId
				json.buildingName=this.billMaster.buildingName

				//json.feeTypes=JSON.stringify(json.feeTypes)
				var feeTypes=[],feeBillIds=[],transactionAmount=0;
				this.billMaster.feeBills.forEach(item => {
					feeTypes.push(item.feeType)
					feeBillIds.push(item.id);
					transactionAmount+=item.totalCost
				})
				json.feeTypes=feeTypes
				json.feeBillIds=feeBillIds
				json.transactionAmount=transactionAmount
				var descriptionext=this.billMaster.billType==4?"押金":("租金·第"+this.billMaster.periodNumber+"期")
				
				json.description=this.billMaster.customerName+"支付"+this.billMaster.buildingName+" "+descriptionext+json.transactionAmount+"元"
				json.pictures="[]"
				json.groupId=""
				json.masterBillId=this.billMaster.id
				json.paymentPlatformTransId="",
				json.tenantName=this.billMaster.tenantName
				json.tenantMobile=this.billMaster.tenantMobile
				json.paymentCollections="[]"
				json.periodNumber=this.billMaster.periodNumber
				json.operateId=0
				json.operateName=""
				json.receivableDate=this.billMaster.receivableDate
				json.rejectReason=""
				json.rentalBeginDate=this.billMaster.rentalBeginDate
				json.rentalEndDate=this.billMaster.rentalEndDate
				json.roomFloor=this.billMaster.roomFloor
				json.roomId=this.billMaster.roomId
				json.roomName=this.billMaster.roomName
				json.srvFee=0
				json.transType=0
				json.customerId=this.billMaster.customerId
				json.customerName=this.billMaster.customerName
				json.status=0
				
				transactionApi.createOrder({
	              ...json
				}).then(res => {
					console.log(res)
 				  const returnUrl = encodeURIComponent('/pages/house/users/orderPayStatus?order_id=' + res.data.id);
				  uni.navigateTo({
				    url: `/pages/goods/cashier/index?order_id=${res.data.payOrderId}&returnUrl=${returnUrl}`
				  }); 
				}).catch(err => {
					  uni.hideLoading();
					  return this.$util.Tips({
						title: err
					  });
				});
			}
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
        box-shadow: 0px 0px 0px 0px #cdcdcd;
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
	::v-deep .u-button,.btn{
		color: #fff;
		font-size: 30rpx;
		letter-spacing: 20rpx;
		width: 80% !important;
		height: 86rpx;
		border-radius: 43rpx;
		margin: 50rpx auto 0 auto;
		background: linear-gradient(90deg, #FF7931 0%, #F11B09 100%);
		line-height: 86rpx;
	}
 
</style>