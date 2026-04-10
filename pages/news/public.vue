<template>
	<view class="container">
		<u-loading-icon text="加载中" :vertical="true" v-if="loading"></u-loading-icon>
		<!--u--text :lines="6" :text="detail.title" align="center" size="20" color="#333333"></u--text-->
		<view class="u-content">
			<u-parse :content="detail.content"></u-parse>
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		components: {

		},
		data() {
			return {
				detail: {},
				loading:false,
			};
		},
		onLoad(option) {
			let that = this
			this.goDetail(option.id)
		},

		methods: {

			goDetail: function(id) {
				this.loading=true
				var queryParams = {
					id: id
				}
				request.get('app-api/house/news/get', queryParams,{noAuth:true})
				.then(res => {
					console.log(res)
					this.detail = res.data

					uni.setNavigationBarTitle({
						title: res.data.title
					});
                    this.loading=false
				}).catch(err => {
					console.log(err)
                    this.loading=false
				})
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
		color: #444444;
		line-height: 56rpx;
		margin: 0px 0 0 0;
	}
</style>