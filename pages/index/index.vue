<template>
  <view>
    <!--搜索栏-->
    <u-sticky offset-top="0">
      <view class="mysticky">
        <view class="search-wrap">
          <u-search placeholder="请输入关键词" height="32"  :showAction="true" actionText="搜索" :actionStyle="{color:'#ffffff'}" :animation="true" v-model="queryParams.keyword" @search="search" @clear="search" @custom="search"></u-search>
        </view>
		<filterDropdown class="filterDropdown" :menuTop="stickyHeight" :filterData="filterData" :defaultSelected="defaultSelected"
						:updateMenuName="false" @confirm="confirm" dataFormat="Object"></filterDropdown>
		
      </view>
    </u-sticky>
    <u-gap :height="stickyHeight+filterDropdownHeight+3"></u-gap>
    <!--轮播图-->
    <yd-banner :banner-list="bannerList" v-if="bannerList.length>0"></yd-banner>

    <u-gap height="0px"></u-gap>

    <!--商品展示栏-->
    <view class="prod-block list">
      <view class="prod-list" v-for="(item, index) in list" :key="item.id">
        <view class="prod-item" @click="handleProdItemClick(item.id)">
          <u--image class="prod-image" :src="item.image"  :lazy-load="true" width="130" height="100" radius="6" mode="scaleToFill"></u--image>
          <view class="item-info">
            <view class="info-text">
              <u--text :lines="2" size="15px" color="#444444" :bold="true" :text="item.title"></u--text>
              <u-gap height="6px"></u-gap>
              <u--text :lines="1" size="12px" color="#444444" :text="item.desc"></u--text>
			  <u-gap height="6px"></u-gap>
			  <u--text iconStyle="font-size: 13px" :lines="1" size="12px" color="#444444" :text="item.towards"></u--text>
			</view>
            <view class="price-and-cart">
              <yd-text-price color="red" size="12" intSize="18" :price="item.price"></yd-text-price>
            </view>
			
          </view>
        </view>
      </view>
    </view>

    <u-loadmore  fontSize="28rpx" :line="true" :status="loadStatus" loadingIcon="circle"  :loading-text="loadText.loading" :loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" />

    <u-gap height="5px"></u-gap>

  </view>
</template>

<script>
import request from "@/utils/request.js";
//import searchCom from './components/searchCom.vue';
import filterDropdown from './components/filterDropdown.vue';
import data from './data.js';//筛选菜单数据
//import prize from './components/prize.vue';

