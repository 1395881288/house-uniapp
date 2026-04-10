<template>
	<view class="container">
		<view style="display: flex;">
			<u-icon name="home" color="#333333" size="24"></u-icon>
			<view style="width: 3px;"></view>
			<u--text :text="model.formData.buildingName+' - '+model.formData.roomName" :bold="true"></u--text>
		</view>
		<u-gap height="5"></u-gap>
		<u--form labelPosition="left" labelWidth="70" :model="model" :rules="rules" ref="uForm">
			<u-form-item
				label="联系人"
				prop="formData.contact"
			>
				<u--input
					v-model="model.formData.contact"
					placeholder="请输入"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
				label="电话"
				prop="formData.mobile"
			>
				<u--input
					v-model="model.formData.mobile"
					placeholder="请输入"
					class="inputstyle"
				></u--input>
			</u-form-item>
            <u-form-item
				label="上门时间"
				prop="formData.expTime"
				@click="expTimeClick"
			>
				<u--input
					:value="$u.timeFormat(model.formData.expTime, 'yyyy-mm-dd  hh:MM:ss')"
					placeholder="请输入"
					class="inputstyle"
					:readonly="true"
	
				></u--input>
			</u-form-item>
			<u-form-item label="图片" prop="formData.image"  @click='uploadpic'>
				<u--image :src="model.formData.image" loadingIcon="photo" width="80px" height="80px" bgColor="#eaeaea">
					 <template v-slot:loading>
					    <u-icon name="camera-fill" color="#999999"  size="42"></u-icon>
					 </template>
				</u--image>
			</u-form-item>
			<u-form-item label="故障描述" prop="formData.description">
				<u--textarea placeholder="请输入故障描述,方便师傅上门时携带工具哦~" v-model="model.formData.description" count></u--textarea>
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
	</view>
</template>

<script>
import { toLogin } from '@/libs/login.js';
import { mapGetters } from "vuex";
import request from "@/utils/request.js";
import { userInfo } from 'os';
	export default {
		components: {

		},
		data() {
			return {
				showSex: false,
				showexpTime:false,
				model: {
					formData: {
						orderId: undefined,
						landlordId: undefined,
						buildingId: 0,
						buildingName: undefined,
						roomId: 0,
						roomName: undefined,
						contact: undefined,
						mobile: undefined,
						userId: undefined,
						description: "",
						pictures: [],
						expTime: Date.now(),
						status: 0,
						image: '',
						
					},
				},
				rules: {
					'formData.buildingName': {
						type: 'string',
						required: true,
						message: '请填写房源',
						trigger: ['blur', 'change']
					},
					'formData.contact': {
						type: 'string',
						required: true,
						message: '请填写联系人',
						trigger: ['blur', 'change']
					},
					'formData.weixin': {
						type: 'string',
						required: true,
						message: '请填写电话',
						trigger: ['blur', 'change']
					},
					'formData.description': {
						type: 'string',
						min: 3,
						required: true,
						message: '请输入描述',
						trigger: ['change']
					},
				},

			};
		},
		computed: mapGetters(['isLogin', 'userInfo','uid']),
		onLoad(option) {
			console.log("=====onLoad====="+this.isLogin)
			if (!this.isLogin) {
				toLogin();
			}
			this.getLease()
			this.model.formData.contact=this.userInfo.nickname
			this.model.formData.mobile=this.userInfo.mobile
			this.model.formData.userId=this.uid
			//alert(this.$store.getters.uid+" "+this.uid)
			
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
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
			
				if(this.model.formData.image!="")
				{
					this.model.formData.pictures=[{url:this.model.formData.image}]
				}
				this.model.formData.pictures=JSON.stringify(this.model.formData.pictures)
				request.post('app-api/repair/repair/create', this.model.formData)
				.then(res => {
					console.log(res)
					if(res.code==0)
					{
						this.$util.Tips({title:'提交成功'},'/pages/house/users/repair/repair');
					}
					else
					{
						this.$util.Tips({title:res.msg});
					}
				}).catch(err => {
					console.log(err)
				    this.$util.Tips({title:"请求参数不正确"});
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
			}
			 
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