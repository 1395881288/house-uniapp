<template>
  <view><q-turntable ref="turntable" @start="turntableStart" @success="turntableSuccess"></q-turntable></view>
</template>

<script>

import qTurntable from '@/components/q-turntable/q-turntable.vue';
export default {
  components: {qTurntable},
  data() {
    return {
      award: 1,
      awardList: [
      	{
      		title: '特等奖'
      	},
      	{
      		title: '一等奖'
      	},
      	{
      		title: '二等奖'
      	},
      	{
      		title: '三等奖'
      	},
      	{
      		title: '四等奖'
      	},
      	{
      		title: '啥也没有'
      	}
      ] // 顺时针对应每个奖项

    };
  },

  methods: {
    // 用户点击开始抽奖
    turntableStart() {
      let index = Math.floor(Math.random() * 6 + 1) //前端随机数，这里应该后台返回中奖结果
      this.award = index
      this.$refs.turntable.begin(this.award);
    },

    // 抽奖完成后操作
    turntableSuccess() {
      const index = this.award - 1;
      console.log('bind:success', this.awardList[index]);
      uni.showToast({
        title: `恭喜你获得${this.awardList[index].title}`,
        icon: 'none'
      });
    },

  }
}
</script>

<style lang="scss" scoped>

</style>
