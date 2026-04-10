<template>
	<view class="container">
		<u--form labelPosition="top" labelWidth="200" :model="model" :rules="rules" ref="uForm">
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

			<u-form-item label="图片" prop="formData.image"  @click='uploadpic'>
				<u--image :src="model.formData.image" loadingIcon="photo" width="80px" height="80px" bgColor="#eaeaea">
					 <template v-slot:loading>
					    <u-icon name="camera-fill" color="#999999"  size="42"></u-icon>
					 </template>
				</u--image>
			</u-form-item>
			<u-form-item label="描述" prop="formData.description">
				<u--textarea placeholder="请输入内容" v-model="model.formData.description" count></u--textarea>
			</u-form-item>
		</u--form>
		<u-button class="btn" type="error" shape="circle" @click="submit">提交</u-button>
	</view>
</template>

<script>
import { toLogin } from '@/libs/login.js';
import { mapGetters } from "vuex";
import request from "@/utils/request.js";
import * as RepairProgressApi from '@/api/repair/repairprogress/index.js';
import { userInfo } from 'os';
	export default {
		components: {

		},
		data() {
			return {
				showSex: false,
				model: {
					formData: {
					    repairId: 0,
						userId: 0,
						contact: "",
						mobile: "",
						description: "",
						pictures: [],
						status: 0,
						image:""
						
					},
				},
				rules: {
					'formData.repairId': {
						type: 'string',
						required: true,
						message: '维修ID不正确。',
						trigger: ['blur', 'change']
					},
					'formData.contact': {
						type: 'string',
						required: true,
						message: '请填写联系人',
						trigger: ['blur', 'change']
					},
					'formData.mobile': {
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
		onLoad(options) {
			console.log("=====onLoad====="+this.isLogin)
			if (!this.isLogin) {
				toLogin();
			}
			 if(options.id)
			 {
			 	this.model.formData.repairId=options.id
			 }
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
				
				RepairProgressApi.createProgress(this.model.formData)
				.then(res => {
					 console.log(res)
				     this.$util.Tips({title:'提交成功'},'/pages/house/users/repair/detail?id='+this.model.formData.repairId);
				}).catch(e => {
					 console.log(e)
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
</style>