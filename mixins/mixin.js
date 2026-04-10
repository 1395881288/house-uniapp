import {
	toLogin
} from '@/libs/login.js';
	
export default{
	data(){
		return {

		}
	},
	methods: {
		log(data){
			if((typeof data)!='string')
			{
				data=JSON.stringify(data);
			}
			console.log(data)
		},
		
		
		/**
		 * navigatorTo跳转页面
		 * @param {String} url
		 * @param {Object} options
		 * @param {Boolean} options.login 是否检测登录  
		 */
		navTo(url, options={}){
	        console.log("============navTo")	
			uni.$u.throttle(()=>{
				
				console.log("============uni.$u.throttle")
				
			}, 300)
			
			if(!url){
				return;
			}
			 
			if(options.login)
			{
				if(!this.$store.getters.isLogin)
				{
				   console.log("============toLogin")	
				   toLogin();
				   return;
				}
				
			}
			if(url.indexOf('tabbar')!=-1) //tabBar 只能通过 uni.switchTab 跳转
			{
				uni.switchTab({
				    url: url
				});
			}
			else //非tabBar 只能通过 uni.navigateTo 跳转
			{
				uni.navigateTo({
					url:url
				})
				.then(() => {
				  // 页面跳转成功的处理
				  console.log('跳转成功'+url);
				})
				.catch((error) => {
				  // 捕捉异步错误并进行处理
				  console.error('导航到页面发生错误:', error);
				});
			}
			
		}
  
	}
}