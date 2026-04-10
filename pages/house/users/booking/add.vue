<template>
	<view class="container">
<!-- 		<view style="display: flex;">
			<u-icon name="home" color="#333333" size="24"></u-icon>
			<view style="width: 3px;"></view>
			<u--text :text="model.formData.buildingName+' - '+model.formData.roomName" :bold="true"></u--text>
		</view> -->
<!-- 		<u-gap height="5"></u-gap> -->
		<u--form labelPosition="left" labelWidth="70" :model="model" :rules="rules" ref="uForm">
			<u-form-item
				label="房源"
				prop="formData.buildingName"
				@click="showbuildingName = true"
			>
				<u--input
					v-model="model.formData.buildingName"
					placeholder="请输入"
					disabled
					disabledColor="#ffffff"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
				label="房间"
				prop="formData.roomName"
				@click="showroomName = true"
			>
				<u--input
					v-model="model.formData.roomName"
					placeholder="请输入"
					disabled
					disabledColor="#ffffff"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
				label="联系人"
				prop="formData.name"
			>
				<u--input
					v-model="model.formData.name"
					placeholder="请输入"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
				label="手机"
				prop="formData.mobile"
			>
				<u--input
					v-model="model.formData.mobile"
					placeholder="请输入"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
				label="性别"
				prop="formData.gender"
			>
			  <u-radio-group
			      v-model="model.formData.gender"
			      placement="row"
			    >
				<u-radio
				      :customStyle="{marginRight: '20px'}"
				      v-for="(item, index) in SexActions"
				      :key="index"
				      :label="item.name"
				      :name="item.value"
				    >
				    </u-radio>
			  </u-radio-group>		
			</u-form-item>
			<u-form-item
				label="身份证"
				prop="formData.idNumber"
			>
				<u--input
					v-model="model.formData.idNumber"
					placeholder="请输入"
					class="inputstyle"
				></u--input>
			</u-form-item>
            <u-form-item
				label="预定时间"
				prop="formData.bookDate"
				@click="showbookDate=true"
			>
				<u--input
					:value="$u.timeFormat(model.formData.bookDate, 'yyyy-mm-dd')"
					placeholder="请输入"
					class="inputstyle"
					:readonly="true"
	
				></u--input>
			</u-form-item>
			<u-form-item
				label="最晚签约"
				prop="formData.lastSigningDate"
				@click="showlastSigningDate=true"
			>
				<u--input
					:value="$u.timeFormat(model.formData.lastSigningDate, 'yyyy-mm-dd')"
					placeholder="请输入"
					class="inputstyle"
					:readonly="true"
				
				></u--input>
			</u-form-item>
<!-- 			<u-form-item label="图片" prop="formData.image"  @click='uploadpic'>
				<u--image :src="model.formData.image" loadingIcon="photo" width="80px" height="80px" bgColor="#eaeaea">
					 <template v-slot:loading>
					    <u-icon name="camera-fill" color="#999999"  size="42"></u-icon>
					 </template>
				</u--image>
			</u-form-item> -->
			<u-form-item label="备注" prop="formData.remark">
				<u--textarea placeholder="请输入" v-model="model.formData.remark" count></u--textarea>
			</u-form-item>
		</u--form>
		<view class="btnview">
			<u-button class="btn" type="error" shape="circle" @click="submit">提交</u-button>
		</view>
		
		
		<u-datetime-picker
		                :show="showexpTime"
		                v-model="model.formData.expTime"
		                mode="datetime"
						@cancel="showexpTime=false"
						@confirm="showexpTime=false"
        ></u-datetime-picker>
		<u-datetime-picker
		                :show="showbookDate"
		                v-model="model.formData.bookDate"
		                mode="datetime"
						@cancel="showbookDate=false"
						@confirm="showbookDate=false"
		></u-datetime-picker>
		<u-datetime-picker
		                :show="showlastSigningDate"
		                v-model="model.formData.lastSigningDate"
		                mode="datetime"
						@cancel="showlastSigningDate=false"
						@confirm="showlastSigningDate=false"
		></u-datetime-picker>
		<u-action-sheet
				:show="showSex"
				:actions="SexActions"
				title="请选择性别"
				description=""
				@close="showSex = false"
				@select="sexSelect"
		>
		</u-action-sheet>
		<u-picker
				:show="showbuildingName"
				:columns="buildingList"
				keyName="buildingName"
				@cancel="showbuildingName=false"
				@confirm="buildingChange"
		>
		</u-picker>
		<u-picker
				:show="showroomName"
				:columns="roomList"
				keyName="roomName"
				@cancel="showroomName=false"
				@confirm="roomChange"
		>
		</u-picker>
	</view>
</template>

