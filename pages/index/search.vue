<template>
	<view class="container">
		<u-sticky offset-top="0">
			<view class="sticky">
<!-- 				<filterDropdown :menuTop="0" :filterData="filterData" :defaultSelected="defaultSelected"
								:updateMenuName="true" @confirm="confirm" dataFormat="Object"></filterDropdown> -->
				<filterDropdown :menuTop="0" :filterData="filterData" :defaultSelected="defaultSelected"
								:updateMenuName="false" @confirm="confirm" dataFormat="Object"></filterDropdown>
			    
			</view>
		</u-sticky>
		<view class="uni-list">
			<block v-for="(data, index) in list" :key="index">

				<view class="uni-list-cell" @click="goDetail(data)">
					<u--image :src="data.image" width="100px" height="80px" mode="widthFix"  :lazy-load="true"></u--image>
					<view class="content">
						<view class="title">{{data.title}}</view>
						<view class="date">{{$u.timeFormat(data.createTime, 'yyyy年mm月dd日')}}</view>
					</view>


				</view>
			</block>
		</view>
		<u-empty v-if="loadStatus != 'loading' && list.length==0" mode="data" text=" " marginTop="150">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" />

	</view>
</template>

<script>
	//import filterDropdown from '@/components/zy/filterDropdown.vue';
	import filterDropdown from './components/filterDropdown.vue';
	import data from './data.js';//筛选菜单数据
	import request from "@/utils/request.js";
	export default {
		components: {
           filterDropdown
		},
		data() {
			return {
				banner: {},

				last_id: '',
				reload: false,

				list: [],
				loadStatus: 'loadmore',
				// 加载前值为loadmore，加载中为loading，没有数据为nomore
				loadText: {
					loadmore: '上拉加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				// 总条数
				total: 0,
				isloading: false,
				queryParams: {
				  pageNo: 1,
				  pageSize: 10,
				  floorName: undefined,
				  hallNumber: undefined,
				  status: undefined,
				  district:null,
				  minPrice:null,
				  maxPrice:null,
				  sort:null,
				  
				},
				defaultSelected: [],
			    filterData: [],
				indexArr: [],
			    valueArr: [],
			};
		},
		onLoad() {
            //定时器模拟ajax异步请求数据
            setTimeout(() => {
                this.filterData = data;
                this.defaultSelected = [
                    [null],		    //第0个菜单选中 一级菜单的第1项，二级菜单的第1项，三级菜单的第3项
                    [null],			//第1个菜单选中 都不选中
                    [null],		    //第2个菜单选中 一级菜单的第1项
                    [null],	 // [[0], [1, 2, 7], [1, 0]],	//筛选菜单选中 第一个筛选的第0项，第二个筛选的第1,2,7项，第三个筛选的第1,0项
                ];
            }, 100);
			this.getList();
		},
		onPullDownRefresh() {
			console.log("======onPullDownRefresh======")
			if (this.loadStatus == 'loading') return;
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);

			this.queryParams.pageNo = 1;
			this.total = 0;
			this.list = []
			this.getList()
		},
		onReachBottom() {
			console.log('=======onReachBottom=========');
			if (this.isloading) return;
			if (this.loadStatus == "nomore") return;
			this.queryParams.pageNo++;
			this.getList()
		},
		methods: {
			getList() {
				this.loadStatus = 'loading';
				request.get('app-api/house/news/page', this.queryParams,{noAuth: true})
				.then(res => {
					console.log(res)
					res.data.list.forEach(item => {
						if (item.image == "") {
							item.image = "/static/images/news/news.jpeg"
						}
					})
					this.list.push(...res.data.list)
					this.total = res.data.total
					this.loadStatus = 'loadmore';
					if (this.list.length >= this.total) {
						this.loadStatus = 'nomore';
					}
				}).catch(err => {
					console.log(err)
					this.loadStatus = 'loadmore';
				})
			},
			getListold() {
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.minId = this.last_id;
					data.time = new Date().getTime() + '';
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: data => {
						uni.stopPullDownRefresh();
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						uni.stopPullDownRefresh();
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			goDetail: function(detail) {
				console.log(detail)
				uni.navigateTo({
					//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
					url: '/pages/news/detail',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('setNewsDetail', detail)
					}
				});
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						//published_at: dateUtils.format(e.published_at),
						published_at: e.published_at,
						title: e.title
					});
				});
				return newItems;
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			},
			
			isNotNull(e){
				return e !== null && e !== "" && e !== undefined;
			},
			//接收菜单结果
			confirm(e) {
				console.log("confirm: " + JSON.stringify(e));
				this.indexArr = e.index;
				this.valueArr = e.value;
                //位置
				if(this.isNotNull(e.value[0][0])){
					this.queryParams.district = e.value[0][0];
				}else{
					delete this.queryParams.district;
				}
				//价格，格式：1000-2000
				if(this.isNotNull(e.value[1][0])){
					this.queryParams.minPrice = e.value[1][0].split("-")[0];
					this.queryParams.maxPrice = e.value[1][0].split("-")[1];
				}else{
					delete this.queryParams.minPrice;
					delete this.queryParams.maxPrice;
				}
				//筛选-户型
				if(e.value[2][0].length>0){
					this.queryParams.hallNumber = e.value[2][0][0];
				}else{
					delete this.queryParams.hallNumber;
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
				  
			},
		}
	};
</script>

<style lang="scss" scoped>
	.uni-list {
		margin: 0px 10px 10px 10px;
	}

	.uni-list-cell {
		color: #666666;
		border-bottom: 1px solid $u-border-color;
		padding: 20rpx 0;
		display: flex;
		align-items: flex-start;

		.content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
            color: #555555;
			.title {
				min-height: 58px;
				font-size: 32rpx;
			}

			.date {
				color: #666666; 
			}
		}
	}
</style>