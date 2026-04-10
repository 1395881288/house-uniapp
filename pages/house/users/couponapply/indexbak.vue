<template>
	<view class="container">
		<u--form labelPosition="top" labelWidth="200" :model="model" :rules="rules" ref="uForm">
			<u-form-item
				label="微信号"
				prop="formData.weixin"
				borderBottom
			>
				<u--input
					v-model="model.formData.name"
					placeholder="请输入微信号"
				></u--input>
			</u-form-item>
			<u-form-item label="上传凭证" prop="formData.image" borderBottom>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="1"></u-upload>
			</u-form-item>
			<u-form-item label="申请内容" prop="formData.applycontent" borderBottom>
				<u--textarea placeholder="请输入内容" v-model="model.formData.applycontent" count></u--textarea>
			</u-form-item>
		</u--form>
		<u-button type="error" shape="circle" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		components: {

		},
		data() {
			return {
				showSex: false,
				model: {
					fileList1: [],
					formData: {
						weixin: '',
						applycontent: '',
						image: ''
					},
				},
				rules: {
					'formData.weixin': {
						type: 'string',
						required: true,
						message: '请填写微信号',
						trigger: ['blur', 'change']
					},
					'formData.image': {
						type: 'string',
						min: 3,
						required: true,
						message: '请上传图片',
						trigger: ['change']
					},
					'formData.applycontent': {
						type: 'string',
						min: 3,
						required: true,
						message: '不低于3个字',
						trigger: ['change']
					},
				},

			};
		},
		onLoad() {



		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {

			submit() {
				this.model.formData.image = this.model.fileList1.join();
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			},
			///////////////////////////上传图片开始/////////////////////////////////
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
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			///////////////////////////上传图片结束/////////////////////////////////
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx;
	}
</style>