export default {
  components: {
	  //searchCom,
	  //prize,
	  filterDropdown,
  },
  data() {
    return {
      scrollTop:0,
      stickyHeight:44,
	  filterDropdownHeight:43,
      bannerList: [
        /*
        {
          id: 1,
          title: '山不在高，有仙则名',
          image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
        },
        {
          id: 2,
          title: '水不在深，有龙则灵',
          image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png'
        },
        {
          id: 3,
          title: '斯是陋室，惟吾德馨',
          image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
        }
        */
      ],

      // 房间列表
      list: [
        /*
        {
          id: 1,
          image: 'https://cdn.uviewui.com/uview/album/1.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '13'
        },
        {
          id: 2,
          image: 'https://cdn.uviewui.com/uview/album/2.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '23'
        },
        {
          id: 3,
          image: 'https://cdn.uviewui.com/uview/album/3.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '33'
        },
        {
          id: 4,
          image: 'https://cdn.uviewui.com/uview/album/4.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '43'
        },
        {
          id: 5,
          image: 'https://cdn.uviewui.com/uview/album/5.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '53'
        },
        {
          id: 6,
          image: 'https://cdn.uviewui.com/uview/album/3.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '33'
        },
        {
          id: 7,
          image: 'https://cdn.uviewui.com/uview/album/4.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '43'
        },
        {
          id: 8,
          image: 'https://cdn.uviewui.com/uview/album/5.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '53'
        },
       {
          id: 9,
          image: 'https://cdn.uviewui.com/uview/album/1.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '13'
        },
        {
          id: 10,
          image: 'https://cdn.uviewui.com/uview/album/2.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '23'
        },
        {
          id: 11,
          image: 'https://cdn.uviewui.com/uview/album/3.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '33'
        },
        {
          id: 12,
          image: 'https://cdn.uviewui.com/uview/album/4.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '43'
        },
        {
          id: 13,
          image: 'https://cdn.uviewui.com/uview/album/5.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '53'
        },
        {
          id: 14,
          image: 'https://cdn.uviewui.com/uview/album/3.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '33'
        },
        {
          id: 15,
          image: 'https://cdn.uviewui.com/uview/album/4.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '43'
        },
        {
          id: 16,
          image: 'https://cdn.uviewui.com/uview/album/5.jpg',
          title: '黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫黄金豪庭 2房1厅1卫',
          desc: '2室 · 80m² · 朝南 · 黄金豪庭 · 龙岗区',
          price: '53'
        }
        */
      ],
      moreStatus: 'nomore',
      loadStatus: 'loadmore',
      // 加载前值为loadmore，加载中为loading，没有数据为nomore
      loadText: {
        loadmore:'上拉加载更多',
        loading:'努力加载中',
        nomore:'没有更多了'
      },
      // 总条数
      total: 0,
      isloading:false,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        status: undefined,
		keyword:undefined,
		floorName: undefined,
		roomNumber: undefined,
		hallNumber: undefined,
		status: undefined,
		district:null,
		rental:null,
		minPrice:null,
		maxPrice:null,
		longitude: undefined,
		latitude: undefined,
		metros:undefined,
		sort:undefined,
      },
	  defaultSelected:[[0,0,0],[null],[[null],[null]],[null]],
	  filterData: [],
	  indexArr: [],
	  valueArr: [],
    }
  },
  onLoad() {
	console.log("===============onLoad") 
    //定时器模拟ajax异步请求数据
    setTimeout(() => {
        this.filterData = data;
        this.defaultSelected = [
            [0,null,null],		    //第0个菜单选中 一级菜单的第1项，二级菜单的第1项，三级菜单的第3项
            [null],			//第1个菜单选中 都不选中
            [null],		    //第2个菜单选中 一级菜单的第1项
            [0],	 // [[0], [1, 2, 7], [1, 0]],	//筛选菜单选中 第一个筛选的第0项，第二个筛选的第1,2,7项，第三个筛选的第1,0项
        ];
    }, 100);
    this.loadBannerData()
    this.getList()

  },
  onReady() {
  	this.initStickyHeight()
  },
  onPageScroll(e) {
      this.scrollTop = e.scrollTop;
      //console.log(this.scrollTop)
  },
  onPullDownRefresh() {
     console.log('onPullDownRefresh');
     if(this.isloading)return;
     setTimeout(function () {
     	uni.stopPullDownRefresh();
     }, 1000);
     this.queryParams.pageNo=1;
     this.total=0;
     this.list=[]
     this.getList() 
	
  },
  onReachBottom() {     console.log('onReachBottom');
     if(this.isloading)return;
     if(this.loadStatus == "nomore")return;
     this.queryParams.pageNo++;
     this.getList()	},
  computed: {
    noticeTextList() {
      return []
    }
  },
  methods: {
 
    loadBannerData() {
     var queryParams = {
        pageNo: 1,
        pageSize: 10,
        status: 0,
     }
	 request.get('app-api/house/poster/page', queryParams,{noAuth: true}).then(res => {
        console.log(res)
        this.bannerList=res.data.list;

     }).catch(err => {
        console.log(err)
     })
    },
    getList(){
      this.loadStatus = 'loading';
      this.isloading = true
	  request.post('app-api/house/room/getRoomJoinPage', this.queryParams,{noAuth: true}).then(res => {
         console.log(res)
         res.data.list.forEach(item => {
             item.image="/static/images/index/nopic.png"
             //item.title=`${item.buildingName} ${item.roomName}`;
             try{
               var imageList=JSON.parse(item.imageList)
               if(imageList.length>0)
               {
                  item.image=imageList[0].url
                  console.log(item.image)
               }
             }
             catch(e){
               console.log(e)
             }
			  
			  
             try{
				item.title=`${item.roomTitle}`;
				item.desc=`${item.roomNumber}室${item.hallNumber}厅${item.toiletNumber}卫  |  ${item.area}m² `
				item.price=`${item.price}`
				item.metro="暂无周边地铁信息"
				
/* 				if(item.metros.length>0)
				{
					item.metro=`距${item.metro[0].line}${item.metro[0].name}步行约${item.metro[0].distance/100}米`;
				} */
				if((item.towards+"").length>0)
				{
					item.towards+=" | "
				}
				item.towards+=`${item.floor}/${item.building.floorNum}层`
				console.log(item.towards)
			 }
			 catch(e){
			    console.log(e)
			 }

         })
         this.list.push(...res.data.list)
         this.total=res.data.total
         this.loadStatus = 'loadmore';
         this.isloading = false
		 console.log("=========="+this.list.length+" "+this.total)
         if(this.list.length>=this.total){
           this.loadStatus = 'nomore';
         }
      }).catch(err => {
         console.log(err)
         this.loadStatus = 'loadmore';
         this.isloading = false
      })
    },
    handleSearchClick(e) {
      //uni.$u.route('/pages/search/search')
    },
    initStickyHeight(){
 
      let that=this
/*      let view = uni.createSelectorQuery().select(".mysticky")
	  console.log(view) 
	  console.log("===============initStickyHeight") 
      view.boundingClientRect(data => {
          console.log("========sticky"+data.height)
          
      }).exec()
	  */
	  
	  const query = uni.createSelectorQuery().in(this);
	  query
	    .select(".mysticky")
	    .boundingClientRect((data) => {
		  that.stickyHeight=data.top+data.height
	      console.log("得到布局位置信息1" + JSON.stringify(data));
 
	    })
	    .exec();
	
		query
		  .select(".filterDropdown")
		  .boundingClientRect((data) => {
			//that.filterDropdownHeight=data.height
			console.log("得到布局位置信息2 " + JSON.stringify(data));
 
		  })
		  .exec();
    },
    handleProdItemClick(id) {
	  console.log("========productId "+id)
/*      this.navTo('/pages/house/room_detail/room_detail?id=' + id, {
        id: id
      })  */
	  uni.navigateTo({
	        url: '/pages/house/room_detail/room_detail?id=' + id
	  })
    },
	isNotNull(e){
		return e !== null && e !== "" && e !== undefined;
	},
	search(e){
		console.log("==========search=========")
		//uni.startPullDownRefresh()
		
		this.queryParams.pageNo=1;
		this.total=0;
		this.list=[]
		this.getList() 
	},
	//接收菜单结果
	confirm(e) {
		console.log(this.defaultSelected)
		console.log("confirm: " + JSON.stringify(e));
		
		if(JSON.stringify(e.index).replace(/[\[|\]|,|null]/ig,"")=="")
		{
			console.log("未选择");
			//return;
		}
		if(JSON.stringify(e.value)==JSON.stringify(this.valueArr))
		{
			console.log("未改变");
			//return;
		}
		this.indexArr = e.index;
		this.valueArr = e.value;
	    //位置
		if(this.isNotNull(e.value[0][0]) && e.value[0][0]=="区域")
		{
			try{
				var pos=JSON.parse(e.value[0][2])
				this.queryParams.longitude=pos.lng;
				this.queryParams.latitude=pos.lat;
			}
			catch(e)
			{
				delete this.queryParams.longitude;
				delete this.queryParams.latitude;
			}
			this.queryParams.district = e.value[0][0];
			
		}else{
			delete this.queryParams.longitude;
			delete this.queryParams.latitude;
		}
		if(this.isNotNull(e.value[0][0]) && e.value[0][0]=="地铁")
		{
			try{
				this.queryParams.metros=e.value[0][0]+e.value[0][1]+"%"+e.value[0][2];
			}
			catch(e)
			{
				delete this.queryParams.metros;
			}
			
		}else{
			delete this.queryParams.longitude;
			delete this.queryParams.latitude;
		}
		//价格，格式：1000-2000
		if(this.isNotNull(e.value[1][0])){
			this.queryParams.minPrice = parseInt(e.value[1][0].split("-")[0])
			this.queryParams.maxPrice = parseInt(e.value[1][0].split("-")[1]);
		}else{
			delete this.queryParams.minPrice;
			delete this.queryParams.maxPrice;
		}
		//筛选-户型
		if(e.value[2][0].length>0){
			this.queryParams.roomNumber = e.value[2][0][0];
		}else{
			delete this.queryParams.roomNumber;
		}
		
		//筛选-朝向
		if(e.value[2][1].length>0){
			this.queryParams.towards = e.value[2][1][0];
		}else{
			delete this.queryParams.towards;
		}
		//排序
		if(this.isNotNull(e.value[3][0])){
			this.queryParams.sort = e.value[3][0];
		}else{
			delete this.queryParams.sort;
		}
		console.log("confirm: " + JSON.stringify(this.queryParams));
	    uni.startPullDownRefresh()
	},
	////////////////////////////////////////////////////////////////////
	
  }

}
</script>

