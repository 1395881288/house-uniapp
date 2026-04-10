<template>
	<view class="container">
		<u--form labelPosition="top" labelWidth="200" :model="model" :rules="rules" ref="uForm">
			<u-form-item
				label="联系人"
				prop="formData.contact"
			>
				<u--input
					v-model="model.formData.contact"
					placeholder="请输入昵称"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
				label="联系电话"
				prop="formData.contact"
			>
				<u--input
					v-model="model.formData.mobile"
					placeholder="请输入电话"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item label="故障照片" prop="formData.image">
				<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						multiple
						:maxCount="10"
					></u-upload>
			</u-form-item>
			<u-form-item label="报修内容" prop="formData.description">
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
	import * as RepairApi from '@/api/repair/repair/index.js';
	import {
		HTTP_REQUEST_URL,
		HEADER,
		TOKENNAME,
		HEADERPARAMS
	} from '@/config/app';
	
	export default {
		components: {

		},
		data() {
			return {
				fileList1: [],
				model: {
					formData: {
						orderId:0,
						landlordId:0,
						buildingId:0,
						buildingName:"buildingName",
						roomId:0,
						roomName:"roomName",
						userId:1,
						contact:'',
						mobile:'',
						pictures:[],
						description:"",
						status:0
					},
				},
				rules: {
					'formData.contact': {
						type: 'string',
						required: true,
						message: '请填写昵称',
						trigger: ['blur', 'change']
					},
					'formData.mobile': {
						type: 'string',
						required: true,
						message: '请填写微信号',
						trigger: ['blur', 'change']
					},
					'formData.description': {
						type: 'string',
						min: 6,
						required: true,
						message: '不低于6个字',
						trigger: ['change']
					},
				},

			};
		},
		computed: mapGetters(['isLogin', 'userInfo']),
		onLoad(option) {
			console.log("=====onLoad====="+this.isLogin)
			console.log(this.userInfo)
			if (!this.isLogin) {
				toLogin();
			}
			this.model.formData.contact=this.userInfo.nickname
            this.model.formData.mobile=this.userInfo.mobile
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {

			submit() {
				console.log(this.$store.state.app.userInfo)
				let that=this
				//this.model.formData.image = this.model.fileList1.join();
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
					that.dosubmit()
				}).catch(e => {
					console.log(e)
					uni.$u.toast('校验失败')
				})
			},
			dosubmit(){
				this.model.formData.pictures=JSON.stringify(this.fileList1);
			 
				RepairApi.create(this.model.formData)
				.then(res => {
					 console.log(res)
				 
				}).catch(e => {
					 console.log(e)
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					console.log(this[`fileList${event.name}`])
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				let that=this;
				console.log(url)
				return new Promise((resolve, reject) => {
					 uni.uploadFile({
						 url: HTTP_REQUEST_URL+"/app-api/infra/file/upload",
						 filePath: url,
						 header: {
							// #ifdef MP
							"Content-Type": "multipart/form-data",
							// #endif
							'Authorization': 'Bearer ' + this.$store.state.app.token,
							'tenant-id':1
						 },
						 name: 'file', // 后端接收的文件名
						 formData: {
							 key: 'val' // 后端接收的其他参数
						 },
						 success: function(res) {
							 console.log(res)
							 let json=JSON.parse(res.data);
							 resolve(json.data)
						 },
						 fail: function(res) {
							that.Tips({
								title: '上传图片失败'
							});
						 }
				    })
			    })
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