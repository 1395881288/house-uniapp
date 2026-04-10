<template>
	<view class="tree" :style="{marginLeft:num==0?'20rpx':'60rpx'}">
      <block v-for="(item,index) in items">
        <view class="user">
           <view class="avatar">
             <u-avatar size="60" shape="square" :src="item.avatar"></u-avatar>
           </view>
           <view class="info">
               <view>{{item.nickname}}</view>
               <view class="time">{{$u.timeFormat(item.brokerageTime, 'yyyy年mm月dd日')}}</view>
           </view>
           <view class="level">
             <u-tag :text="(num+1)+'级'" plain size="mini" type="warning"></u-tag>
           </view>
        </view>
        <block v-if="item.children && item.children.length>0">
           <x-tree :items="item.children" :num="num+1"></x-tree>
        </block>
      </block>

	</view>
</template>
<script>
 
	export default {
        name: 'x-tree',
		components:{
		 
		},
		props: {
			items: {
				type: Array,
				default: () => {
					return []
				}
			},
      // 数字有默认值
      num: {
        type: Number,
        default: 0
      },
		},
	  beforeMount() {
		  console.log(this.items)
	  },

		methods: {


		}
	}
</script>
<style lang="scss" scoped>
.tree{
  margin-top: 20rpx;

  .user
  {
    display: flex;
    flex-direction: row;
    align-items: center;

    .info
    {
      margin-left: 10rpx;
      font-size: 28rpx;
      font-weight: bold;
      flex: 1;
      .time{
         margin-top: 10rpx;
         font-weight: normal;
      }
    }
    .level{
      margin-right: 20rpx;
    }
  }
}

</style>