<style lang="scss" scoped>
  .mysticky {
    position: fixed;/*sticky fixed*/
    top: 0px;
    left: 0px;
    width: 100%;
    height: auto;
    z-index: 970;
  }
.search-wrap {
  background: #e93323;
  padding: 10rpx 20rpx;

}

.grid-title {
  line-height: 50rpx;
  font-size: 26rpx;
}
.prod-block {
  margin-top: 0;

  .bloc-header {
    margin-top: 0rpx;
    margin-bottom: 20rpx;

    .bloc-title {
      margin-left: 20rpx;
      color: #333333;
    }
  }

  .prod-list {
    .prod-item {
      background: #ffffff;
      display: flex;
      border-bottom: #ff0000;
      padding: 10rpx 20rpx;

      .prod-image2 {
        width: 240rpx;
        height: 180rpx;
        border-radius: 10rpx;
      }

      .item-info {
        flex: 1;
        padding: 0rpx 20rpx 0 20rpx;
        margin-top: 0rpx;
		display: flex;
		flex-direction: column;
        .info-text {

        }

        .price-and-cart {
          display: flex;
		  flex:1;
		  justify-items: flex-end;
		  align-items: flex-end;

        }
		.distance{
			font-size: 18rpx;
			color: #666666;
		}
      }
    }
  }
}
::v-deep .u-search__action{
	color: #ffffff;
}
</style>
