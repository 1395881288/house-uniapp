<template>
	<view class="container">
		<u-sticky offsetTop="0" customNavHeight="0" bgColor="#fff">
			<view class="header">
				<view style="font-size: 32rpx;font-weight: bold;">第{{contract.num}}次签约</view>

				<view style="margin-top: 20rpx;display: flex;">
					<view style="flex:1">租期：{{contract.leaseDuration}}（{{$u.timeFormat(contract.rentalStartDate, 'yyyy/mm/dd') +" - "+ $u.timeFormat(contract.rentalDueDate, 'yyyy/mm/dd')}}）</view>
				</view>
				 
			</view>
		</u-sticky>
		

		<view class="itemtitle">签约信息</view>
		<u-cell-group>
			<u-cell title="签约时间" value="">
				<view slot="value" class="u-slot-value">{{$u.timeFormat(contract.createTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
			</u-cell>
			<u-cell title="租金" :value="contract.rental/100.0+'元/月'"></u-cell>
			<u-cell title="付款方式" value="一月一付"></u-cell>
			<u-cell title="账单日" value="">
				<view slot="value" class="u-slot-value">每月{{contract.billDay}}号</view>
			</u-cell>
			<u-cell title="付款日" value="固定1号付租">
				<view slot="value" class="u-slot-value">
					<template v-if="contract.preOrPayDay=='prePayDay'">每期提前{{contract.payDay}}号收租</template>
					<template v-else>固定{{contract.payDay}}号收租</template>
				</view>
			</u-cell>
			<!-- <u-cell title="其他费用:" value=""  :isLink="true" arrow-direction="down"></u-cell> -->
<!-- 			<u-cell title="管理费" value="200元/月" size="small"></u-cell>
			<u-cell title="专项维修基金" value="500元/月"></u-cell> -->
			<u-cell title="合同类型" value="电子合同"></u-cell>
		</u-cell-group>
 
		<view class="itemtitle">租约账单</view> 
        <view class="uni-list">
			<block v-for="(data, index) in bills" :key="index">

				<view class="uni-list-cell" @click="goDetail('/pages/house/users/lease/billDetail',data)">
					<view class="content">
						<view class="title">
							<span>
								<template v-if="data.billType==4">
									押金
								</template>
								<template v-else-if="data.billType==5">
									退租
								</template>
								<template v-else-if="data.billType==0">
									应缴费用第{{ data.periodNumber }}期
								</template>
								<template v-else-if="data.billType==8">
									换房费
								</template>
							</span>
							<view class="row">
								<span :class="'status'+data.status">¥ {{data.totalcost/100}}</span>
								<u-tag v-if="data.status==0" text="待收款" plain size="mini" type="error"></u-tag>
								<u-tag v-else-if="data.status==1" text="已收款" plain size="mini" type="warning"></u-tag>
								<u-tag v-else-if="data.status==2" text="已逾期" plain size="mini" type="info"></u-tag>
								<u-tag v-else-if="data.status==4" text="已结清" plain size="mini" type="success"></u-tag>

							</view>
						</view>
						<view class="date">
							<span>{{$u.timeFormat(data.rentalBeginDate, 'yyyy/mm/dd')}} - {{$u.timeFormat(data.rentalEndDate, 'yyyy/mm/dd')}}</span>
							<span>应付款日：{{$u.timeFormat(data.receivableDate, 'yyyy/mm/dd')}}</span>
						   
						</view>
					</view>
				</view>
			</block>
		</view>
		<u-empty v-if="loadStatus != 'loading' && bills.length==0" mode="data" text=" " marginTop="150">
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
					contractId:undefined,
					leaseId:undefined
				},
				contractId:undefined,
				
				contract:{},
				bills:[],
			};
		},
        onLoad(options) {
			if(options.contractId)
			{
				this.contractId=options.contractId;
				this.queryParams.contractId=options.contractId;
			}
			if(options.leaseId)
			{
				this.queryParams.leaseId=options.leaseId;
				
			}
			//this.getContract();
			this.getBills();
			this.getList()
			
		},
		onPullDownRefresh() {
	 
			console.log("======onPullDownRefresh======")
			if (this.loadStatus == 'loading') return;
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);

			this.queryParams.pageNo = 1;
			this.total = 0;
			this.bills = []
			this.getBills()
		},
		onReachBottom() {
		  
			console.log('=======onReachBottom=========');
			if (this.isloading) return;
			if (this.loadStatus == "nomore") return;
			this.queryParams.pageNo++;
			this.getBills()
		},
		methods: {
			getContract(){
				request.get('app-api/house/contract/get', {id:this.contractId})
				.then(res => {
					console.log(res)
					this.contract=res.data
 
				}).catch(err => {
					console.log(err)
				})
			},
			getList() {
				let that=this
				this.loadStatus = 'loading';
				var queryParams= {
					pageNo: 1,
					pageSize: 100,
					leaseId:this.queryParams.leaseId
				} 
				request.get('app-api/house/contract/page',queryParams)
				.then(res => {
					console.log(res)
					res.data.list.forEach((item,index) => {
						if(item.id==that.contractId)
						{
							that.contract=item;
							that.contract.num=index+1;
						}
					})
					this.list.push(...res.data.list)
 
				}).catch(err => {
					console.log(err)
				 
				})
			},
			getBills() {
                /* var queryParams= {
					pageNo: 1,
					pageSize: 100,
					contractId:this.contractId,
					leaseId:this.queryParams.leaseId
				} */
				request.get('app-api/house/bill/page', this.queryParams)
				.then(res => {
					console.log(res)
					res.data.list.forEach(item => {
						 
					})
					res.data.list.sort(function (a, b) {
						return a.periodNumber - b.periodNumber; // 升序排列
						// 若要降序排列，则可以改为：
						// return b - a;
					});
					this.bills.push(...res.data.list)
					this.total = res.data.total
					this.loadStatus = 'loadmore';
					if (this.bills.length >= this.total) {
						this.loadStatus = 'nomore';
					}
				
				}).catch(err => {
					console.log(err)
		            this.loadStatus = 'loadmore';
				})
			},
			goDetail: function(url,detail) {
				console.log(detail)
				this.navTo(url+'?id='+detail.id+'&masterId='+detail.masterId)
				
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
		    line-height: 50rpx;
			width: 100%;
			.title {
	
				font-size: 30rpx;

				display: flex;
				span:first-child{
					flex:1;
					
				}
				.row{
					display: flex;
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
			}
	
			.date {
				color: #888888; 
				font-size: 26rpx;
				display: flex;
				
				span:last-child{
					flex:1;
					text-align: right;
				}
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