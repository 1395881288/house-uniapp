<template>
	<view>
		<view class="ChangePassword">
			<view class="list">
				<u-alert :title="title" type = "error" effect="dark" :description = "description"></u-alert>
			</view>
			<button form-type="submit" class="confirmBnt bg-color" @click="editPwd">注销账号</button>
		</view>
	</view>
</template>
<script>
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	import * as AuthApi from '@/api/member/auth.js';
	import * as UserApi from '@/api/member/user.js';
	export default {
		data() {
			return {
				title:'在注销账号前，请您进行以下风险确认：',
				description:'\r\n1，您关注的房源、优惠券、与经纪人的聊天记录将无法找回。\r\n\r\n2，请您务必慎重阅读关于您权益的重要提示，确保在您注销账号时已处理完毕权益。'
			};
		},
		computed: mapGetters(['isLogin', 'userInfo']),
		onLoad() {
			if (!this.isLogin) {
				toLogin();
				return;
			}
 
		},
		methods: {
			 
			editPwd: function() {
				 
				uni.showModal({
					title: '确认注销账号吗？',
					confirmText: '确定',
					success: (res) => {
						if (!res.confirm) 
						{
							return this.$util.Tips({
								title: '您已取消！'
							}, {
								tab: 5,
								url: '/pages/house/users/user_info/index'
							});
						}
						UserApi.logoff({
		
						}).then(res => {
							AuthApi.logout().then(res => {
								this.$store.commit("LOGOUT");
							}).catch(err => {
								console.log(err);
							});
							return this.$util.Tips({
								title: '注销成功！'
							}, {
								tab: 1,
								url: '/pages/index/index'
							});
						}).catch(err => {
							return this.$util.Tips({
								title: err
							});
						})
					}
				});
			}
			 
		}
	}
</script>

<style lang="scss" scoped>
	.shading {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

		/* #ifdef APP-VUE */
		margin-top: 50rpx;
		/* #endif */
		/* #ifndef APP-VUE */

		margin-top: 200rpx;
		/* #endif */


		image {
			width: 180rpx;
			height: 180rpx;
		}
	}

	page {
		background-color: #fff !important;
	}

	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 55rpx;
	}

	.ChangePassword .list {
		margin: 50rpx;
	}

	.ChangePassword .list .item {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.ChangePassword .list .item input {
		width: 100%;
		height: 100%;
		font-size: 32rpx;
	}

	.ChangePassword .list .item .placeholder {
		color: #b9b9bc;
	}

	.ChangePassword .list .item input.codeIput {
		width: 340rpx;
	}

	.ChangePassword .list .item .code {
		font-size: 32rpx;
		// background-color: #fff;
	}

	.ChangePassword .list .item .code.on {
		color: #b9b9bc !important;
	}

	.ChangePassword .confirmBnt {
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		margin: 92rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
	}
</style>