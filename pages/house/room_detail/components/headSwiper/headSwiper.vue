<template>
	<view class="container">
		 <video v-if="current==0" autoplay="true" :src="video.url" style="width:100%;height:100%;">
			 
		 </video>
		 <u-swiper v-else-if="current==1" :list="images" keyName="url" @change="uswiperchange" @click="uswiperclick" :autoplay="false"
		           height="500rpx" radius="0" indicatorStyle="right: 20px">
		   <view slot="indicator" class="indicator-num">
		     <text class="indicator-num__text">{{ currentNum + 1 }}/{{ images.length }}</text>
		   </view>
		 </u-swiper>
		 <image v-else-if="current==2" :src="layout.url" style="width:100%;height:100%;" mode="aspectFit"></image>
		 <u-subsection class="usubsection" bgColor="rgba(0,0,0,0.4)" activeColor='#444444' inactiveColor="#ffffff" :list="list" :current="current"  @change="sectionChange"></u-subsection>
		 
	</view>
</template>

<script>
 
	export default {
		data() {
			return {
				currentNum: 0,
				list: ['视频', '图片', '户型'],
				current: 1 ,
				video:{url:""},
				images:[],
				layout:{url:""},
			};
		},
	    props: {
			 detail: {
				 type:Object,
				 default: () => ({})
			 }
	    },
		watch: {
		    detail: {
		        handler(newVal, oldVal) {
				   let that=this	
				   console.log("===============detail",newVal)
				   that.init();  
		           
		        },
		        immediate: true
		    }
		
		},
		methods: {
			init() {
 
				var video=this.detail.images.find(item => item.type=="视频");
				if(video!=null)this.video=video;
				
				var layout=this.detail.images.find(item => item.type=="户型图");
				if(layout!=null)this.layout=layout;
				
				this.images=this.detail.images.filter(item => item.type=="图片");
				console.log("=================JSON.stringify(this.images)")
				console.log(JSON.stringify(this.images))
			},
			uswiperchange(e){
				console.log(e) 
				this.currentNum=e.current
			},
			
			uswiperclick(e){
				console.log(e) 
				 
			},
			sectionChange(index) {
				console.log(index)
				this.current = index;
			}
			 
		}
	};
</script>

<style lang="scss" scoped>
.container{
  height: 500rpx;
}
.indicator-num {
  display: flex;
  justify-content: center;
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 100px;
  width: 45px;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}

 ::v-deep .u-subsection{
 	 border-radius: 16px !important;
	 position: absolute !important;
	 top: 420rpx !important;
	 width: 300rpx !important;
	 left: 50% !important;
	 transform: translate(-50%, 0) !important;
 }
 ::v-deep .u-subsection--button__bar{
 	background-color: #ffffff;
     border-radius: 16px !important;
 }
 ::v-deep .u-swiper__indicator {
    position: absolute;
    bottom: 28rpx;
}
</style>