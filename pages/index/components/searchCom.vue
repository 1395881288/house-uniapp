<template>
  <view class="HMfilterDropdown" :class="{'setDropdownBottom':maskVisibility}" :style="{'top':menuTop+'rpx'}"
        @touchmove.stop.prevent="discard" @tap.stop="discard">
        <view class="nav">
            <block v-for="(item,index) in menu" :key="index">
                <view class="first-menu" :class="{'on':showPage==index}" @tap="togglePage(index)">
                    <text class="name">{{item.name}}</text>
                    <text class="iconfont triangle" :style="'transform:rotate('+item.rotate+'deg);'"></text>
                </view>
            </block>
        </view>
        <view class="mask" :class="{'show':isShowMask,'hide':maskVisibility!=true}" @tap="togglePage(showPage)"></view>
        <block v-for="(page,page_index) in menu" :key="page_index">
            <view class="sub-menu-class" :class="{'show':showPage==page_index,'hide':page.pageState!=true}">
                <block v-if="page.type=='position'&& page.submenu.length>0">
                    <scroll-view class="sub-menu-list"
                                 :scroll-y="true">
                        <block v-for="(sub,index) in page.submenu" :key="index">
                            <view class="sub-menu" :id="'first_id'+index">
                                <view class="menu-name">
                                    <text>{{sub.name}}</text>
                                    <text class="iconfont selected"></text>
                                </view>
                            </view>
                        </block>
                    </scroll-view>
                </block>
                <block v-if="page.type=='price' && page.submenu.length>0">
                    <scroll-view class="sub-menu-list"
                                 :scroll-y="true">
                        <block v-for="(sub,index) in page.submenu" :key="index">
                            <view class="sub-menu" :id="'first_id'+index">
                                <view class="menu-name">
                                    <text>{{sub.name}}</text>
                                    <text class="iconfont selected"></text>
                                </view>
                            </view>
                        </block>
                    </scroll-view>
                </block>
                <block v-if="page.type=='more' && page.submenu.length>0">
                    <scroll-view class="sub-menu-list"
                                 :scroll-y="true">
                        <block v-for="(sub,index) in page.submenu" :key="index">
                          <view class="moreview">
                            <view class="title">{{sub.name}}</view>
                            <view class="moreviewul">
                                <block v-for="(subchild,indexchild) in sub.list" :key="indexchild">
                                <view class="moreviewli" :id="'first_id'+indexchild">
                                    <view>
                                        <text>{{subchild.name}}</text>
                                    </view>

                                </view>
                              </block>
                            </view>

                          </view>
                        </block>
                    </scroll-view>
                </block>
            </view>
        </block>
  </view>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                  {name:"位置",rotate:0,pageState:false,
                   type: 'position',
                   submenu:[
                            {
                                "name": "全深圳",
                                "value": "不限"
                            },{
                                "name": "宝安",
                                "value": "宝安"
                            },
                            {
                                "name": "南山",
                                "value": "南山"
                            },
                            {
                                "name": "龙华",
                                "value": "龙华"
                            },
                            {
                                "name": "福田",
                                "value": "福田"
                            },
                            {
                                "name": "龙岗",
                                "value": "龙岗"
                            },
                            {
                                "name": "罗湖",
                                "value": "罗湖"
                            },
                            {
                                "name": "布吉",
                                "value": "布吉"
                            },
                            {
                                "name": "光明",
                                "value": "光明"
                            },
                            {
                                "name": "坪山",
                                "value": "坪山"
                            },
                            {
                                "name": "盐田",
                                "value": "盐田"
                            },
                            {
                                "name": "大棚新区",
                                "value": "大棚新区"
                            },
                            {
                                "name": "深圳周边",
                                "value": "深圳周边"
                            }
                           ]
                  },
                  {name:"租金",rotate:0,pageState:false,
                   type: 'price',
                   submenu:[
                            {
                                "name": "不限",
                                "value": "不限"
                            },{
                                "name": "600元以下",
                                "value": ""
                            },
                            {
                                "name": "600-1000元",
                                "value": ""
                            },
                            {
                                "name": "1000-1500元",
                                "value": ""
                            },
                            {
                                "name": "1500-2000元",
                                "value": ""
                            },
                            {
                                "name": "2000-3000元",
                                "value": ""
                            },
                            {
                                "name": "3000-3500元",
                                "value": ""
                            },
                            {
                                "name": "3000-5000元",
                                "value": ""
                            },
                            {
                                "name": "5000-8000元",
                                "value": ""
                            },
                            {
                                "name": "8000以上",
                                "value": ""
                            }
                           ]
                  },
                  {name:"户型",rotate:0,pageState:false,
                   type: 'position',
                   submenu:[
                            {
                                "name": "不限",
                                "value": ""
                            },{
                                "name": "一室",
                                "value": ""
                            },
                            {
                                "name": "两室",
                                "value": "1000米"
                            },
                            {
                                "name": "三室",
                                "value": ""
                            },
                            {
                                "name": "四室及以上",
                                "value": ""
                            }
                           ]
                  },
                  {name:"更多",rotate:0,pageState:false,
                   type: 'more',
                   submenu:[
                            {
                              name:"朝向",
                              list:[
                                 {
                                     "name": "不限",
                                     "value": "不限"
                                 },{
                                     "name": "朝东",
                                     "value": ""
                                 },
                                 {
                                     "name": "朝南",
                                     "value": ""
                                 },
                                 {
                                     "name": "朝西",
                                     "value": ""
                                 },
                                 {
                                     "name": "朝北",
                                     "value": ""
                                 }
                              ],
                            },
                            {
                              name:"面积",
                              list:[
                                 {
                                     "name": "不限",
                                     "value": ""
                                 },{
                                     "name": "≤40㎡",
                                     "value": ""
                                 },
                                 {
                                     "name": "40~60㎡",
                                     "value": ""
                                 },
                                 {
                                     "name": "60~80㎡",
                                     "value": ""
                                 },
                                 {
                                     "name": "80~100㎡",
                                     "value": ""
                                 },
                                 {
                                     "name": "100~120㎡",
                                     "value": ""
                                 },
                                 {
                                     "name": "≥120㎡",
                                     "value": ""
                                 }
                              ],
                            }
                           ]
                  },
                  {name:"排序",rotate:0,pageState:false,
                   type: 'position',
                   submenu:[
                            {
                                "name": "综合排序",
                                "value": ""
                            },{
                                "name": "价格(从高到低)",
                                "value": "500米"
                            },
                            {
                                "name": "价格(从低到高)",
                                "value": "1000米"
                            },
                            {
                                "name": "面积(从大到小)",
                                "value": "2000米"
                            },
                            {
                                "name": "面积(从小到大)",
                                "value": "5000米"
                            }
                           ]
                  }
                ], //顶部横条数据
                maskVisibility: false, //遮罩层显示/隐藏状态
                showPage: -1, //菜单页面显示/隐藏动画控制
                isShowMask: false, //遮罩层显示/隐藏动画控制

                subData:[
                  {
                      "name": '位置',
                      "type": 'position',
                      "submenu": [{
                                      "name": "不限",
                                      "value": "不限"
                                  },{
                                      "name": "500米",
                                      "value": "500米"
                                  },
                                  {
                                      "name": "1000米",
                                      "value": "1000米"
                                  },
                                  {
                                      "name": "2000米",
                                      "value": "2000米"
                                  },
                                  {
                                      "name": "5000米",
                                      "value": "5000米"
                                  }]
                  },
                  {
                      "name": '位置',
                      "type": 'position1',
                      "submenu": [],
                  },
                  {
                      "name": '位置',
                      "type": 'position1',
                      "submenu": [],
                  },
                  {
                      "name": '位置',
                      "type": 'position1',
                      "submenu": [],
                  },
                  {
                      "name": '位置',
                      "type": 'position1',
                      "submenu": [],
                  },
                ],
            }
        },
        props: {
            menuTop: {
                value: Number,
                default: 0
            }

        },
        watch: {

        },
        methods: {
            //菜单开关
            togglePage(index) {
                if (index == this.showPage) {
                    this.hidePageLayer(true);
                    this.hideMask();
                    this.showPage = -1;
                } else {
                    if (this.showPage > -1) {
                        this.hidePageLayer(false);
                    }
                    this.showPageLayer(index);
                    this.showMask();
                }
            },
            //hide遮罩层
            hideMask() {
                this.isShowMask = false;
                setTimeout(() => {
                    this.maskVisibility = false;
                }, 200);
            },
            //show遮罩层
            showMask() {
                this.maskVisibility = true;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.isShowMask = true;
                    }, 0);
                })
            },
            //hide菜单页
            hidePageLayer(isAnimation) {
                console.log("this.showPage "+this.showPage)
                this.menu[this.showPage].rotate = 0;
                let tmpIndex = this.showPage;
                if (isAnimation) {
                    setTimeout(() => {
                        this.menu[tmpIndex].pageState=false;
                    }, 200);
                    //this.confirm();
                } else {
                    this.menu[tmpIndex].pageState=false;
                }
            },
            //show菜单页
            showPageLayer(index) {
                this.menu[index].pageState = true;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.showPage = index;
                    }, 0);
                })
                this.menu[index].rotate = 180;
            },
            confirm() {
              this.$emit('confirm', {
                  index: 1,
                  value: 2
              });
            },
            discard() {

            }
        }
    }
