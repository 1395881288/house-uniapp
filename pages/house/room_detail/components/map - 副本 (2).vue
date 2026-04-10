
<template>
    <view class="container">
         <map style="width: 100%; height: 350rpx;" :latitude="centerPoint.lat" :longitude="centerPoint.lon" :markers="covers" @tap="maptap"></map>
         <view class="box">
           <u-tabs-custom :list="navlist" @click="navclick" itemStyle="display:flex;flex-direction:column;font-size:14rpx;margin:10rpx 0"></u-tabs-custom>
           <template>
             <view class="zhoubianbuilding" v-for="(item,index) in navlist"  v-if="navindex == index"  >
               <view class="zhoubian" v-for="(itemsub,indexsub) in item.list" @click="showMarker(itemsub)">
                 <u--image :showLoading="true" :src="item.icon" width="16px" height="16px"></u--image>
                 <view class="zhoubianname">{{itemsub.name}}</view>
                 <view class="zhoubiandistance">{{'直线'+itemsub.distance+'米'}}</view>
               </view>
             </view>
           </template>
         </view>
         <u-gap height="0"></u-gap>
	</view>
</template>

<script>
 
    export default {
        components: {
           
        },

        data() {

            return {
                map:null,
	              BMap:null,
                centerPoint: {
                    lon: 116.39742,
                    lat: 39.909
                },
				covers: [
					        {
								id:1,
								latitude: 39.909,
								longitude: 116.39742,
								width:0,
								height:0,
								//iconPath: '/static/images/detail/metro.png'
								callout:{
									content:"北京天安门",
									borderRadius:5,
									color:'#ffffff',
									bgColor:'#ff0000',
									padding:3,
									display:'ALWAYS'
								},
								alpha:0
							},
							{
								id:2,
								latitude: 39.90590275805589,
								longitude: 116.39753514631934,
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
						],
                locPoint: {

                },
                locName: "我的位置",
                show: false,
                navlist: [
                    {
                        name: '地铁',
                        icon: "/static/images/detail/metro.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '公交',
                        icon: "/static/images/detail/bus.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '教育',
                        icon: "/static/images/detail/school.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '购物',
                        icon: "/static/images/detail/shop.png",
                        loaded:false,
                        list:[],
                    }, {
                        name: '医院',
                        icon: "/static/images/detail/medical.png",
                        loaded:false,
                        list:[]
                    }, {
                        name: '银行',
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
                   this.init(); //filterData重新赋值初始化菜单
                },
                immediate: true
            }

        },
		mounted(){
		  this.init()
	    },
        methods: {
            init(){
			        
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
			          buildingId:this.building.id,
			          query:item.name,
			          location:`${this.building.latitude},${this.building.longitude}`,
			          radius:2000,
			          page_size:5,
			          output:"json",
			          ak:serverak
			  };
			  uni.$u.http.get('/house/room/mapBaiduSearch', {params: queryParams}).then(res => {
			     console.log(res)
			     item.loaded=true;
			     if(res.data.results)
			     {
			        res.data.results.forEach(item => {
			            item.show=false
			
			            item.distance=that.space(item.location,that.centerPoint);
			        })
			        //item.list=item.list.concat(res.data.results)
			        item.list=res.data.results;
			
			     }
			  }).catch(err => {
			     console.log(err)
			
			  })
			
			},
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
       border-radius: 10rpx;
       margin: 10px 0 0 0;
       background: #ffffff;
    }
    ::v-deep .u-tabs__wrapper__nav__item{
      flex:1;
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
