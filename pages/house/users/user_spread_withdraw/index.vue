<template>
	<view class="container">
		<u--form labelPosition="top" labelWidth="200" :model="model" :rules="rules" ref="uForm">
			<u-form-item
				label="提现类型"
				prop="formData.type"
			>
				<u-radio-group
				    v-model="model.formData.type"
				    placement="row"
					@change="groupChange"
				  >
				    <u-radio
				      :customStyle="{marginBottom: '8px'}"
				      v-for="(item, index) in radiolist"
				      :key="index"
				      :label="item.name"
				      :name="item.value"
				    >
				    </u-radio>
				  </u-radio-group>
			</u-form-item>
			<u-form-item
				label="提现金额"
				prop="formData.price"
			>
				<u--input
					v-model="model.formData.price"
					placeholder="请输入提现金额"
					type="number"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item 
			   v-show="model.formData.type!=2" 
			   label="收款码" 
			   prop="formData.accountQrCodeUrl"  
			   @click='uploadpic'
			>
				<u--image :src="model.formData.accountQrCodeUrl" loadingIcon="photo" width="80px" height="80px" bgColor="#eaeaea">
					 <template v-slot:loading>
					    <u-icon name="photo"  size="48"></u-icon>
					 </template>
				</u--image>
			</u-form-item>
			<u-form-item 
				v-show="model.formData.type==2"
				label="持卡人姓名"
				prop="formData.name"
			>
				<u--input
					v-model="model.formData.name"
					placeholder="请输入持卡人姓名"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
			    v-show="model.formData.type==2"
				label="银行卡号"
				prop="formData.accountNo"
			>
				<u--input
					v-model="model.formData.accountNo"
					placeholder="请输入银行卡号"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
                v-show="model.formData.type==2"
				label="银行"
				prop="formData.bankName"
			>
				<u--input
					v-model="model.formData.bankName"
					placeholder="请输入持卡人姓名"
					class="inputstyle"
				></u--input>
			</u-form-item>
			<u-form-item
			    v-show="model.formData.type==2"
				label="开户行"
				prop="formData.bankAddress"
			>
				<u--input
					v-model="model.formData.bankAddress"
					placeholder="请输入开户行"
					class="inputstyle"
				></u--input>
			</u-form-item>
		</u--form>
		<u-button class="btn" type="error" shape="circle" @click="submit">提交</u-button>
	</view>
</template>

<script>
    import { toLogin } from '@/libs/login.js';
    import { mapGetters } from "vuex";
	import request from "@/utils/request.js";
	import * as BrokerageAPI from '@/api/house/brokerage/brokerage.js'
    import { userInfo } from 'os';
	export default {
		components: {

		},
		data() {
			return {
				showSex: false,
				model: {
					formData: {
						type:3,
						price:0,
						status:0,
						accountQrCodeUrl:'',
						name:'',
						accountNo:'',
						bankName:'',
						bankAddress:''
						
					},
				},
				rules: {
					'formData.type': {
						type: 'number',
						required: true,
						message: '请选择提现类型',
						trigger: ['blur', 'change']
					},
					'formData.price': {
						type: 'number',
						required: true,
						message: '请填写提现金额',
						trigger: ['blur', 'change']
					},
 					'formData.accountQrCodeUrl': {
						type: 'string',
						min: 3,
						required: true,
						message: '请上传收款码',
						trigger: ['change']
					}

				},
				rules2: {
					'formData.type': {
						type: 'number',
						required: true,
						message: '请选择提现类型',
						trigger: ['blur', 'change']
					},
					'formData.price': {
						type: 'number',
						required: true,
						message: '请填写提现金额',
						trigger: ['blur', 'change']
					},
					'formData.name': {
						type: 'string',
						required: true,
						message: '请填写持卡人姓名',
						trigger: ['blur', 'change']
					},
					'formData.accountNo': {
						type: 'string',
						required: true,
						message: '请填写银行卡号',
						trigger: ['blur', 'change']
					},
					'formData.bankName': {
						type: 'number',
						required: true,
						message: '请填写银行',
						trigger: ['blur', 'change']
					},
					'formData.bankAddress': {
						type: 'string',
						required: true,
						message: '请填写开户行',
						trigger: ['blur', 'change']
					}
				},
		        radiolist: [
					{
					  name: '微信',
					  value:3
					},
					{
					  name: '支付宝',
					  value:4
					},
					{
					  name: '银行卡',
					  value:2
					}
				],
			};
		},
		computed: mapGetters(['isLogin', 'userInfo']),
		onLoad(option) {
			console.log("=====onLoad====="+this.isLogin)
			if (!this.isLogin) {
				toLogin();
			}
			this.model.formData.nickname=this.userInfo.nickname
			
			let that = this
			console.log(option)
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('data', function(data) {
				console.log(data)
				//alert(JSON.stringify(data))
				that.model.formData.couponId=data.id;
				that.model.formData.templateId=data.templateId;
				that.model.formData.name=data.name;
			})
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
				 
				console.log(BrokerageAPI)
				BrokerageAPI.createBrokerageWithdraw(this.model.formData)
				.then(res => {
				     console.log(res)
					 //uni.navigateBack()
				}).catch(e => {
					 console.log(e)
				})
			},
			/**
			 * 上传文件
			 */
			uploadpic: function() {
				this.$util.uploadImageOne({}, res => {
					this.model.formData.accountQrCodeUrl = res.data;
				});
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			},
			groupChange(n) {
			    console.log('groupChange', n);
				this.$refs.uForm.setRules(n==2?this.rules2:this.rules);
 
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
		background: linear-gradient(90deg, #FF7931 0%,#F11B09 100%);
		line-height: 86rpx;
	}
	::v-deep .u-radio{
		margin-right: 30rpx;
	}
</style>