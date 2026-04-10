<template>
	<view class="container">
		<u--text :lines="6" :text="detail.title" align="center" lineHeight="28" size="20" color="#333333"></u--text>
		<view class="subtitle">

			<u--text :lines="1" :text="'发布时间:'+$u.timeFormat(detail.createTime, 'yyyy-mm-dd')"
				iconStyle="font-size: 18px;color:#666666;" align="left" size="18" lineHeight="50"
				color="#666666"></u--text>

			<u--text :lines="1" :text="detail.view" prefixIcon="eye" iconStyle="font-size: 21px;color:#666666;margin-right:5rpx"
				align="right" size="18" lineHeight="50" color="#666666"></u--text>

		</view>
		<view class="u-content">
			<u-parse :content="detail.content"></u-parse>
		</view>
		<view style="height: 120rpx;"></view>
		<view class="footer" :style="{paddingBottom:safeAreaBottom+'px'}">
			<view class="footergroup">
				<template v-if="stared!=undefined">
					<u-button v-if="stared==false" :icon="stared==true?'thumb-up-fill':'thumb-up'" :plain="true" size="small" shape="circle" :text="detail.star"
						color="#555555" style="width: 40%;margin-right: 60rpx;" @click="star"></u-button>
					<u-button v-if="stared==true"  :icon="stared==true?'thumb-up-fill':'thumb-up'"  :plain="true" size="small" shape="circle" :text="detail.star"
						color="#555555" style="width: 40%;margin-right: 60rpx;" @click="unstar"></u-button>
				    <view style="width: 60rpx;"></view>
				</template>
			    
		
				<u-button icon="share" :plain="true" size="small" shape="circle" open-type="share" text="分享好友"
					style="width:40%" color="#555555"></u-button>
			</view>
			


		</view>
	</view>
</template>

<script>
    import request from "@/utils/request.js";
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	export default {
		
		components: {

		},
		data() {
			return {
				detail: {view:undefined},
				safeAreaBottom:0,
				stared:undefined,
			};
		},
		//computed: mapGetters(['isLogin', 'userInfo']),
		computed: {
		  userInfo() {
		    return this.$store.getters.userInfo
		  },
		  isLogin() {
		    return this.$store.getters.isLogin
		  },
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			let routes = getCurrentPages(); // 获取当前页面栈数组
			let currentPage = routes[routes.length - 1]; // 获取最后一个页面对象，即当前页面
			let currentPageRoute = currentPage.route; // 获取当前页面的路径
			currentPageRoute+="?id="+this .detail.id
			console.log('当前页面路径:', currentPageRoute);
			return {
			  title: '金航E公寓',
			  imageUrl:"https://gongyutest.zh-jinhang.com/logo.png",//定义分享卡片上的分享图，不填则截取当前屏幕顶部750rpx*600rpx的区域当分享图。自定义分享图最佳尺寸比例是5：4，超出则会截取定义分享卡片上的分享图，不填则截取当前屏幕顶部750rpx*600rpx的区域当分享图。自定义分享图最佳尺寸比例是5：4，超出则会截取
			  path: currentPageRoute
			}
		},
		onShareTimeline(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			let routes = getCurrentPages(); // 获取当前页面栈数组
			let currentPage = routes[routes.length - 1]; // 获取最后一个页面对象，即当前页面
			let currentPageRoute = currentPage.route; // 获取当前页面的路径
			currentPageRoute+="?id="+this.detail.id
			console.log('当前页面路径:', currentPageRoute);
			return {
			  title: '金航E公寓',
			  imageUrl:"https://gongyutest.zh-jinhang.com/logo.png",//定义分享卡片上的分享图，不填则截取当前屏幕顶部750rpx*600rpx的区域当分享图。自定义分享图最佳尺寸比例是5：4，超出则会截取定义分享卡片上的分享图，不填则截取当前屏幕顶部750rpx*600rpx的区域当分享图。自定义分享图最佳尺寸比例是5：4，超出则会截取
			  path: currentPageRoute
			}
		},
		onLoad(option) {
			let that = this
			console.log(option)
			if (option.detail) {
				//this.detail=JSON.parse(option.detail);
				//console.log(this.detail)
			}
		    this.getDetail(option.id)
		    
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('setNewsDetail', function(data) {
				console.log(data)
				//alert(JSON.stringify(data))
				//that.detail = data
			})
		},
        onReady() {
			let that = this
        	uni.getSystemInfo({
        	 success: function(res) {
			   console.log(res); 
        	   // 获取底部安全区域的高度 这里取底部安全区高度/2 不然显得太多空隙
        	   that.safeAreaBottom = res.safeAreaInsets.bottom /2 ;
        	   console.log("底部安全区距离：" + that.safeAreaInsets);
        	 }
        	});
        },
		methods: {
		    getDetail(id){
			  let that=this
			  var queryParams={id:id}
			  request.get('app-api/house/news/get', queryParams,{noAuth: true}).then(res => {
				 console.log(res)
                 that.detail = res.data
				 that.isstar(id);
			  }).catch(err => {
				 console.log(err)

			  })
			},
			goDetail: function(detail) {
				console.log(detail)
				uni.navigateTo({
					url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail))
				});
			},

			aderror(e) {

			},
			star(){
			  let that=this
			  var queryParams={userId:0,module:'news',postId:this.detail.id}
			  request.post('app-api/house/star/star', queryParams,{noAuth: true}).then(res => {
				 console.log(res)
			     this.getDetail(this.detail.id)
				 this.$util.Tips({
				 	title: '点赞成功。'
				 });
			  }).catch(err => {
				 console.log(err)
			
			  })
			},
			unstar(){
			  let that=this
			  var queryParams={}
			  request.delete('app-api/house/star/unstar?postId='+this.detail.id, queryParams,{noAuth: true}).then(res => {
				 console.log(res)
			     this.getDetail(this.detail.id)
				 this.$util.Tips({
				 	title: '已取消点赞。'
				 });
			  }).catch(err => {
				 console.log(err)
			
			  })
			},
			isstar(id){
			  if(!this.isLogin)
			  {
				  return;
			  }
			  let that=this
			  var queryParams={id:id}
			  request.get('app-api/house/star/isstar', queryParams,{noAuth: true}).then(res => {
				 console.log(res)
			 
				 this.stared=res.data
			  }).catch(err => {
				 console.log(err)
			
			  })
			},
			/////////////////////////////////////////////////////////////////////////////////////
		}
	};
</script>
<style lang="scss" scoped>
	.container {
		padding: 30rpx;
		
		padding-bottom: 0!important;  
		padding-bottom: calc(constant(safe-area-inset-bottom));
		padding-bottom: calc(env(safe-area-inset-bottom));
	}
    ::v-deep .u-text__value span{
		word-break: break-all;
	}
	.subtitle {
		display: flex;
		align-items: center;
	}

	.u-content {
		font-size: 34rpx;
		color: #555555;
		line-height: 56rpx;
		min-height: 500rpx;
	}
	.footer{
		position: fixed;
		left:0;
		bottom: 0;
		width: 100%;
		padding: 0rpx 30rpx;
		background-color: #F5F5F5;
        box-shadow: 0px -3px 10px 6px #eaeaea;
        .footergroup{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
		}
	}
	::v-deep .u-button .u-icon__icon{
		font-size: 20px !important;
	}
</style>