<script>
import { toLogin } from '@/libs/login.js';
import { mapGetters } from "vuex";
import request from "@/utils/request.js";
import * as BuildingApi from '@/api/house/building/index.js';
import * as RoomApi from '@/api/house/room/index.js';
import * as BookingApi from '@/api/house/booking/index.js';
import { userInfo } from 'os';
	export default {
		components: {

		},
		data() {
			return {
				showSex: false,
				SexActions: [{
						value:1,
						name: '男',
					},
					{
						value:2,
						name: '女',
					}
				],
				showexpTime:false,
				showbookDate:false,
				showlastSigningDate:false,
				showbuildingName:false,
				showroomName:false,
				buildingList:[],
				roomList:[],
				model: {
					formData: {
						buildingId: undefined,
						buildingName: undefined,
						roomId: undefined,
						roomName: undefined,
						gender: undefined,
						name: undefined,
						mobile: undefined,
						idType: undefined,
						idNumber: undefined,
						deposit: undefined,
						bookDate: Number(new Date()),
						lastSigningDate: Number(new Date()),
						remark: "",
						receivedDate: undefined,
						payStatus: undefined,
						paymentMethod: undefined,
						tenantName: undefined,
						tenantMobile: undefined,
						rentalStartDate: undefined,
						rentalDueDate: undefined,
						
					},
				},
				rules: {
					'formData.buildingName': {
						required: true,
						message: '请填写房源',
						trigger: ['blur', 'change']
					},
					'formData.roomName': {
						required: true,
						message: '请填写房源',
						trigger: ['blur', 'change']
					},
					'formData.name': {
						required: true,
						message: '请填写联系人',
						trigger: ['blur', 'change']
					},
					'formData.mobile': {
						required: true,
						message: '请填写手机',
						trigger: ['blur', 'change']
					},
					'formData.bookDate': {
						type:'number',
						required: true,
						message: '请选择预定时间',
						trigger: ['blur', 'change']
					},
					'formData.lastSigningDate': {
						required: true,
						type:'number',
						message: '请选择最晚签约日',
						trigger: ['blur', 'change']
					}
				},

			};
		},
		computed: mapGetters(['isLogin', 'userInfo','uid']),
		onLoad(option) {
			console.log("=====onLoad====="+this.isLogin)
			if (!this.isLogin) {
				toLogin();
			
			}
			if(option.params)
			{
				var params = JSON.parse(decodeURIComponent(option.params));
				this.model.formData.buildingId=params.buildingId
				this.model.formData.buildingName=params.buildingName
				this.model.formData.roomId=params.roomId
				this.model.formData.roomName=params.roomName
			}
			//this.getLease()
			this.model.formData.name=this.userInfo.nickname
			this.model.formData.mobile=this.userInfo.mobile
			this.model.formData.userId=this.uid
			//alert(this.$store.getters.uid+" "+this.uid)
			this.getBuildingList()
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			getBuildingList(){
				let that=this
			    var queryParams= {
			        pageNo: 1,
			        pageSize: 100
			    };
			    BuildingApi.getBuildingPage(queryParams).then(response => {
					that.buildingList.splice(0,that.buildingList.length)
			        that.buildingList.push(response.data.list)
			        console.log(that.buildingList)
			        if(that.model.formData.buildingId!=null)
					{
						that.getRoomList()
					}
			    }).catch(e => {
					 console.log(e)
					 
				})
			},
			getRoomList(){
				let that=this
			    var queryParams= {
			        pageNo: 1,
			        pageSize: 100,
			        buildingId:this.model.formData.buildingId
			    };
				console.log(queryParams)
			    RoomApi.getRoomPage(queryParams).then(response => {
					that.roomList.splice(0,that.roomList.length)
			        var list= response.data.list;
			        //list=list.filter(item => [0].includes(item.roomStatus))
			        this.roomList.push(list)
			
			    });
			},
            getLease() {
				let that=this
		        var queryParams={
					pageNo: 1,
					pageSize: 100
				}
				request.get('app-api/house/lease/page', this.queryParams)
				.then(res => {
					console.log(res)
					if(res.data.list.length==0)
					 {
						 //uni.$u.toast('暂无租约')
						 that.$util.Tips({title:'暂无租约'},'/pages/house/users/repair/repair');
						 return;
					 }
					 let lease=res.data.list[0];
					 
					 that.model.formData.buildingId=lease.buildingId;
					 that.model.formData.buildingName=lease.buildingName;
					 that.model.formData.roomId=lease.roomId;
					 that.model.formData.roomName=lease.roomName;
					 
				}).catch(err => {
					console.log(err)
					 
				})
			},
			submit() {
				let that=this
				//this.model.formData.image = this.model.fileList1.join();
				this.$refs.uForm.validate().then(res => {
					//uni.$u.toast('校验通过')
					that.dosubmit()
				}).catch(e => {
					console.log(e)
					uni.$u.toast('校验失败')
				})
			},
			dosubmit(){
				BookingApi.createBooking(this.model.formData)
				.then(res => {
					console.log(res)
					if(res.code==0)
					{
						this.$util.Tips({title:'预定成功'},'/pages/house/users/booking/index');
					}
					else
					{
						this.$util.Tips({title:res.msg});
					}
				}).catch(err => {
					console.log(err)
				    this.$util.Tips({title:err});
				})
 
			},
			/**
			 * 上传文件
			 */
			uploadpic: function() {
				let that=this
				this.$util.uploadImageOne({}, res => {
					this.model.formData.image = res.data;
				});
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			},
			expTimeClick(e){
				console.log("aderror: " + JSON.stringify(e));
				this.showexpTime=true
			},
			sexSelect(e) {
				this.model.formData.gender = e.value
				this.$refs.uForm.validateField('formData.gender')
			},
			buildingChange(e){
				this.showbuildingName=false
				console.log(e);
				this.model.formData.buildingId=e.value[0].id
				this.model.formData.buildingName=e.value[0].buildingName
				this.getRoomList()
			},
			roomChange(e){
				this.showroomName=false
				console.log(e);
				this.model.formData.roomId=e.value[0].id
				this.model.formData.roomName=e.value[0].roomName

			},
			
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx;
	}
	.inputstyle{
		background-color: #ffffff;
	}
	.btn{
		
	}
	.btnview{
 
		display: flex;
		align-items: center;
		justify-content: center;
		::v-deep .u-button,.btn{
			color: #fff;
			font-size: 30rpx;
			letter-spacing: 20rpx;
			width: 700rpx;
			height: 86rpx;
			border-radius: 43rpx;
			margin: 50rpx auto 0 auto;
			background: linear-gradient(90deg, #FF7931 0%, #F11B09 100%);
			line-height: 86rpx;
		}
	}
</style>