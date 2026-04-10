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
						boxShadow:'inset 0px 0rpx 5rpx #450600',
					}"
			:current="currentTab"
			@change="utabschange"
			>
			</u-tabs>
		</u-sticky>
        <template v-if="currentTab==0">
			<view class="subtitle">
				<u--text :lines="1" :text="'发布时间:'+$u.timeFormat(detail.createTime, 'yyyy-mm-dd')"
					iconStyle="font-size: 18px;color:#909399;" align="left" size="16" lineHeight="50"
					color="#909399"></u--text>
			</view>
			<u--text  :text="detail.description" size="20" color="#333333"></u--text>
			<u-upload
					:fileList="detail.pictures"
					multiple
					:maxCount="1"
					:disabled="true"
				></u-upload>
		</template>
		<template v-else-if="currentTab==1">
			<view class="timelineul">
				<view class="timelineli"  v-for="(item,index) in list">
					<view style="margin-top:-7rpx">{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}</view>
					<view>联系人(手机)</view>
					<u-upload v-if="item.pictures.length>0"
							:fileList="item.pictures"
							multiple
							:maxCount="10"
							:disabled="true"
						>
					</u-upload>
					<u-parse class="uparse" :content="item.description"></u-parse>
				</view>
			</view>
			<reply :repairId="detail.id"></reply>
		</template>	
		
	</view>
</template>

<script>
	import * as RepairProgressApi from '@/api/repair/repairprogress/index.js';

	import reply from './components/reply'
	export default {
		components: {
			reply
		},
		data() {
			return {
				detail: {id:0},
				list:[],
				tabs:[
					{
					  name: '维修详情',
					  value: 'all',
					},
					{
					  name: '维修进度',
					  value: '1',
					}
				],
				currentTab:0,
			};
		},
		onLoad(option) {
			let that = this
			console.log(option)
			if (option.detail) {
				//this.detail=JSON.parse(option.detail);
				console.log(this.detail)
			}
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('setRepairDetail', function(data) {
				console.log(data)
				//alert(JSON.stringify(data))
				that.detail = data
				that.getProgress()
				
			})
		},

		methods: {
            getProgress() {
				var  queryParams= {
					repairId:this.detail.id,
					pageNo: 1,
					pageSize: 100
				  }
            	RepairProgressApi.getProgressPage(queryParams)
            	.then(res => {
            		console.log(res)
            		res.data.list.forEach(item => {
            			if (item.image == "") {
            				item.image = "/static/images/news/news.jpeg"
            			}
            			item.pictures=JSON.parse(item.pictures)
            		})
            		this.list=res.data.list;
					console.log(this.list)
   
            	}).catch(err => {
       
            	})
            },
			goDetail: function(detail) {
				console.log(detail)
				uni.navigateTo({
					url: '/pages/repair/detail?detail=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			utabschange(e){
				console.log("aderror: " + JSON.stringify(e));
				this.currentTab = e.index;
			},
			aderror(e) {

			}
		}
	};
</script>

<style lang="scss" scoped>
	page{
		background-color: #82848a;
	}
	.container {
		padding: 0rpx;
		
	}
	::v-deep .u-tabs{
		background-color: #ffffff;
	}
	::v-deep .u-tabs__wrapper__nav__item{
		 flex:1;
	}
	.subtitle {
		display: flex;
		align-items: center;
	}

	.u-content {
		font-size: 34rpx;
		color: #82848a;
		line-height: 56rpx;
		min-height: 500rpx;
	}
	::v-deep .u-upload__deletable{
		display: none;
	}
 	
	::v-deep .u-upload__success{
		display: none;
	}
	::v-deep .u-upload__button--disabled{
		display: none;
	}
	.timelineul{
		display: flex;
		flex-direction: column;
		position: relative;
		margin:30rpx;
		padding:0rpx;
		border:0rpx solid #cccccc;
	}

	.timelineli{

		position: relative;
		padding:0 0 20rpx 30rpx;
		border-left: 2rpx solid rgb(60, 156, 255);
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
		background:rgb(60, 156, 255);
	}
	.timelineul .timelineli:last-child
	{
		border-left: 2rpx solid transparent;
	}
	.uparse{
		word-break: break-all;
	}
</style>