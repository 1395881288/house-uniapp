
<template>
    <view class="container">
         <map style="width: 100%; height: 300px;" :latitude="centerPoint.lat" :longitude="centerPoint.lon" :markers="covers"></map>
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
				covers: [{
								latitude: 39.909,
								longitude: 116.39742,
								iconPath: '/static/images/detail/metro.png'
							}, {
								latitude: 39.90,
								longitude: 116.39,
								iconPath: '/static/images/detail/metro.png'
							}],
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
	  height: 500rpx;
	  width: 100%;
	  margin: 0;
 
	}
    
</style>
