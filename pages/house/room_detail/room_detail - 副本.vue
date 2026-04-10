<template>
  <view class="container">
    <!-- 商品轮播图 -->
	<headSwiper :detail="detail"></headSwiper>
   
    <view class="product-box">
      <!-- TODO @Sfmind：样式讨论，要不要改成类似 likeshop 的样子？第一栏：价格 + 分享；第二栏：商品名；第三栏：库存、销量、浏览量 -->
      <view class="prod-info">
        <view class="info-text">
          <u--text :lines="2" size="20px" color="#333333" :bold="true" :text="detail.roomTitle"></u--text>
        </view>
        <view class="price-and-cart">
          <!-- TODO @Sfmind：custom-text-price 会报错 -->
          <view class="price">¥{{detail.price}}</view>
          <view class="priceunit">元/月</view>
          <view class="yanfu">押{{detail.depositMultiple | uppercase}}付{{detail.rentType | uppercase}}</view>
        </view>
      </view>
    </view>
	
    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <view class="descsub">
       <view class="item">
          <view class="itemtitle">{{detail.roomNumber}}室{{detail.hallNumber}}厅{{detail.toiletNumber}}卫</view>
          <view class="itemsubtitle">房型</view>
       </view>
       <view class="itemgap"></view>
       <view class="item">
          <view class="itemtitle">{{detail.area}}m²</view>
          <view class="itemsubtitle">面积</view>
       </view>
       <view class="itemgap"></view>
       <view class="item">
          <view class="itemtitle">{{detail.roomNumber+"/"+detail.floor}}层</view>
          <view class="itemsubtitle">楼层</view>
       </view>
       <view class="itemgap"></view>
       <view class="item">
          <view class="itemtitle">{{detail.towards || "朝南"}}</view>
          <view class="itemsubtitle">朝向</view>
       </view>
    </view>
    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <view  class="desctags">
      <template v-for="(item,index) in buildingFacilities">
          <u-tag v-if="item.value" :text="item.label" plain size="mini" type="primary" class="utag"></u-tag>
      </template>

    </view>
    <u-gap height="1" bgColor="#f3f3f3"></u-gap>
    <view class="row-box">
      <u-icon name="map-fill" color="#2979ff" size="18"></u-icon>
      <view class="row-left"> 位置：</view>
      <view class="row-right">
         <view class="row-content">
           {{detail.building.address}}
         </view>
      </view>
    </view>
	<view style="margin: 15rpx 0;">
      <u-gap height="10" bgColor="#dbdbdb"></u-gap>
	</view>
    <view class="row-box-desc">
      <view class="row-left">房屋介绍</view>
      <view class="row-right">
         <view class="row-content">
			 
		    <u-read-more ref="uReadMore" openText="收起" closeText="展开" :shadowStyle="shadowStyle"  :toggle="true"  showHeight="150">
				<!-- <rich-text :nodes="detail.desc"></rich-text> -->
				<u-parse :content="detail.desc" @load="contentload"></u-parse>
			</u-read-more>
         </view>
      </view>
    </view>
	<view style="margin: 15rpx 0;">
      <u-gap height="10" bgColor="#dbdbdb"></u-gap>
	</view>
    <view class="row-box-desc">
      <view class="row-left">房屋设施</view>
      <view class="row-right">
            <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
 				 
				 <view class="row-facility">
					  <template v-for="(item,index) in facilities">
						  <view v-if="item.value" class="exist">
							<view><i :class="'iconfontwoju icon-'+item.name" style="font-size: 42rpx;"></i></view>
							<view class="label">{{item.label}}</view>
						  </view>
						  <view v-else class="notexist">
							<view><i :class="'iconfontwoju icon-'+item.name" style="font-size: 42rpx;"></i></view>
							<view class="label">{{item.label}}</view>
						  </view>
					  </template>			  
				 </view>
            </scroll-view>
      </view>
    </view>
	
	<view style="margin: 15rpx 0;">
      <u-gap height="10" bgColor="#dbdbdb"></u-gap>
	</view>
    <view class="row-box-desc">
      <view class="row-left" style="margin-bottom:20rpx;">周边配套</view>
      <view class="row-right">
		  
         <view class="row-content" style="display: none;">
            阳光海景小区总共AB两栋，主要户型有60和78平的两房，小区旁边就是腾讯大厦，上下班都很方便。
            <br>
            户型简介：房子户型是60平的精装两房，中高楼层，视野采光不错。
            <br>
            装修描述：房子室居家精装修的，家私电器齐全，居家非常舒适。
         </view>
         <omap :building="detail.building"></omap>

      </view>
    </view>
    <u-gap height="60" bgColor="#f3f3f3"></u-gap>
    <view class="fixed-btn-box">
      <view class="btn-group">
        <navigator style="display: none;" class="btn-item" url="/pages/index/index" open-type="switchTab" hover-class="none">
          <u-icon name="home" :size="24"></u-icon>
          <view class="btn-text">首页</view>
        </navigator>
        <view class="btn-item" @click="doShare">
          <u-icon name="share" :size="24"></u-icon>
          <view class="btn-text">分享</view>
        </view>
        <!-- TODO @Sfmind:改成收藏 -->
        <view class="btn-item" @click="setCollect">
          <u-icon v-if="userCollect" name="star-fill" :size="24"></u-icon>
          <u-icon v-else name="star" :size="24"></u-icon>
          <view class="btn-text">收藏</view>
        </view>
		<view style="width: 10rpx;"></view>
        <view class="btn-item-main">
          <u-button type="warning" shape="circle" size="small" text="在线聊"></u-button>
        </view>
        <view class="btn-item-main">
          <u-button type="error" color="#ea322b" shape="circle" size="small" text="打电话"></u-button>
        </view>
      </view>
      <u-safe-bottom customStyle="background: #ffffff"></u-safe-bottom>
    </view>
  </view>
