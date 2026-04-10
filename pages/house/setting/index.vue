<template>
  <view class="container">
<!--    <u-cell-group class="setting-list">
      <u-cell class="setting-item" title="清理缓存" isLink url="" @click="action('clearCache')"></u-cell>
      <u-cell class="setting-item" title="检查更新" isLink url="" @click="action('checkUpdate')"></u-cell>
    </u-cell-group>
	<u-gap height="10"></u-gap> -->
    <u-cell-group class="setting-list">
      <u-cell class="setting-item" title="关于我们" isLink url="/pages/news/public?id=30"></u-cell>
      <u-cell class="setting-item" title="版权信息" isLink url="/pages/news/public?id=29"></u-cell>
      <u-cell class="setting-item" title="隐私政策" isLink url="/pages/news/public?id=25"></u-cell>
      <u-cell class="setting-item" title="用户协议" isLink url="/pages/news/public?id=24"></u-cell>
      <u-cell class="setting-item" title="个人信息收集与使用清单" isLink url="/pages/news/public?id=27"></u-cell>
      <u-cell class="setting-item" title="第三方共享信息清单" isLink url="/pages/news/public?id=26"></u-cell>
    </u-cell-group>

  </view>
</template>

<script>
 
export default {
  components: {  },
  data() {
    return {}
  },
  computed: {

  },
  onLoad() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
::v-deep .u-cell-group{
	background-color: #ffffff;
}
.setting-list {

  background-color: #fff;
  border-radius: 15rpx;

  .setting-item {
    display: flex;
    &:last-child {
      border-bottom: none;
    }
  }
}

::v-deep .u-cell__body::before {
		 content: "";
		 width:10rpx;
		 height:10rpx;
		 border-radius:5rpx ;
		 margin-right: 15rpx;
		 background-color: #666666;
  }
::v-deep .u-cell__body{
    padding: 15px 15px !important;
}
 
</style>
