<template>
	<view class="container">
		<view class="row">
		  <view class="title">{{detail.buildingName+" "+detail.roomName}}</view>
		  <view>
			  <u-tag v-if="detail.status==0" text="待接单" plain size="mini" type="error"></u-tag>
			  <u-tag v-else-if="detail.status==2" text="已接单" plain size="mini" type="warning"></u-tag>
			  <u-tag v-else-if="detail.status==3" text="维修中" plain size="mini" type="info"></u-tag>
			  <u-tag v-else-if="detail.status==4" text="已关闭" plain size="mini" type="success"></u-tag>
			  <u-tag v-else-if="detail.status==5" text="待租客确认" plain size="mini" type="success"></u-tag>
			  <u-tag v-else-if="detail.status==6" text="已完成" plain size="mini" type="success"></u-tag>
		  </view>
		</view>
		<u-line></u-line>
		<view class="row">
		  <view class="title">时间</view><view>{{$u.timeFormat(detail.createTime, 'yyyy/mm/dd hh:MM:ss')}}</view>
		</view>
		<template v-if="detail.pictures.length>0">
			<u-line></u-line>
			<view class="row">
			   <view class="title">图片</view>
			   <view>
				   <u-upload
						:fileList="detail.pictures"
						multiple
						:deletable="false"
						:disabled="true"
						:maxCount="1"
					></u-upload>
			   </view>
			</view>
		</template>
		<u-line></u-line>
		<view class="row">
		  <view class="title">描述</view><view>{{detail.description}}</view>
		</view>
		<template v-if="detail.workerUserId!=null">
		    <u-line></u-line>
			<view class="row">
			  <view class="title">接单</view><view>{{detail.workerContact+"("+detail.workerMobile+")"}}</view>
			</view>
		</template>
		
		<u-line></u-line>
		<view class="row">
		  <view class="title">跟进记录</view>
		</view>
		<view class="uni-list timelineul">
			
			<block v-for="(data, index) in list" :key="index">

				<view class="uni-list-cell timelineli">
					<view class="content">
						<view class="title">
							 {{$u.timeFormat(data.createTime, 'yyyy/mm/dd hh:MM:ss')}}
						</view>
						<view class="date">{{data.contact+" ("+data.mobile+")"}}</view>
						<view class="date"> {{data.description}}</view>
						<view v-if="data.pictures.length>0" style="margin-bottom: 10px;">
							<u-upload
								:fileList="data.pictures"
								multiple
								:deletable="false"
								:disabled="true"
								:maxCount="1"
							></u-upload>
						</view>
						
					</view>
					 
				</view>
			</block>
			
		</view>
		<u-empty v-if="loadStatus != 'loading' && list.length==0" mode="data" text=" " marginTop="20">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" :height="30"/>
        <u-gap height="60"></u-gap>
		<view class="btnview" v-if="![4,6].includes(detail.status)">
			  <u-button class="btn" type="primary" shape="circle" text="添加回复" @click="navTo('/pages/house/users/repair/reply?id='+detail.id)"></u-button>
			  <view style="width: 100rpx;"></view>
			  <u-button class="btn" type="primary" shape="circle" text="关闭报修" @click="closeRepair"></u-button>
		</view>
		<u-action-sheet :actions="actionsheetlist" @select="selectActionSheet" :closeOnClickOverlay="true" :closeOnClickAction="true" title1="请选择" cancelText="取消" :show="showactionsheet" @close="showactionsheet=false"></u-action-sheet>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		components: {
  
		},
		data() {
			return {

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
					repairId: 0
				},
				detail:{status:0,pictures:[]},
				actionsheetlist:[
					{
						name:'添加回复',
						type:1
					},
					{
						name:'关闭报修',
						type:2
					},
				],
				showactionsheet:false
			};
		},
		onLoad(options) {
			if(options.id)
			{
				this.queryParams.repairId=options.id
			}
			this.getDetail(options.id);
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
			getDetail(id) {
			    var queryParams= {
					id: id,
				}
				request.get('app-api/repair/repair/get', queryParams)
				.then(res => {
					console.log(res)
					res.data.pictures=JSON.parse(res.data.pictures)
					this.detail=res.data
				
				}).catch(err => {
					console.log(err)
					
				})
			},
			getList() {
				this.loadStatus = 'loading';
				request.get('app-api/repair/progress/page', this.queryParams)
				.then(res => {
					console.log(res)
					res.data.list.forEach(item => {
						 item.pictures=JSON.parse(item.pictures)
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
				this.navTo(url+'?id='+detail.id+'&masterId='+detail.masterId)
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
			selectActionSheet(e){
			    console.log(e)
				switch(e.type)
				{
					case 1:
					  this.navTo('/pages/house/users/repair/reply?id='+this.detail.id)
					  break;
					case 2:
					  this.closeRepair();
					  break;
				}
	   	    },
			closeRepair(){
				let that=this
				uni.showModal({
				  title: '提示',
				  content: '确定关闭报修吗',
				  success: res => {
				    if (res.confirm) {
						let form=JSON.parse(JSON.stringify(this.detail))
						form.pictures=JSON.stringify(form.pictures)
						form.status=4
						request.put('app-api/repair/repair/update', form)
						.then(res => {
							console.log(res)
							uni.$u.toast('关闭成功')
	                        that.getDetail(that.detail.id)
						}).catch(err => {
							console.log(err)
							
						})	 
				    } else if (res.cancel) {
				      //console.log('用户点击取消')
				    }
				  }
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container{
		padding: 0 20rpx;
	}
	.row{
		display: flex;
		padding: 30rpx 0;
		.title{
			font-weight: bold;
			flex: 1;
			align-items: center;
            display: flex;
		}
	} 
	.uni-list {
		margin: 0px 0px 10px 0px;
	}
    .u-button{
		width: auto !important;
	}
	.timelineul{
		display: flex;
		flex-direction: column;
		position: relative;
		margin:0rpx 0 0 10rpx;
		padding:0rpx;
		border:0rpx solid #cccccc;
	}
	.timelineli{
	
		position: relative;
		padding:0 0 20rpx 30rpx;
		border-left: 2rpx solid #FF7931;
	}
	.timelineli::before{
		content: "";
		width: 24rpx;
		height: 24rpx;
		border-radius: 12rpx;
		display: block;
		position: absolute;
		left: -12rpx;
		top: 0rpx;
		background:#FF7931;
	}
	.timelineul .timelineli:last-child
	{
		/* border-left: 2rpx solid transparent; */
	}
	.uni-list-cell {
		color: #666666;
	
		display: flex;
		align-items: flex-start;
        position: relative;
		
		.content {
			margin-left: 0px;
			margin-top: -18rpx;
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
	::v-deep .u-upload__wrap__preview{
		margin: 0px !important;
	}
	.btnview{
		padding: 20rpx 20rpx;
		position: fixed;
		left:0rpx;
		right: 0rpx;
		bottom: 0;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		.btn{
			background: linear-gradient(90deg, #FF7931 0%, #F11B09 100%);
			border: 1px solid #FF7931;
			padding: 0 50rpx;
		}
	}
</style>