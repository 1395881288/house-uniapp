<template>
	<view class="container">
		<u--text :lines="6" :text="detail.title" align="center" size="20" color="#333333"></u--text>
		<view class="subtitle">

			<u--text :lines="1" :text="'发布时间:'+$u.timeFormat(detail.createTime, 'yyyy-mm-dd')"
				iconStyle="font-size: 18px;color:#909399;" align="left" size="16" lineHeight="50"
				color="#909399"></u--text>

			<u--text :lines="1" text="136" prefixIcon="eye" iconStyle="font-size: 20px;color:#909399;margin-right:5rpx"
				align="right" size="16" lineHeight="50" color="#909399"></u--text>

		</view>
		<view class="u-content">
			<u-parse :content="detail.content"></u-parse>
		</view>
		<view style="display: flex;">
			<u-button icon="/static/images/news/zan.png" :plain="true" size="small" shape="circle" text="1236"
				color="#606266"></u-button>
			<u-button icon="/static/images/news/weixin.png" :plain="true" size="small" shape="circle" text="朋友圈"
				style="margin: 0 30rpx;" color="#606266"></u-button>
			<u-button icon="/static/images/news/friend.png" :plain="true" size="small" shape="circle" text="微信"
				color="#606266"></u-button>

		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				detail: {}
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
			eventChannel.on('setNewsDetail', function(data) {
				console.log(data)
				//alert(JSON.stringify(data))
				that.detail = data
			})
		},

		methods: {

			goDetail: function(detail) {
				console.log(detail)
				uni.navigateTo({
					url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail))
				});
			},

			aderror(e) {

			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx;
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
</style>