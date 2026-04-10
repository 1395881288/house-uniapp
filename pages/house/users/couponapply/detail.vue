<template>
	<view class="container">
		<u--form labelPosition="left" labelWidth="80" :model="model" :rules="rules" ref="uForm">
			<u-form-item
				label="申请状态"
				prop="formData.status"
			>
				<u-tag v-if="model.formData.status==1"      text="申请中" type="warning"></u-tag>
				<u-tag v-else-if="model.formData.status==2" text="审核通过" type="success"></u-tag>
				<u-tag v-else-if="model.formData.status==3" text="审核拒绝"  type="error"></u-tag>
			</u-form-item>
			<u-form-item
				label="昵称"
				prop="formData.nickname"
			>
				<u--input
					v-model="model.formData.nickname"
					placeholder="请输入昵称"
					class="inputstyle"
					:disabled="true"
				></u--input>
			</u-form-item>
			<u-form-item
				label="微信"
				prop="formData.weixin"
			>
				<u--input
					v-model="model.formData.weixin"
					placeholder="请输入微信"
					class="inputstyle"
					:disabled="true"
				></u--input>
			</u-form-item>

			<u-form-item label="上传凭证" prop="formData.image">
				<u--image :src="model.formData.image" loadingIcon="photo" width="80px" height="80px" bgColor="#eaeaea">
					 <template v-slot:loading>
					    <u-icon name="photo"  size="48"></u-icon>
					 </template>
				</u--image>
			</u-form-item>
			<u-form-item label="申请内容" prop="formData.applycontent">
				<u--textarea 
					placeholder="请输入内容" 
					:disabled="true"
					v-model="model.formData.applycontent">
				</u--textarea>
			</u-form-item>
			<u-form-item v-if="model.formData.status>1" label="审核意见" prop="formData.applycontent">
				<u--textarea 
					placeholder="请输入内容" 
					:disabled="true"
					v-model="model.formData.content">
				</u--textarea>
			</u-form-item>
		</u--form>
		<u-button class="btn" type="error" shape="circle" @click="submit">返回</u-button>

	</view>
</template>

<script>
    import { toLogin } from '@/libs/login.js';
    import { mapGetters } from "vuex";
	import request from "@/utils/request.js";
	import * as CouponApplyApi from '@/api/house/couponapply/index.js';
import { userInfo } from 'os';
	export default {
		components: {

		},
		data() {
			return {
				data:{},
				model: {
					formData: {
						couponId:28,
						templateId:18,
						userId:1,
						status:1,
						nickname:'昵称',
						name:'优惠券',
						weixin: '',
						image: '',
						applycontent: '',
						
					},
				},
				rules: {
					'formData.nickname': {
						type: 'string',
						required: true,
						message: '请填写昵称',
						trigger: ['blur', 'change']
					},
					'formData.weixin': {
						type: 'string',
						required: true,
						message: '请填写微信号',
						trigger: ['blur', 'change']
					},
					
/* 					'formData.image': {
						type: 'string',
						min: 3,
						required: true,
						message: '请上传图片',
						trigger: ['change']
					}, */
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
		computed: mapGetters(['isLogin', 'userInfo']),
		onLoad(option) {
			console.log("=====onLoad=====")
			let that = this
			console.log(option)
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('data', function(data) {
				console.log(data)
				//alert(JSON.stringify(data))
				that.data = data
				that.model.formData=data.couponApply;
			})
		},
		onReady() {
 
		},
		methods: {

			submit() {
				uni.navigateBack()
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