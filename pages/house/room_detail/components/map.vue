
<template>
    <view class="container">
         <map style="width: 100%; height: 350rpx;" :latitude="building.latitude" :longitude="building.longitude" :markers="covers" @tap="maptap"></map>
         <view class="box">
           <u-tabs-custom :list="navlist" @click="navclick" itemStyle="display:flex;flex-direction:column;font-size:14rpx;flex: 1 1 0%;margin:10rpx 0;"></u-tabs-custom>
           <template>
             <view class="zhoubianbuilding" v-for="(item,index) in navlist"  v-if="navindex == index"  >
			   <block v-if="item.loaded && item.list.length > 0">
				   <view  class="zhoubian" v-for="(itemsub,indexsub) in item.list" @click="showMarker(itemsub)">
					  <u--image :showLoading="true" :src="item.icon" width="16px" height="16px"></u--image>
					  <view class="zhoubianname">{{itemsub.name}}</view>
					  <view class="zhoubiandistance">{{'直线'+itemsub.distance+'米'}}</view>
				   </view>
			   </block>
			   <block v-else>
			       <view class="zhoubian" style="align-items: center;justify-content: center;margin-top: 30rpx;">
						 <u-empty mode="list" text="暂无内容" iconSize="48" textSize="12"></u-empty>
				   </view>
               </block>

             </view>
           </template>
         </view>
         <u-gap height="30"></u-gap>
	</view>
</template>

