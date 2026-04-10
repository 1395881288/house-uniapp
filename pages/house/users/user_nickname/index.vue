<template>
	<view class="container">
		<view class="ChangePassword">
			<view class="list">
				<view class="item">
					<input placeholder='填写新的昵称' placeholder-class='placeholder' v-model="nickname" />
				</view>
			</view>
			<button form-type="submit" class="confirmBnt bg-color" @click="editPwd">保存</button>
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
	import * as AuthUtil from '@/api/member/auth.js';
	import * as UserApi from '@/api/member/user.js';
	export default {
		data() {
			return {
				phone: '', // 需要更换的手机号
				nickname:"",
				captcha: '',
				isNew: true, // true 是第一步，校验老的手机号验证码；false 是第二步，校验新手机号的验证码；
				oldCaptcha: '', // 进入第二步时，需要使用它保存老的手机验证码

				timer: '',
				text: '获取验证码',
				nums: 60,
				disabled: false
			};
		},
		computed: mapGetters(['isLogin', 'userInfo']),
		onLoad() {
			if (!this.isLogin) {
				toLogin();
				return;
			}
			this.nickname=this.userInfo.nickname
			console.log(this.nickname)
		},
		methods: {
			getTimes() {
				this.nums = this.nums - 1;
				this.text = "剩余 " + this.nums + "s";
				if (this.nums < 0) {
					clearInterval(this.timer);
				}
				this.text = "剩余 " + this.nums + "s";
				if (this.text < "剩余 " + 0 + "s") {
					this.disabled = false;
					this.text = "重新获取";
				}
			},
			editPwd: function() {
				this.nickname=this.nickname.trim()
				if (!this.nickname) {
					return this.$util.Tips({
						title: '请填写昵称！'
					});
				}
				if (this.nickname.length>10) {
					return this.$util.Tips({
						title: '昵称长度不能大于15！'
					});
				}
				uni.showModal({
					title: '确认修改昵称吗？',
					confirmText: '绑定',
					success: (res) => {
						if (!res.confirm) {
							return this.$util.Tips({
								title: '您已取消！'
							}, {
								tab: 5,
								url: '/pages/house/users/user_info/index'
							});
						}
						UserApi.updateUser({
							nickname: this.nickname
						}).then(res => {
							this.$store.dispatch('USERINFO');
							return this.$util.Tips({
								title: '昵称修改成功',
								icon: 'success'
							}, {
								tab: 5,
								url: '/pages/house/users/user_info/index'
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
    .container{
		background-color: #fff;
		padding-top: 50rpx;
	}
	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		padding-top: 55rpx;
	}

	.ChangePassword .list {
		width: 580rpx;
		display: flex;
		margin: 0rpx auto 0 auto;
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