</template>

<script>
import request from "@/utils/request.js";
import omap from './components/map.vue';
import headSwiper from './components/headSwiper/headSwiper.vue';
import * as FavoriteApi from '@/api/favorite';
import { toLogin } from '@/libs/login.js';
import { mapGetters } from "vuex";
export default {
  components: {
	 omap,headSwiper 
  },
  data() {
    return {
      // ========== 商品详情相关的变量 ==========
      id: 0, // 商品 id
 
      
      currentSkuIndex: 0,
      skuPopup: false,
      detail:{
        images:[],
        building:{}
      },
      spu: {
        id: '',
        picUrls: [],
        minPrice: '13.00',
        sku: [
          {
            id: 0,
            picUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
            price: 13.0,
            desc: '山不在高，有仙则名。'
          },
          {
            id: 1,
            picUrl: 'https://cdn.uviewui.com/uview/album/2.jpg',
            price: 11.0,
            desc: '水不在深，有龙则灵。'
          },
          {
            id: 2,
            picUrl: 'https://cdn.uviewui.com/uview/album/3.jpg',
            price: 10.0,
            desc: '斯是陋室，惟吾德馨。'
          }
        ]
      },
      //select concat(',{name:"',value,"\"") as name,concat(',label:"',label,"\""),',value:false}' as exist from system_dict_data where dict_type='house_building_facility'
      buildingFacilities:[
        {name:"metro"	,label:"临地铁"	,value:false}
        ,{name:"elevator"	,label:"电梯"	,value:false}
        ,{name:"store"	,label:"便利店/超市"	,value:false}
        ,{name:"park"	,label:"停车场"	,value:false}
        ,{name:"gym"	,label:"健身房"	,value:false}
        ,{name:"place"	,label:"活动场地"	,value:false}
        ,{name:"monitoring"	,label:"安全监控"	,value:false}
        ,{name:"bookBar"	,label:"书吧"	,value:false}
        ,{name:"barCounter"	,label:"吧台"	,value:false}
        ,{name:"leisureArea"	,label:"休闲区"	,value:false}
        ,{name:"billiardsArea"	,label:"桌球区"	,value:false}
        ,{name:"dinnerBar"	,label:"DIY餐吧"	,value:false}
        ,{name:"laundry"	,label:"洗衣房"	,value:false}
        ,{name:"tableFootball"	,label:"桌上足球"	,value:false}
        ,{name:"skyGarden"	,label:"空中花园"	,value:false}
        ,{name:"restArea"	,label:"休息区"	,value:false}
        ,{name:"avAone"	,label:"影音区"	,value:false}
        ,{name:"reception"	,label:"前台"	,value:false}
        ,{name:"receptionArea"	,label:"会客区"	,value:false}
        ,{name:"danceRoom"	,label:"舞蹈室"	,value:false}
        ,{name:"expressLocker"	,label:"快递柜"	,value:false}
        ,{name:"allpets"	,label:"可养宠物"	,value:false}
      ],
      //select concat(',{name:"',value,"\"") as name,concat(',label:"',label,"\""),',value:false}' as exist from system_dict_data where dict_type='house_facility'
      facilities:[
		  {name:"television"	,label:"电视"	,value:false}
		  ,{name:"cooking"	,label:"可做饭"	,value:false}
          ,{name:"refrigerator"	,label:"冰箱"	,value:false}
          ,{name:"air_conditioner"	,label:"空调"	,value:false}
          ,{name:"broadband"	,label:"宽带"	,value:false}
          ,{name:"bed"	,label:"床"	,value:false}
          ,{name:"centralheating"	,label:"暖气"	,value:false}
          ,{name:"water_heater"	,label:"热水器"	,value:false}
          ,{name:"naturalgas"	,label:"天然气"	,value:false}
          ,{name:"washing_machine"	,label:"洗衣机"	,value:false}
          ,{name:"toilet"	,label:"卫生间"	,value:false}
          ,{name:"microwave_oven"	,label:"微波炉"	,value:false}
          ,{name:"induction_cooker"	,label:"电磁炉"	,value:false}
          ,{name:"wardrobe"	,label:"衣柜"	,value:false}
          ,{name:"desk"	,label:"书桌"	,value:false}
          ,{name:"kitchen_ventilator"	,label:"油烟机"	,value:false}
          ,{name:"sofa"	,label:"沙发"	,value:false}
          ,{name:"balcony"	,label:"阳台"	,value:false}
          ,{name:"smart_lock"	,label:"智能锁"	,value:false}
          ,{name:"water_purifier"	,label:"净水器"	,value:false}
      ],
      // ========== 收藏相关的变量 ==========
      userCollect: false,
      // ========== 点击阅读更多 ==========
	  shadowStyle:{
		// #ifndef APP-NVUE
		backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #F8F8F8 80%)",
		// #endif
		// #ifdef APP-NVUE
		// nvue上不支持设置复杂的backgroundImage属性
		backgroundImage: "linear-gradient(to top, #fff, rgba(255, 255, 255, 0.3))",
		// #endif
		paddingTop: "30px",
		marginTop: "-30px",
		zIndex:0,
	  },
	  iframesrc:"",
	  iframesrcbak:"https://map.woju.vip/index.html",//"http://127.0.0.1:3000/map.html"
 
      /////////////////////////
    }
  },
  filters:{
     uppercase:function (value) {
        if (!value) return ''
        value = value.toString()
        var zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var value=[...value].map(item => zh[parseInt(item, 10)]).join('');
        return value;
      }
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
  onLoad(options) {
    console.log("=========onUnload=========")
	//window.addEventListener("message",this.listenerIframeMessage)
    if (!options.id) {
      uni.$u.toast('请求参数错误')
      //uni.navigateBack();
      return;
    }
    this.id=options.id
    this.getDetail(options.id)
    // 加载商品详情
    this.spu.id = options.id
    this.loadProductData()
  },
  onUnload() {
  	console.log("=========onUnload=========")
	//window.removeEventListener("message",this.listenerIframeMessage)
  },
  methods: {
    getDetail(id){
      let that=this
      var queryParams={id:id}
      request.get('app-api/house/room/getRoomAndBuildingByRoomID', queryParams,{noAuth: true}).then(res => {
         console.log(res)

         that.iframesrc=that.iframesrcbak+"?buildingId="+res.data.building.id+"&lon="+res.data.building.longitude+"&lat="+res.data.building.latitude
         console.log("============iframesrc "+that.iframesrc)
		 var tempfacilities=JSON.parse(res.data.facilities);

         that.facilities.forEach(item => {
             item.value=false
         })
         tempfacilities.forEach(item => {
           that.facilities.forEach(item2 => {
             if(item==item2.name)
             {
               item2.value=true
             }
           })
         })
         that.buildingFacilities.forEach(item => {
             item.value=false
         })
         tempfacilities=JSON.parse(res.data.building.facilities);
         tempfacilities.forEach(item => {
           that.buildingFacilities.forEach(item2 => {
             if(item==item2.name)
             {
               item2.value=true
             }
           })
         })
         res.data.images=[
            {
              url: 'https://cdn.uviewui.com/uview/album/1.jpg',
              name: '山不在高，有仙则名。'
            },
            {
              url: 'https://cdn.uviewui.com/uview/album/2.jpg',
              name: '水不在深，有龙则灵。'
            },
            {
              url: 'https://cdn.uviewui.com/uview/album/3.jpg',
              name: '斯是陋室，惟吾德馨。'
            }
         ]
         try{
           var imageList=JSON.parse(res.data.imageList)
           if(imageList.length>0)
           {
			  imageList.forEach(item => {
				  /*
				  if(/\.mp4$/.test(item.url))
				  {
					  item.type='video'
				  }
				  else
				  {
					  item.type='image'
				  }
				  */
			  })
              res.data.images=imageList
              console.log(res.data.images)
           }
         }
         catch(e){

         }
		 
		 let point=this.bMapTransTMap(res.data.building.longitude,res.data.building.latitude);
		 res.data.building.longitude=point.lng;
		 res.data.building.latitude=point.lat;
						
         console.log("that.buildingFacilities")
         console.log(that.buildingFacilities)
         this.detail=res.data
         console.log("===============this.isLogin "+this.isLogin)
         if(this.isLogin)
         {
           this.isFavoriteExists();
         }
      }).catch(err => {
         console.log(err)

      })
    },
	listenerIframeMessage(data)
	{
		console.log("====================listenerIframeMessage "+JSON.stringify(data))
	},
    loadProductData() {
      this.spu={
          name:"业主全新自住装修，看房方便诚心出租，看房方便",
          minPrice:"1500",
          picUrls:[
            'https://cdn.uviewui.com/uview/swiper/swiper1.png',
            'https://cdn.uviewui.com/uview/swiper/swiper2.png',
            'https://cdn.uviewui.com/uview/swiper/swiper3.png'
          ],
          skus:[
            {
              picUrl:"https://cdn.uviewui.com/uview/swiper/swiper1.png'",
              price:100,
              desc:"desc"
            },
          ],
          facilities:[
            {name:"冰箱",value:true},
            {name:"洗衣机",value:true},
            {name:"热水器",value:true},
            {name:"宽带",value:true},
            {name:"沙发",value:true},
            {name:"油烟机",value:true},
            {name:"燃气灶",value:true},
            {name:"可做饭",value:true},
            {name:"电视",value:true},
            {name:"空调",value:true},
            {name:"衣柜",value:false},
            {name:"床",value:true},
            {name:"卫生间",value:true},
            {name:"智能门锁",value:true},
            {name:"阳台",value:true},
            {name:"燃气",value:true},
            {name:"电磁炉",value:false},
            {name:"微波炉",value:false},
            {name:"橱柜",value:true},
          ]
      }
    },
    loadProductDataold() {
      getSpuDetail(this.spu.id).then(res => {
        // this.spu.desc = res.data.description.replace(/<[^>]*>/g,'');
        // console.log(res)
        this.spu = res.data;
      })
    },
    handleSkuItemClick(index) {
      this.currentSkuIndex = index
    },
    handleCouponClick() {
      // TODO 未登录去登录，登录则跳转优惠券页面
    },
    handleEvanTypeClick(index) {
      this.currentEvanIndex = index
      // TODO 展示评论
    },
    isFavoriteExists(){
      FavoriteApi.isFavoriteExists(this.id).then(res => {
          console.log(res)
          this.userCollect = res.data;
      });
    },
	doShare(){
	   if(!this.isLogin)
	   {
	   		 uni.showModal({
	   		 	title: '提示',
	   		 	content: '需要登录才能访问。',
	   		 	success: function (res) {
	   		 		if (res.confirm) {
	   		 		   toLogin();
	   		 		} else if (res.cancel) {
	   		 			 
	   		 		}
	   		 	}
	   		 });
	      return;
	   }
	   this.$util.Tips({
	   	title: '分享功能开发中。'
	   });
	},
    setCollect(){
	  let that=this;
      console.log("=================addFavorite")
      //FavoriteApi.createFavorite(24);
      //FavoriteApi.isFavoriteExists(28);
      //FavoriteApi.deleteFavorite(25);
      //FavoriteApi.getFavoritePage({})
      if(!this.isLogin)
      {
		 uni.showModal({
		 	title: '提示',
		 	content: '需要登录才能访问。',
		 	success: function (res) {
		 		if (res.confirm) {
		 		   that.navTo("/pages/users/login/index") 
		 		} else if (res.cancel) {
		 			 
		 		}
		 	}
		 });
         return;
      }
      // 情况一：取消收藏
      if (this.userCollect) {
        FavoriteApi.deleteFavorite(this.id)
		.then(res => {
          this.$set(this, 'userCollect', false);
		  this.$util.Tips({
		  	title: '已取消收藏。'
		  });
        })
		.catch(err => {
		    console.log(err)
			this.$util.Tips({
				title: '网络异常。'
			});
		})
      // 情况二：添加收藏
      } else {
        FavoriteApi.createFavorite(this.id)
		.then(res => {
          this.$set(this, 'userCollect', true);
		  this.$util.Tips({
		  	title: '收藏成功。'
		  });
        })
		.catch(err => {
		    console.log(err)
			this.$util.Tips({
				title: '网络异常。'
			});
		})
      }
    },
	contentload(){
       this.$refs.uReadMore.init();
    },
	bMapTransTMap(lng, lat) {
	      let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	      let x = lng + 0.005420;
	      let y = lat - 0.003180;
	      let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	      let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	      let lngs = z * Math.cos(theta);
	      let lats = z * Math.sin(theta);
	      
	      return {
	          lng: lngs,
	          lat: lats        
	      }   
	},

	//////////////////////////////////////////////
  }
}
</script>

<style lang="scss" scoped>
.container{
  font-size: 14px;
}


.product-box {
  padding: 30rpx 30rpx 10rpx 30rpx;
  display: flex;

  .prod-info {
    padding-right: 30rpx;
    .info-text {
      padding-bottom: 10rpx;
    }
    .price-and-cart {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 10px 0rpx 0rpx 0rpx;

       .price{
         color: #ff0000;
         font-weight: bold;
         font-size: 40rpx;
         line-height: 1;
         letter-spacing: 0rpx;

       }
       .priceunit{
         color: #ff0000;
         font-size: 14px;
         margin-left: 10rpx;
       }
       .yanfu{
        font-size: 14px;
        color: #909399;
        margin-left: 20px;
       }
    }
  }
  .prod-favor {
    margin-top: 15rpx;
  }
}
.descsub{
  display: flex;
  padding: 0px 15px 0px 15px;

  .itemgap{
     flex:1;
  }
  .item{
     display: flex;
     flex-direction: column;
	 justify-content: center;
	 align-items: center;
     .itemtitle{
        font-size: 18px;
        color: #000000;
     }
     .itemsubtitle{
        font-size: 14px;
        color: #909399;
     }
  }

}
.desctags{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0px 15px 0px 15px;

  ::v-deep .u-tag{
    display: inline-block;
    margin:0 10px 10px 0;
  }
  ::v-deep .u-tag__text--mini{
    font-size: 14px;

  }
}
::v-deep .u-tag{
display: inline-block !important;
margin:0 10px 10px 0 !important;
}
::v-deep .u-tag__text--mini{
font-size: 14px !important;

}
.row-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30rpx;
  height: 70rpx;
  .row-left {
    font-size: 28rpx;
    color: #606266;
  }

  .row-right {
    display: flex;
    flex: 1;
    align-items: center;
    .row-content {
      flex: 1;
      font-size: 28rpx;
      color: #606266;
    }

  }
}
.row-box-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  padding: 0 30rpx 10px 30rpx;
  .row-left {
    font-size: 32rpx;
    font-weight: bold;
    margin: 10px 0 5px 0;
  }
  .row-right{
    width: 100%;
    color: #606266;
  }
  .row-facility{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 10px 0 0 0;
	
    .exist{
      display: flex;
      align-items: center;
	  flex-direction: column;
      width: 25%;
      font-size: 14px;
      margin: 0 0 10px 0;
	  i{
		  font-size: 24px;
		  width: 100%;
		  display: block;
	  }
	  .label{
		  width: 100%;
          text-align: center;
	   }
    }
    .notexist{
      display: flex;
      align-items: center;
	  flex-direction: column;
      width: 25%;
      color: #c8c9cc;
      font-size: 14px;
      margin: 0 0 10px 0;
	  i{
	  		  font-size: 24px;
	  		  width: 100%;
	  }
	  .label{
	  		  width: 100%;
	  		  text-align: center;
	   }
    }
  }
}
.sku-popup-slot {
  width: 750rpx;
  .current-sku-info {
    display: flex;
    padding: 30rpx 100rpx 0 30rpx;
    .current-sku-img {
      border-radius: 10rpx;
      ::v-deep * {
        border-radius: 10rpx;
      }
    }
    .current-sku-desc {
      padding: 0 30rpx;
      font-size: 28rpx;
      .current-sku-stock {
        height: 40rpx;
        line-height: 40rpx;
        color: #666666;
        font-size: 24rpx;
      }
    }
  }
  .sku-selection {
    margin: 30rpx;
    font-size: 26rpx;
    color: #939393;
    .sku-item {
      margin-bottom: 20rpx;
      border-radius: 6rpx;
      padding: 5rpx 15rpx;
      border: 1rpx solid #e3e3e3;
      width: fit-content !important;
      &.active {
        color: #666666;
        border: 1rpx solid #666666;
      }
    }
  }
  .sku-num-box {
    display: flex;
	padding: 30rpx;
    .text {
      font-size: 30rpx;
    }
  }
  .sku-btn-group {
    display: flex;
    height: 100rpx;
    .btn-item-main {
      width: 350rpx;
    }
  }
}

