<template>
  <view class="container">
    <view class="user-info">
      <view class="info-item">
        <view class="label">头像：</view>
        <view class="info" @click="handleAvatarClick">
          <u-avatar size="50" shape="square" :src="userInfo.avatar"></u-avatar>
          <u-icon class="btn" name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="info-item">
        <view class="label">昵称：</view>
		<navigator url="/pages/house/users/user_nickname/index" hover-class="none" class="info">
          <view class="value">{{userInfo.nickname }}</view>
          <u-icon class="btn" name="arrow-right"></u-icon>
        </navigator>
      </view>
      <view class="info-item">
        <view class="label">手机：</view>
        <navigator url="/pages/house/users/user_phone/index" hover-class="none" class="info">
          <view class="value">{{ userInfo.mobile }}</view>
          <u-icon class="btn" name="arrow-right"></u-icon>
        </navigator>
      </view>
      <view class="info-item">
        <view class="label">密码：</view>
        <navigator url="/pages/house/users/user_pwd_edit/index" hover-class="none" class="info">
          <view class="value">设置密码</view>
          <u-icon class="btn" name="arrow-right"></u-icon>
        </navigator>
      </view>
      <view class="info-item">
        <view class="label">注销账号</view>
        <navigator url="/pages/house/users/user_logoff/index" hover-class="none" class="info">
          <view class="value">注销后无法恢复</view>
          <u-icon class="btn" name="arrow-right"></u-icon>
        </navigator>
      </view>
    </view>
    <view style="padding: 30px;" v-if="isLogin">
      <u-button type="error" :plain="true"  shape="circle" text="退出登录"  @click="logout"></u-button>
    </view>


  </view>
</template>

<script>
  import { toLogin } from '@/libs/login.js';
  import { mapGetters } from "vuex";
  import * as UserApi from '@/api/member/user.js';
  import * as AuthApi from '@/api/member/auth.js';
export default {
  data() {
    return {
    	memberInfo: {},
    	loginType: 'h5', //app.globalData.loginType
    	newAvatar: '',
    };
  },
  computed: mapGetters(['isLogin', 'userInfo']),
  onLoad() {
	if (!this.isLogin) {
		toLogin();
	}
  },
  methods: {
    loadUserInfoData() {
      getUserInfo().then(res => {
        this.userInfo = res.data
        this.tempName = this.userInfo.nickname
      })
    },
    handleAvatarClick() {
	  this.$util.uploadImageOne({}, res => {
			//this.newAvatar = res.data;
			console.log(res)
	  });
/*      uni.chooseImage({
        success: chooseImageRes => {
          const tempFilePaths = chooseImageRes.tempFilePaths
          updateAvatar(tempFilePaths[0]).then(res => {
            this.userInfo.avatar = res.data
            this.$store.commit('SET_USER_INFO', this.userInfo)
          })
        }
      }) */
    },
    handleNameChange(val) {
      let str = uni.$u.trim(val, 'all')
      this.$nextTick(() => {
        this.userInfo.nickname = str
      })
    },
    handleSaveBtnClick() {
      updateNickname({ nickname: this.userInfo.nickname }).then(res => {
        this.tempName  = this.userInfo.nickname
        this.$store.commit('SET_USER_INFO', this.userInfo)
        uni.$u.toast('已保存')
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/user/user'
          })
        }, 300)
      })
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '您确定要退出登录吗',
        success: res => {
          if (res.confirm) {
			AuthApi.logout().then(res => {
				this.$store.commit("LOGOUT");
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}).catch(err => {
				console.log(err);
				this.$util.Tips({
					title: '网络异常。'
				});
			});
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
    /////////////////////////////////////
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  .info-item {
    padding: 30rpx 40rpx;
    border-bottom: 1px solid #ff00000;
    display: flex;
	align-items: center;
	justify-content: space-between;
    .label {
      font-size: 30rpx;
    }
    .info {
      display: flex;
      color: #606266;
      .value {
        font-size: 30rpx;
      }
      .btn {
        margin-left: 30rpx;
      }
    }
    .name-edit {
      display: flex;
      .edit-btn-group {
        display: flex;
        .edit-btn {
          margin-left: 20rpx;
        }
      }
    }
  }
}

.btn-group {
  padding: 0 30rpx;
}
</style>
