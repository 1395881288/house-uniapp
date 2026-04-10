<template>
  <view class="container">
    <view class="system-setting" @click="navTo('/pages/house/setting/index',{login:false})">
      <u-icon name="setting" color="#939393" size="22"></u-icon>
    </view>
    <view class="user-header">
      <view class="user-info" @click="navTo('/pages/house/users/user_info/index',{login:true})">
        <u-avatar size="60" shape="circle" :src="userInfo.avatar"></u-avatar>
        <view class="info-text">
          <view class="user-nickname">{{ hasLogin ? userInfo.nickname || '会员用户' : '游客' }}</view>
          <view class="user-mobile">{{ hasLogin ? '查看/编辑个人资料' || ' ' : '登录/注册' }}</view>
        </view>
      </view>

    </view>

    <u-gap height="10" bgColor="#f3f3f3"></u-gap>

    <u-cell-group class="fun-list">
      <u-cell class="fun-item" size="large" icon="star"   title="我的收藏" isLink @click="navTo('/pages/house/users/favorite/favorite',{login:true})"></u-cell>
      <u-cell class="fun-item" size="large" icon="coupon" title="我的优惠券" isLink @click="navTo('/pages/house/users/coupon/coupon',{login:true})"></u-cell>

      <!-- <u-cell class="fun-item" size="large" icon="gift"   title="抽奖记录" isLink @click="navTo('/pages/house/users/prize/history',{login:true})"></u-cell> -->

      <u-cell class="fun-item" size="large" icon="plus-people-fill" title="邀请好友赢现金" isLink  @click="navTo('/pages/house/users/user_spread_user/index',{login:true})"></u-cell>
    </u-cell-group>

    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <u-cell-group class="fun-list">
      <u-cell class="fun-item" size="large" icon="server-fill" title="联系客服" isLink url="/pages/news/public?id=30"></u-cell>
    </u-cell-group>
    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <view class="invite" @click="navTo('/pages/house/users/user_spread_user/index',{login:true})">
      <u--image class="woshou" :showLoading="true" src="/static/images/user/invite.png" width="150rpx" height="130rpx" mode="widthFix"></u--image>
      <view class="txt">
        邀请好友住我居
        <br>
        必得 200元 现金奖励，马上行动吧。
      </view>
    </view>
  </view>
</template>

<script>
 
export default {
  data() {
    return {
      orderPage: '/pages/order/list',
      statList: [
        { value: '0', title: '我的收藏' },
        { value: '0', title: '我的消息' },
        { value: '0', title: '我的足迹' }
      ]
    }
  },
  onLoad() {
    if (this.hasLogin) {
      this.$store.dispatch('ObtainUserInfo')
      this.getPrizeRecord()
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
    hasLogin() {
      return this.$store.getters.isLogin
    },
    orderStatusList() {
      let orderStatusList = []
      for (let status in orderStatus) {
        if (status !== '40') {
          orderStatusList.push({ name: orderStatus[status].name, status: status, icon: orderStatus[status].icon })
        }
      }
      return orderStatusList
    }
  },
  methods: {
    getPrizeRecord(){
      var queryParams = {
         pageNo: 1,
         pageSize: 10,
         status: 0,
      }
      uni.$u.http.get('/house/prize-record/page', {params: queryParams}).then(res => {
         console.log(res)


      }).catch(err => {
         console.log(err)
      })
    },
    pageRouter(pageUrl, param) {
      if (!this.hasLogin) {
        uni.$u.route('/pages/login/social')
      } else if (pageUrl === this.orderPage) {
        uni.$u.route(this.orderPage, {
          status: param
        })
      } else {
        uni.$u.route(pageUrl)
      }
    },
    link(pageUrl) {
        uni.$u.route(pageUrl)
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '您确定要退出登录吗',
        success: res => {
          if (res.confirm) {
            this.$store.dispatch('Logout')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    },
 
  }
}
</script>

<style lang="scss" scoped>
.system-setting {
    position: absolute;
    width: 100%;
    display: flex;
    top: 30rpx;
    right: 30rpx;
	justify-content: flex-end;
}
.user-header {
  background-color: #fff;
  display: flex;
  padding: 0 30rpx;
  height: 200rpx;

  .user-info {
   display: flex;
    align-items: center;

    .info-text {
      margin-left: 20rpx;

      .user-nickname {
        font-size: 30rpx;
        font-weight: 700;
        line-height: 50rpx;
      }

      .user-mobile {
        font-size: 24rpx;
        font-weight: 700;
        color: #939393;
        line-height: 50rpx;
      }
    }
  }

  .user-setting {
    margin-right: 5rpx;
    margin-top:0px;
  }
}

.order-header {
  display: flex;
  padding: 20rpx 30rpx;
  border-bottom: #FF0000;

  .order-title {
    color: #333333;
    font-size: 34rpx;
  }

  .see-all {
    height: 40rpx;
    display: flex;;
    color: #666666;
    font-size: 26rpx;
  }
}

.order-status-box {
  padding: 40rpx 0;
}

.stat-box {
  padding: 20rpx 0;
}

.grid-title {
  line-height: 50rpx;
  font-size: 26rpx;
}

.grid-value {
  line-height: 50rpx;
  font-size: 36rpx;
  font-weight: 700;
  color: #2b85e4;
}

.fun-list {
  .fun-item {

	background-color: #ffffff;


  }
}
.invite{

  height: 200rpx;
  margin: 0 20rpx;
  border-radius: 10rpx;
  border: 0rpx solid #ffddab;

  //background: linear-gradient(to top right,#ffddab,#fff8ee);
  //background: linear-gradient(to top right,#ff5200,#ffcbb3);
  background: url(/static/images/user/invitebg.jpg) left top no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  .woshou{
    margin-left:30rpx;

  }
  .txt{
    margin-left:20rpx;
    font-size: 30rpx;
    line-height: 50rpx;
    font-weight: bold;
    color:#ffffff;
  }
}
</style>
