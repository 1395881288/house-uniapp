<template>
<view class="container">
		<u--form labelPosition="top" labelWidth="200" :model="model" :rules="rules" ref="uForm">
			<u-form-item label="上传图片">
				<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						multiple
						:maxCount="10"
					></u-upload>
			</u-form-item>
			<u-form-item label="回复内容" prop="formData.description">
				<u--textarea placeholder="请输入内容" v-model="model.formData.description" count></u--textarea>
			</u-form-item>
		</u--form>
		<u-button class="btn" type="error" shape="circle" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {
		HTTP_REQUEST_URL,
		HEADER,
		TOKENNAME,
		HEADERPARAMS
	} from '@/config/app';
	import * as RepairProgressApi from '@/api/repair/repairprogress/index.js';
	
	export default {
		name: 'reply',
		data() {
			return {
				fileList1: [],
				model: {
					formData: {
						repairId:0,
						userId:0,
						contact:"",
						mobile:"",
						description: '',
						pictures: [],
						status:1
						
					},
				},
				rules: {
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
		props: {
			keyword: {
				type: String,
				default: ''
			},
			repairId:{
				type: Number,
				default: 0
			}
		},
		computed: {
			testcomputed(){
				return 0
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			delKeyword(){
				this.$emit('delKeyword');
			},
			submit() {
				alert(this.repairId)
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
				this.model.formData.repairId=this.repairId;
				this.model.formData.pictures=JSON.stringify(this.fileList1);
				this.model.formData.contact=this.$store.state.app.userInfo.nickname;
				this.model.formData.mobile=this.$store.state.app.userInfo.mobile;
 
				RepairProgressApi.createProgress(this.model.formData)
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
			////////////////////////////////////////////////////////////////
		}
	}
</script>

<style scoped lang="scss">
	.container{
		margin: 20rpx 30rpx;
	}
	.btn{
		margin-top: 30rpx;
	}
</style>