<script>
    import * as pointConvert from './PointConvert2.js';
    import request from "@/utils/request.js";
    export default {
        components: {
           
        },

        data() {

            return {
                map:null,
	            BMap:null,
                centerPoint: {
                    lng: 114.055818,
                    lat: 22.544535
                },
				covers:[],
				covers2: [
					        /*
					        {
								id:1,
								latitude: 22.544535,
								longitude: 114.055818,
								width:0,
								height:0,
								//iconPath: '/static/images/detail/metro.png'
								callout:{
									content:"北京天安门11",
									borderRadius:5,
									color:'#ffffff',
									bgColor:'#ff0000',
									padding:3,
									display:'ALWAYS'
								},
								alpha:0
							}
							*/
							/*
							{
								id:2,
								latitude: 22.544535,
								longitude: 114.055818,
								width:0,
								height:0,
								//iconPath: '/static/images/detail/metro.png'
								callout:{
									content:"1234567898765432112345678",
									borderRadius:5,
									color:'#ffffff',
									bgColor:'#ff0000',
									padding:3,
									display:'ALWAYS'
								},
								alpha:0
							}
							*/
				],
                locPoint: {

                },
                locName: "我的位置",
                show: false,
                navlist: [
                    {
                        name: '地铁',
						type:1,
                        icon: "/static/images/detail/metro.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '公交',
						type:2,
                        icon: "/static/images/detail/bus.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '教育',
						type:3,
                        icon: "/static/images/detail/school.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '购物',
						type:4,
                        icon: "/static/images/detail/shop.png",
                        loaded:false,
                        list:[],
                    }, {
                        name: '医院',
						type:5,
                        icon: "/static/images/detail/medical.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '银行',
						type:6,
                        icon: "/static/images/detail/bank.png",
                        loaded:false,
                        list:[]
                    }
                ],
                navindex:0,
            }
        },
        props: {
            building: {
                type:Object,
                default: () => ({})
            }
        },
        watch: {
            building: {
                handler(newVal, oldVal) {
				   let that=this	
				   that.init();  
                   
                },
                immediate: true
            }

        },
		mounted(){
		  //this.init()
	    },
        methods: {
            init(){
				console.log("============init "+JSON.stringify(this.building))
/*              let point=this.bMapTransTMap(this.building.longitude,this.building.latitude);
				this.building.longitude=point.lng;
				this.building.latitude=point.lat;
				console.log("============init "+JSON.stringify(this.building)) */
/*                if(this.building.latitude!=null)
				{
					this.covers.push({
								id:100,
								latitude: this.building.latitude,
								longitude: this.building.longitude,
								width:0,
								height:0,
								//iconPath: '/static/images/detail/metro.png'
								callout:{
									content:this.building.buildingName,
									borderRadius:5,
									color:'#ffffff',
									bgColor:'#ff0000',
									padding:3,
									display:'ALWAYS'
								},
								alpha:0
							})
				    console.log(this.covers)			
				} */
				
				this.navclick({index:0})			
            },
			maptap(e)
			{
				console.log(e)
			},
			navclick(item) {
			    console.log('item', item);
			    this.navindex=item.index
			    if(!item.loaded)
			    {
			      this.mapsearch(this.navlist[item.index])
			    }
			
			},
			mapsearch(item){
			  //https://api.map.baidu.com/place/v2/search?query=银行&location=39.915,116.404&radius=2000&page_size=5&output=json&ak=您的密钥
 
			  let that=this
			  var serverak="zqIiam9y0ktPBKVYVTm5s2HgqY8ceUwW" //服务器端ak和web端不能混用
			  var queryParams={
			          //query: '银行',
			          buildingId:8,
					  type:item.type,
			          query:item.name,
			          location:`${this.building.latitude},${this.building.longitude}`,
			          radius:2000,
			          page_size:5,
			          output:"json",
			          ak:serverak
			  };
			  request.get('/app-api/house/room/mapBaiduSearch', queryParams,{noAuth: true}).then(res => {
			     console.log(res)
			     item.loaded=true;
			     if(res.data)
			     {
			        res.data.forEach(data => {
			            data.show=false
			
			            data.distance=that.space(data.location,that.centerPoint);
			        })
			        //item.list=item.list.concat(res.data.results)
			        item.list=res.data;
			        console.log(item)
			     }
			  }).catch(err => {
			     console.log(err)
			
			  })
			
			},
			//原文链接：https://blog.csdn.net/qq_40137978/article/details/113352839
			space(location1,location2) {
			  let lat1=location1.lat
			  let lng1=location1.lng
			  let lat2=location2.lat
			  let lng2=location2.lng
			  console.log(lat1, lng1, lat2, lng2)
			  var radLat1 = lat1 * Math.PI / 180.0;
			  var radLat2 = lat2 * Math.PI / 180.0;
			  var a = radLat1 - radLat2;
			  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
			  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			       Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			  var EARTH_RADIUS = 6378137.0;    //单位M
			  s = s * EARTH_RADIUS;
			
			  s = Math.round(s * 10000) / 10000;
			  s=Math.round(s)
			  return s
			}
            //、、、、、、、、、、、、、、、、、、、、、、


        }
    }
</script>

<style lang="scss" scoped>
    .container {
       width: 100%;
       position: relative;
    }
	#map {
	  height: 350rpx;
	  width: 100%;
	  margin: 0;
 
	}
    .box{
    
       box-shadow: 0 0 0px #cccccc;
       border-radius: 0rpx;
       margin: 0px 0 0 0;
       background: #ffffff;
    }
    ::v-deep .u-tabs__wrapper__nav__item
	{
      flex: 1;
    }
	::v-deep .u-tabs__wrapper__nav__line{
		background: #ea322b !important;
	}
    .zhoubianbuilding{
      display: flex;
	  flex-direction: column;
      margin: 10rpx 10rpx 10rpx 10rpx;
      align-items: flex-start!important;
      min-height:280rpx;
      .zhoubian{
         display: flex;
         flex-direction: row;
         margin: 0 0rpx 16rpx 0;
         font-size: 26rpx;
		 width: 100%;
         .zhoubianname{
           margin: 0 0 0 5px;
         }
         .zhoubiandistance{
           margin: 0 0 0 10px;
           color:#909399;
         }
      }
    }

</style>
