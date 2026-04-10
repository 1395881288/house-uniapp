<template>
	<view class="container">
		<view class="uni-list">
			<block v-for="(data, index) in list" :key="index">

				<view class="uni-list-cell" @click="goDetail(data.room.id)">
					<u--image class="prod-image" :src="data.room.image"  :lazy-load="true" width="130" height="100" radius="6" mode="scaleToFill"></u--image>
					
					<view class="item-info">
						<view class="info-text">
							<u--text :lines="2" size="15px" color="#555555" :bold="true" :text="data.room.title"></u--text>
							<u-gap height="2px"></u-gap>
							<u--text class="info-desc" :lines="1" size="12px" color="#939393"
								:text="data.room.desc"></u--text>
						</view>
						<view class="price-and-cart">
							<yd-text-price color="red" size="12" intSize="18" :price="data.room.price"></yd-text-price>
							<u-icon style="display: none;" name="shopping-cart" color="#2979ff" size="28"></u-icon>
						</view>
					</view>


				</view>
			</block>
		</view>
		<u-empty v-if="!isloading && list.length==0" mode="data" text=" " marginTop="100px">
		</u-empty>
		<u-loadmore fontSize="28rpx" :line="true" :status="loadStatus" :loading-text="loadText.loading"
			:loadmore-text="loadText.loadmore" :nomore-text="loadText.nomore" />

	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		components: {

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
					status: 0,
					type: 1
				}
			};
		},
		onLoad() {

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
				this.isloading=true;
				request.get('app-api/house/favorite/page', {
					params: this.queryParams
				}).then(res => {
					console.log(res)
					res.data.list.forEach(item => {

						item.room.image = "https://cdn.uviewui.com/uview/album/2.jpg"
						//item.title=`${item.buildingName} ${item.roomName}`;
						try {
							var imageList = JSON.parse(item.room.imageList)
							if (imageList.length > 0) {
								item.room.image = imageList[0].url
								console.log(item.room.image)
							}
						} catch (e) {

						}

						item.room.title = `${item.room.roomTitle}`;
						item.room.desc =`${item.room.roomNumber}室${item.room.hallNumber}厅${item.room.toiletNumber}卫 | ${item.room.area}m² | ${item.room.floor}/${item.room.building.floorNum}层 |  ${item.room.towards}`
						item.room.price = `${item.room.rental}`
					})
					this.list.push(...res.data.list)
					this.total = res.data.total
					this.loadStatus = 'loadmore';
					if (this.list.length >= this.total) {
						this.loadStatus = 'nomore';
					}
					this.isloading=false;
				}).catch(err => {
					console.log(err)
					this.loadStatus = 'loadmore';
					this.isloading=false;
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
			goDetail: function(id) {
				console.log(id)
				uni.$u.route('/pages/house/room_detail/room_detail', {
					id: id
				})
				/*
        console.log(detail)
				uni.navigateTo({
					//url: '/pages/news/detail?detail=' + encodeURIComponent(JSON.stringify(detail)),
          url: '/pages/news/detail',
          success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('setNewsDetail', detail)
          }
				});
        */
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	.uni-list {
		margin: 0px 10px 10px 10px;
	}

	.uni-list-cell {
		color: #666666;
		border-bottom: 1px solid #c4c4c4;
		padding: 20rpx 0;
		display: flex;
		align-items: flex-start;

		.image {
			width: 200rpx;
			height: 160rpx;
			border-radius: 10rpx;
		}

		.item-info {
			flex: 1;
			padding: 0rpx 20rpx 0 20rpx;

			.info-text {

				padding-bottom: 10rpx;
			}

			.price-and-cart {
				display: flex;
			}
		}

		.content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;



			.title {
				min-height: 58px;
			}

			.date {
				color: #ff0000;
			}
		}
	}
</style>