</script>

<style lang="scss">
    .HMfilterDropdown {
        flex-shrink: 0;
        width: 100%;
        /*position: absolute;*/
        z-index: 997;
        flex-wrap: nowrap;
        display: flex;
        flex-direction: row;
        top: var(--window-top);
        overflow-y: hidden;

        &.setDropdownBottom {
            height: 1500rpx;
        }

        view {
            display: flex;
            flex-wrap: nowrap;
        }
    }
    .nav {
        width: 100%;
        height: 44px;
        border-bottom: solid 1rpx #eee;
        z-index: 12;
        background-color: #ffffff;
        flex-direction: row;

        .first-menu {
            width: 100%;
            font-size: 15px;
            color: #757575;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            transition: color .2s linear;

            &.on {
                color: #ec652b;

                .iconfont {
                    color: #ec652b;
                }
            }

            .name {
                height: 20px;
                text-align: center;
                text-overflow: clip;
                overflow: hidden;
            }

            .iconfont {
                width: 13px;
                height: 13px;
                align-items: center;
                justify-content: center;
                transition: transform .2s linear, color .2s linear;
            }
        }
    }
   .sub-menu-class {
       width: 100%;
       position: absolute;
       left: 0;
       transform: translate3d(0, - 100%, 0);
       max-height: 345px;
       background-color: #ffffff;
       z-index: 11;
       box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
       overflow: hidden;
       flex-direction: row;
       transition: transform .15s linear;

       &.hide {
           display: none;
       }

       &.show {
           transform: translate3d(0, calc(44px + 1rpx), 0);
       }
    }
    .moreview{
      margin: 20rpx;
      display: flex;
      flex-direction: column;

      .title{
        font-weight: bold;
        font-size: 28rpx;
        margin-bottom: 20rpx;
      }
      .moreviewul{
         display: grid;
         grid-gap: 20rpx;
         grid-template-columns: auto auto auto;
      }
      .moreviewli{
        width: 100%;
        box-sizing: border-box;
        font-size: 26rpx;
        display: flex;
        justify-content: center;
        padding: 18rpx;
        background-color: #eaeaea;
        border-radius: 10rpx;

      }
    }
    .sub-menu-list {
        width: 100%;
        height: 345px;
        flex-direction: column;

        .sub-menu {
            min-height: 44px;
            font-size: 13px;
            flex-direction: column;
            padding-right: 15px;

            > .menu-name {
    			padding-left: 20px;
                height: 44px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                > .iconfont {
                    display: none;
                    font-size: 18px;
                    color: #ec652b;
                }
            }
        }

        &.first {
            flex-shrink: 0;
            width: 236rpx;
            background-color: #f0f0f0;

            .sub-menu {
                padding-left: 15px;

                &.on {
                    background-color: #fff;
                }
            }
        }

        &.alone {
            max-height: 345px;
            min-height: 170px;
            height: auto;

            .sub-menu {
                min-height: calc(44px - 1rpx);
                margin-left: 15px;
                border-bottom: solid 1rpx #e5e5e5;

                &.on {
                    color: #ec652b;

                    > .menu-name {
                        > .iconfont {
                            display: block;
                        }
                    }
                }
            }
        }

        &.not-first {
            .sub-menu {
                min-height: calc(44px - 1rpx);
                margin-left: 15px;
                border-bottom: solid 1rpx #e5e5e5;

                > .menu-name {
                    height: calc(44px - 1rpx);

                    > .iconfont {
                        display: none;
                        font-size: 18px;
                        color: #ec652b;
                    }
                }

                &.on {
                    color: #ec652b;

                    > .menu-name {
                        > .iconfont {
                            display: block;
                        }
                    }
                }

                .more-sub-menu {
                    flex-direction: row;
                    flex-wrap: wrap;
                    padding-bottom: 9px;

                    > text {
                        height: 30px;
                        border-radius: 3px;
                        background-color: #f5f5f5;
                        color: #9b9b9b;
                        margin-bottom: 6px;
                        margin-right: 6px;
                        text-align: center;
                        line-height: 30px;
                        border: solid #f5f5f5 1rpx;
                        flex: 0 0 calc(33.33% - 6px);
                        overflow: hidden;
                        font-size: 12px;

                        &:nth-child(3n) {
                            margin-right: 0;
                        }

                        &.on {
                            border-color: #f6c8ac;
                            color: #ec652b;
                        }

                        .iconfont {
                            color: #9b9b9b;
                        }
                    }
                }
            }
        }
    }
    .mask {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
        transition: background-color .15s linear;

        &.show {
            background-color: rgba(0, 0, 0, 0.5);
        }

        &.hide {
            display: none;
        }
    }
    /* 字体图标 */
    @font-face {
        font-family: "HM-FD-font";
        src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALAAAsAAAAABpQAAAJzAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgp4gQIBNgIkAwwLCAAEIAWEbQc5G8sFERWMIbIfCbbzqA4hp7InSBibVsYGb4J42o82b3e/nJlHMw/NHbGOlwKJRCRpwzPtpAECCOZubdqxjYpQLMlVg+70/08edrgQOtx2ukpVyApZn+dyehPoQObHo3O85rYx9vOjXoBxQIHugW2yIkqIW2QXcScu4jwE8CSWbKSmrqUHFwOaJoCsLM5P4haSGIxRcRHshrUGucLCVcfqI3AZfV/+USguKCwNmtsxVztDxU/n55C+3W0Z4QQpEOTNFqCBbMCAjDUWB9CIwWk87aa70cYgqLkyd3dEmm+18R8eKATEBrV7A5CulBT8dKiWOYZk412XNcDdKSEKSGODnyKIDl+dmVt9/Dx4pu/xyeutkMlHISGPTsPCnoTNP9nOT6wTtDdlO6dPr47efvj942lkYuQzrhMKEjq9N6y98P3340gmlJ/RStUD6F31CAEEPtUW94/7rf+7XgaAz57X0ZHXAGsFFwVgw38yALuMb0IBbVyNamFYEw4oKMDTj3AHRQP5Pt4dci9VwSVkRNQh5r7CLskZadhsWHhRDBsXczk8ZYk3ewnCxmQeQKa3BOHvA8XXO2j+vqRhf7CE+sPmn4anvoL29JLa4qqaUQkmoK+QG2osCckq7txi2leK86aIPyJ3eQZ8xytXYmyQ51jQndJAxIJlqiGSLsOqImiZCjTiZCJt6Lq26U2OoXqwUo0hRaAE0K5AziANy/uLVeXzWyjVqyjcoeupjxDr5MMDn8MDkLG9Aenu5ZrOSSoghAUsRmogkkahSoWAtnlUARnCkY3It0Iu7mWhdmd9Z/19BwBP6GidEi0G56opckXTGZVSPxgAAAA=');
    }

    .iconfont {
        font-family: "HM-FD-font" !important;
        font-size: 13px;
        font-style: normal;
        color: #757575;

        &.triangle {
            &:before {
                content: "\e65a";
            }
        }

        &.selected {
            &:before {
                content: "\e607";
            }
        }
    }
</style>