.prom-popup-slot {
  width: 750rpx;
  min-height: 500rpx;
  .prom-info {
    background: #f3f3f3;
    line-height: 90rpx;
    padding-left: 30rpx;
    font-size: 36rpx;
    border-radius: 10px 10px 0 0;
  }
  .prom-list {
    padding: 30rpx;
    .prom-item {
      display: flex;
      font-size: 22rpx;
      margin-bottom: 15rpx;
      .prom-title {
        padding: 1rpx 10rpx;
        border: 1rpx solid red;
        border-radius: 5rpx;
        color: red;
        transform: scale(0.9);
      }
      .prom-desc {
        margin-left: 15rpx;
      }
    }
  }
}

.evaluation-box-wrap {
  background: #f3f3f3;

  .evaluation-box {
    border-radius: 20rpx 20rpx 0 0;
    background: #ff0000;
    padding-bottom: 120rpx;

    .evaluation-title {
      border-radius: 20rpx 20rpx 0 0;
      padding: 20rpx 30rpx;
      border-bottom: #ff0000;
      font-size: 30rpx;
    }

    .evaluation-info {
    }

    .evan-type-list {
      padding: 20rpx;
      display: flex;;

      .evan-type-item {
        border-radius: 8rpx;
        padding: 7rpx 12rpx;
        background: #f3f3f3;
        font-size: 22rpx;
        text-align: center;
        &.active {
          background: #ffffff;
          border: 1rpx solid red;
          padding: 5rpx 10rpx;
          color: red;
        }
      }
    }

    .comment-empty {
      margin-bottom: 100rpx;
    }
  }
}

.fixed-btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  .btn-group {
    background: #ffffff;
    border-top: 1rpx solid #f3f3f3;

    width: 750rpx;
    display: flex;
	justify-content:space-around;
    height: 100rpx;

    .btn-item {
      width: 100rpx;
      display: flex;
	  justify-content: center;
	  align-items: center;
      .btn-text {
        font-size: 26rpx;
        color: #666666;
      }
    }

    .btn-item-main {
      width: 180rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
    }
  }
}
.usubsection{
	position: absolute;
	top: 430rpx;
	width: 300rpx;
	left: 50%;
	transform: translate(-50%, 0);
	
}
::v-deep .u-subsection{
	border-radius: 16px !important;
	position: absolute !important;
	top: 430rpx !important;
	width: 300rpx !important;
	left: 50% !important;
	transform: translate(-50%, 0) !important;
}
::v-deep .u-subsection .u-subsection--button__bar{
	background-color: #ffffff;
    border-radius: 16px !important;
}
.scroll-Y {
		height: 250rpx;
}
</style>
