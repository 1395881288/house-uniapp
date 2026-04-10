<template>
  <view class="container" v-if="show">
    <view class="content">
      <u-alert class="notice" :title="notice.title" type = "warning" :description = "notice.description" effect="dark"></u-alert>
      <q-turntable class="turntable" ref="turntable" @start="turntableStart" @success="turntableSuccess"></q-turntable>
      <view class="btnContainer">
         <view class="hide" @click="show=false">
          关闭
         </view>
      </view>
	  <!--
      <vue-seamless-scroll v-if="prizehistory.length>0" :data="prizehistory" :class-option="classOption" class="scroll-container">
         <view class="ul">
           <view class="li" v-for="item in prizehistory">{{item}}</view>
         </view>
      </vue-seamless-scroll>
	   -->
    </view>
  </view>
</template>

<script>
//import vueSeamlessScroll from 'vue-seamless-scroll'
import qTurntable from '@/components/q-turntable/q-turntable.vue';
export default {
  components: {
    qTurntable,
    //vueSeamlessScroll
  },
  data() {
    return {
      show:true,
      notice: {
        title:'',
        description:'租房有好礼，租房即可获得现金大礼包。\r\n兑奖方式：出示租房合同，立马兑换现金。'
		  },
      award: 1,
      awardList: [
      	{
      		title: '一等奖'
      	},
      	{
      		title: '二等奖'
      	},
      	{
      		title: '三等奖'
      	},
      	{
      		title: '四等奖'
      	},
      	{
      		title: '五等奖'
      	},
      	{
      		title: '六等奖'
      	},
      ], // 顺时针对应每个奖项
      prizehistory: [
        /*
        "134xxx234 抽中 一等奖 200元",
        "138xxx563 抽中 三等奖 600元",
        "136xxx482 抽中 四等奖 100元",
        "133xxx296 抽中 二等奖 1000元",
        "153xxx592 抽中 三等奖 800元",
        "139xxx627 抽中 五等奖 600元"
        */
      ],
      classOption:{
        step:0.6,
        openTouch:false,
        hoverStop:false
      }
    };
  },
	beforeMount() {
		this.init();
	},
  methods: {
    init(){
      this.getPrizeHistory()
      this.getPrizeStatus()
    },
    // 用户点击开始抽奖
    turntableStart() {
      let index = Math.floor(Math.random() * 6 + 1) //前端随机数，这里应该后台返回中奖结果
      this.award = index
      this.award= 1
      this.$refs.turntable.begin(this.award);
      this.savePrizeRecord()
    },

    // 抽奖完成后操作
    turntableSuccess() {
      const index = this.award - 1;
      console.log('bind:success', this.awardList[index]);
      uni.showToast({
        title: `恭喜你获得${this.awardList[index].title}`,
        duration:2000,
        icon: 'none'
      });
    },

    //保存抽奖记录
    savePrizeRecord(){
      var queryParams = {
        number: this.award,
        prizeId: 0,
        prize: 0,
        userId: "",
        mobile: "",
        status: 0,
      }
      uni.$u.http.post('/house/prize-record/create', queryParams).then(res => {
         console.log(res)

           //uni.$u.toast(res.msg)


      }).catch(err => {
         //alert("login "+JSON.stringify(err))
         console.log(err)
      })
    },
    getPrizeHistory(){
      uni.$u.http.get('/house/news/get', {params:{id:28}}).then(res => {
         console.log(res)
         var content=res.data.content;
         var regex = /(<([^>]+)>)/ig
         content = content.replace(regex, "");
         content=content.trim();
         this.prizehistory=content.split(",")
         console.log(content)
      }).catch(err => {
         console.log(err)

      })
    },
    getPrizeStatus(){
      uni.$u.http.get('/house/dict-type/get', {params:{type:'house_prize_enable'}}).then(res => {
         console.log(res)
         var content=res.data.content;
         var regex = /(<([^>]+)>)/ig
         content = content.replace(regex, "");
         content=content.trim();
         this.prizehistory=content.split(",")
         console.log(content)
      }).catch(err => {
         console.log(err)

      })
    }
    ////////////////////////
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index:999;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.content{
  display: flex;
  width: 100%;
  height: 100%;
}
.notice{
  margin: 0 20px 20px 20px;
  font-weight: bold;
  box-shadow: 0 0 10px #cccccc;
}
::v-deep .u-alert__content__title{
  text-align: center!important;
  font-size: 16px!important;
}
.btnContainer{
  display: flex;

  .hide{
    background-color: #ffffff;
    margin: 40px auto 0 auto;
    text-align: center;
    padding: 6px 30px;
    border-radius: 999px;
    color: #666666;
    box-shadow: 0 0 20px #cccccc;
  }
}


 .scroll-container{
  background: #ffffff;
  width: calc(100% - 40px);
  margin: 20px 20px 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 20px #cccccc;
  border-radius: 4px;
  height: 100px;
  position: relative;
  overflow: hidden;

  .ul{
  }
  .li{
    padding: 6px 10px;
    color: #666666;
  }
 }
</style>
