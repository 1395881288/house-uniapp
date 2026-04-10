<template>
	<view class="container">
		<view class="top">
			<view class="topitem">
				<view class="topitemtitle">
					佣金总计(元)
				</view>
				<view class="topitemmoney">
					{{ fen2yuan(spreadInfo.brokeragePrice) }}
				</view>
			</view>
			<view class="topitem">
				<view class="topitemtitle">
					已提现(元)
				</view>
				<view class="topitemmoney">
					{{ fen2yuan(spreadInfo.withdrawBrokeragePrice || 0) }}
				</view>
			</view>
			<view class="topitem">
				<view class="topitemtitle">
					未提现(元)
				</view>
				<view class="topitemmoney">
					{{ fen2yuan(spreadInfo.brokeragePrice-spreadInfo.withdrawBrokeragePrice || 0) }}
				</view>
			</view>
		</view>
		<view class="box">
			<view class="title">
				功能专区
			</view>
			<view class="content">
				<view class="contentitem" @click="navTo('/pages/house/users/user_spread_team/index')">
					<u-icon name="account" color="#fe5500" size="28"></u-icon>
					<view class="contentitemtitle">
						我的团队
					</view>
				</view>
				<view class="contentitem" @click="navTo('/pages/house/users/user_spread_money/index?type=2')">
					<u-icon name="file-text" color="#fe5500" size="28"></u-icon>
					<view class="contentitemtitle">
						佣金明细
					</view>
				</view>
				<view class="contentitem" @click="navTo('/pages/house/users/user_spread_money/index?type=1')">
					<u-icon name="list-dot" color="#fe5500" size="28"></u-icon>
					<view class="contentitemtitle">
						提现记录
					</view>
				</view>
				<view class="contentitem" @click="navTo('/pages/house/users/user_spread_withdraw/index')">
					<u-icon name="red-packet" color="#fe5500" size="28"></u-icon>
					<view class="contentitemtitle">
						申请提现
					</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="title">
				推广方式
			</view>
			<view class="content">
 
				<navigator url='/pages/house/users/user_spread_code/index' hover-class="none"
					class='contentitem'>	
					<u-icon name="/static/images/user/erweima.png" color="#2979ff" size="28"></u-icon>
					<view class="contentitemtitle">
						推广名片
					</view>
				</navigator>
				<view class="contentitem">
					<u-icon name="/static/images/news/weixin.png" color="#2979ff" size="28"></u-icon>
					<view class="contentitemtitle">
						分享好友
					</view>
				</view>
				<view class="contentitem">
					<u-icon name="/static/images/news/friend.png" color="#2979ff" size="28"></u-icon>
					<view class="contentitemtitle">
						分享朋友圈
					</view>
				</view>
			</view>
		</view>
		<view class="box target-1">
			<view class="title">
				使用说明
			</view>
			<view class="content">
				<view class="readme">
					1：分享到微信好友或朋友圈。<br>
					2：用户点击分享进入并注册账号，成为您的团队成员。<br>
					3：您的团队成员租房后，您将收到一定比例的佣金提成。
				</view>

			</view>
		</view>
		<guideStep :step="step"></guideStep>
	</view>
</template>

<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import * as BrokerageAPI from '@/api/house/brokerage/brokerage.js'
	import * as Util from '@/utils/util.js';
	import guideStep from "./components/xky-guideStep/xky-guideStep.vue";
	export default {
		components: {
           guideStep
		},
		data() {
			return {
				spreadInfo: {},
				step:{
					name:'workbenchKey',
					repeat:true,
					guideList: [
						{
							el: '.target-1', 
							tips: '使用说明', 
							style: "border-radius: 8rpx;margin: 0",
							next:"知道了"
						},
					]
				}
 
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {

			if (!this.isLogin) {
				toLogin();
				return;
			}
			this.getSpreadInfo();
		},
		onShareAppMessage: function() {
		  const share = {
		      title: '分享标题',
		      path: '/pages/user/index',
		      //imageUrl: '',
		  };
		  return share;
		},
        onReady() {
			// 切记组件树以挂载后调用, 如有动态内容会改变页面结构 则等加载后 $nextTick 再触发
 
		},
		methods: {
			/**
			 * 获取个人用户信息
			 */
			getSpreadInfo: function() {
				BrokerageAPI.getBrokerageUserSummary().then(res => {
					this.$set(this, 'spreadInfo', res.data);
				});
			},
			link(pageUrl) {
				uni.$u.route(pageUrl)
			},
			fen2yuan(price) {
				return Util.fen2yuan(price)
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {}

	.container {}

	.top {
		display: flex;
		background: #fff5f0;
		background: url(/static/images/user_bg.png) center center no-repeat;
		background-size: 100% 200rpx;
		min-height: 180rpx;
		box-shadow: 0px 3px 5px 1px #cdcdcd;

		.topitem {
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: center;
			justify-content: center;

			.topitemtitle {
				color: #ffffff;
				font-size: 28rpx;
			}

			.topitemmoney {
				margin-top: 10rpx;
				color: #ffffff;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
	}

	.box {
		margin: 20rpx 20rpx 0 20rpx;
		background: #fff5f0;

		border-radius: 12rpx;
		box-shadow: 0px 3px 5px 1px #cdcdcd;

		.title {
			background-image: linear-gradient(to right, #f44336, #ff9800);
			border-radius: 12rpx 12rpx 0 0;
			line-height: 80rpx;
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #ffffff;
		}

		.content {
			min-height: 200rpx;
			display: flex;

			.contentitem {
				display: flex;
				flex-direction: column;
				flex: 1;
				align-items: center;
				justify-content: center;

				.contentitemtitle {
					color: #606266;
					font-size: 28rpx;
					margin-top: 10rpx;
				}

				.contentitemmoney {
					margin-top: 10rpx;
					color: #606266;
					font-size: 36rpx;
					font-weight: bold;
				}
			}

			.readme {
				font-size: 26rpx;
				padding: 20rpx;
				line-height: 46rpx;
			}
		}
	}
</style>