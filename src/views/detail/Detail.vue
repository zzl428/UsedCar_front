<template>
  <div class="detail">
    <navbar :back="true">
      <div slot="title" class="title">
        <div v-for="(item, index) in titles" 
          :key="index" class="title-item"
          :class="{active:index === currentIndedx}"
          @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </navbar>
    <scroll ref="scroll" :probe-type="3" @scroll="contentScroll">
      <swiper :images="pics"></swiper>
      <div class="base_info">
        <div class="goods_title">{{baseInfo.title}}</div>
        <div class="price_info">
          <div class="price">
            <span class="newprice">{{baseInfo.price}}万</span>
            <span class="oldprice">{{baseInfo.old_price}}万</span>
          </div>
          <div class="card">
            <span class="label">上牌时间: </span>
            <span>{{baseInfo.card_time}}</span>
          </div>
          <van-tag type="success" size="mini">到店服务</van-tag>
        </div>
        <div class="serve" @click="showServe">
          <span>售后保障</span>
          <van-tag type="success" round >30天无忧退车</van-tag>
          <van-tag type="warning" round >不支持30天全面保修</van-tag>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="archives" ref="archives">
        <div class="archives_title" @click="show_attr">
          <span>车辆档案</span>
          <van-icon name="arrow" />
        </div>
        
        <div class="archives_attr">
          <van-row>
            <van-col span="5">表显里程</van-col>
            <van-col span="7">{{baseInfo.odograph}}万公里</van-col>
            <van-col span="5">首次上牌</van-col>
            <van-col span="7">{{baseInfo.card_time}}</van-col>
          </van-row>
          <van-row>
            <van-col span="5">排放标准</van-col>
            <van-col span="7">{{car_keys.displace_reg}}</van-col>
            <van-col span="5">过户</van-col>
            <van-col span="7">{{baseInfo.tranfer}}</van-col>
          </van-row>
          <van-row>
            <van-col span="5">排量</van-col>
            <van-col span="7">{{car_keys.displacement}}</van-col>
            <van-col span="5">变速箱</van-col>
            <van-col span="7">{{car_keys.is_auto === 1 ? '自动' : '手动'}}</van-col>
          </van-row>
          <van-row>
            <van-col span="5">使用性质</van-col>
            <van-col span="7">{{car_keys.is_bussiness === 1 ? '运营' : '非运营'}}</van-col>
            <van-col span="5">产权性质</van-col>
            <van-col span="7">{{car_keys.is_private === 1 ? '私用' : '公用'}}</van-col>
          </van-row>
        </div>
      </div>
      <div class="good_pics" ref="good_pics">
        <span>车辆实拍</span>
        <div v-for="(item, index) in pics" :key="index" class="good_pic">
          <img :src="item" alt="" @load="imageload">
        </div>
      </div>
      <div class="recommen" ref="recommen">
        <span>好车推荐</span>
        <goods-list :goods="goodlist"></goods-list>
      </div>
    </scroll>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺"/>
      <van-goods-action-icon icon="star-o" text="收藏" color="#ff5000" v-if="!isCollect"/>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" v-else/>
      <van-goods-action-button type="warning" text="电话咨询" />
      <van-goods-action-button type="danger" text="加入收藏" @click="addcollect"/>
    </van-goods-action>
    
    <van-popup v-model="visible" position="bottom" :style="{ height: '40%' }" class="serve_dialog">
      <div class="up">
        <span>售后保障</span>
      </div>
      <van-divider></van-divider>
      <div class="down">
        <div class="one">
          <van-icon name="success" color="#fff"/><span>30天无忧退车</span>
          <p>交易完成后30天内,车况经认定为重大结构性损伤、火烧、水泡、调表问题,可申诉进行全额退款退车</p>
        </div>
        <div class="two">
          <van-icon name="fail" color="#fff"/><span>不支持30天全面保修</span>
          <p>交易完成后30天内,发现任何问题,不支持30天全面保修</p>
        </div>
      </div>
    </van-popup>  
    <van-popup v-model="attr_visible" position="right" :style="{ width: '100%' }" class="attr_dialog">
      <div class="head">
        <van-icon name="arrow-left" @click="attr_visible = false" />
        <span>车辆档案</span>
      </div>
      <div class="base_attr">
        <span>基本参数</span>
        <van-row>
          <div class="left">厂商</div>
          <div class="right">{{attrs.firm}}</div>
        </van-row>
        <van-row>
          <div class="left">级别</div>
          <div class="right">{{attrs.level}}</div>
        </van-row>
        <van-row>
          <div class="left">发动机</div>
          <div class="right">{{car_keys.displacement}}L/{{attrs.engine_power}}马力/L4</div>
        </van-row>
        <van-row>
          <div class="left">变速箱</div>
          <div class="right">{{car_keys.is_auto === 1 ? '自动' : '手动'}}</div>
        </van-row>
        <van-row>
          <div class="left">车身结构</div>
          <div class="right">{{attrs.car_struct}}</div>
        </van-row>
        <van-row>
          <div class="left">长/宽/高(mm)</div>
          <div class="right">{{attrs.size}}</div>
        </van-row>
        <van-row>
          <div class="left">轴距(mm)</div>
          <div class="right">{{attrs.wheelbase}}</div>
        </van-row>
        <van-row>
          <div class="left">行李箱容积(L)</div>
          <div class="right">250</div>
        </van-row>
        <van-row>
          <div class="left">整备质量(kg)</div>
          <div class="right">1092</div>
        </van-row>
      </div>
      <div class="engine_attr">
        <span>发动机参数</span>
        <van-row>
          <div class="left">排量(L)</div>
          <div class="right">{{car_keys.displacement}}</div>
        </van-row>
        <van-row>
          <div class="left">进气形式</div>
          <div class="right">自然吸气</div>
        </van-row>
        <van-row>
          <div class="left">气缸数</div>
          <div class="right">{{attrs.cylinder}}</div>
        </van-row>
        <van-row>
          <div class="left">最大马力(Pa)</div>
          <div class="right">{{attrs.engine_power}}</div>
        </van-row>
        <van-row>
          <div class="left">最大扭矩(N*m)</div>
          <div class="right">132</div>
        </van-row>
        <van-row>
          <div class="left">燃料类型</div>
          <div class="right">{{car_keys.fuel_type}}</div>
        </van-row>
        <van-row>
          <div class="left">燃油标号</div>
          <div class="right">{{attrs.fuel_num}}</div>
        </van-row>
        <van-row>
          <div class="left">供油方式</div>
          <div class="right">多点电喷</div>
        </van-row>
      </div>
      <div class="break">
        <span>底盘及制动</span>
        <van-row>
          <div class="left">驱动方式</div>
          <div class="right">前置前驱</div>
        </van-row>
        <van-row>
          <div class="left">助力类型</div>
          <div class="right">电动助力</div>
        </van-row>
        <van-row>
          <div class="left">前悬挂类型</div>
          <div class="right">独立悬架</div>
        </van-row>
        <van-row>
          <div class="left">后悬挂类型</div>
          <div class="right">非独立悬架</div>
        </van-row>
        <van-row>
          <div class="left">前制动类型</div>
          <div class="right">通风盘式</div>
        </van-row>
        <van-row>
          <div class="left">后制动类型</div>
          <div class="right">鼓式</div>
        </van-row>
        <van-row>
          <div class="left">驱车制动类型</div>
          <div class="right">{{car_keys.break === 0 ? '手刹' : '脚刹'}}</div>
        </van-row> 
        <van-row>
          <div class="left">前轮胎规格</div>
          <div class="right">185/65 R14</div>
        </van-row>
        <van-row>
          <div class="left">后轮胎规格</div>
          <div class="right">185/65 R14</div>
        </van-row>
      </div>
      <div class="safe_setting">
        <span>安全配置</span>
        <van-row>
          <div class="left">主/副驾驶安全气仓库</div>
          <div class="right">标配/标配</div>
        </van-row>
        <van-row>
          <div class="left">前/后排侧气囊</div>
          <div class="right">-/-</div>
        </van-row>
        <van-row>
          <div class="left">前/后排头部气囊</div>
          <div class="right">-/-</div>
        </van-row>
        <van-row>
          <div class="left">胎压检测</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">车内中控锁</div>
          <div class="right">标配</div>
        </van-row>
        <van-row>
          <div class="left">儿童座椅接口</div>
          <div class="right">标配</div>
        </van-row>
        <van-row>
          <div class="left">无钥匙启动</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">防抱死系统(ABS)</div>
          <div class="right">标配</div>
        </van-row>
        <van-row>
          <div class="left">车身稳定控制(ESP)</div>
          <div class="right">-</div>
        </van-row>
      </div>
      <div class="out_setting">
        <span>外部配置</span>
        <van-row>
          <div class="left">电动天窗</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">全景天窗</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">电动吸和门</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">感应后背箱</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">感应雨刷</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">后雨刷</div>
          <div class="right">标配</div>
        </van-row>
        <van-row>
          <div class="left">前/后电动车窗</div>
          <div class="right">标配/标配</div>
        </van-row>
        <van-row>
          <div class="left">后视镜电动调节</div>
          <div class="right">标配</div>
        </van-row>
        <van-row>
          <div class="left">后视镜加热</div>
          <div class="right">-</div>
        </van-row>
      </div>
      <div class="inner_setting">
        <span>内部配置</span>
        <van-row>
          <div class="left">多功能方向盘</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">定速巡航</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">后排独立空调</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">空调控制方式</div>
          <div class="right">手动</div>
        </van-row>
        <van-row>
          <div class="left">GPS导航</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">倒车雷达</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">倒车影响系统</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">真皮座椅</div>
          <div class="right">-</div>
        </van-row>
        <van-row>
          <div class="left">前/后排座椅加热</div>
          <div class="right">-/-</div>
        </van-row>
      </div>
    </van-popup>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import Navbar from 'components/navbar/Navbar'
import Swiper from 'components/swiper/Swiper'
import Scroll from 'components/scroll/Scroll'
import GoodsList from 'components/goods/GoodsList'
import BackTop from 'components/backtop/BackTop'

import { Toast } from 'vant';
import {goodsDetail, addcollect} from 'network/detail'
import {getGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  data() { 
    return {
      id: null,
      titles: ['商品', '档案', '图片', '推荐'],
      currentIndedx : 0,
      baseInfo: {},
      car_keys: {},
      attrs: {},
      pics: [],
      visible: false,
      attr_visible: false,
      goodlist: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 20
      },
      themeTopYs:[],
      getThemeTopY:null,
      isShow: false,
      isCollect: false,
    }
  },
  components: {
    Navbar,
    Swiper,
    Scroll,
    GoodsList,
    BackTop
  },
  created () {
    this.id = this.$route.params.id
    this.goodsDetail()
    // 获取推荐数据
    this.getGoods()
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.archives.offsetTop)
      this.themeTopYs.push(this.$refs.good_pics.offsetTop)
      this.themeTopYs.push(this.$refs.recommen.offsetTop)
      this.themeTopYs.push(this.$refs.recommen.offsetTop+100)
    }, 100)
  },
  methods: {
    // 网络请求
    // 获取商品数据
    async goodsDetail() {
      const {data} = await goodsDetail(this.id, localStorage.getItem('front_id'))
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,商品信息加载失败');
      if(data.data.result.isCollect !== null) this.isCollect = true
      this.baseInfo = data.data.result.base
      this.car_keys = data.data.result.car_keys
      this.attrs = data.data.result.attrs
      this.pics = data.data.result.pics
    },
    async getGoods() {
      const {data} = await getGoods(this.queryInfo)
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,商品信息加载失败');
      this.goodlist = data.data.result
    },
    // 加入收藏
    async addcollect() {
      if(this.isCollect) return Toast.fail('商品已在收藏夹');
      const {data} = await addcollect(this.id)
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,添加收藏失败');
      this.isCollect = true
      Toast.success('添加收藏成功');
    },

    // 功能
    // 变换导航栏状态
    itemClick(index) {
      this.currentIndedx = index
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+46, 200)
      // this.$emit('titleClick',index)
    },
    showServe() {
      this.visible = true
    },
    show_attr() {
      this.attr_visible = true
    },
    imageload() {
      this.getThemeTopY()
    },
    contentScroll(position){
      const positionY = -position.y+48
      for(let i = 0;i<this.themeTopYs.length-1;i++){
        if(i!==this.currentIndedx && positionY>this.themeTopYs[i] && positionY<=this.themeTopYs[i+1]){
          this.currentIndedx = i
        }
      }
      this.isShow = position.y < -1000
    },
    // 回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    
  }
 }
</script>

<style lang='less' scoped>
/*
 1.位置属性(position, top, right, z-index, display, float等)
 2.大小(width, height, padding, margin)
 3.文字系列(font, line-height, letter-spacing, color- text-align等)
 4.背景(background, border等)
 5.其他(animation, transition等)
*/
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    height: calc(100vh - var(--vh-offset, 0px));
  }

  .wrapper {
    position: absolute;
    top: 46px;
    bottom: 50px;
    left: 0px;
    right: 0px;
  }

  .title {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active{
    color: #ff5777;;
  }

  .base_info {
    margin-top: 10px;
    padding: 0 8px;
    border-bottom: 5px solid #f2f5f8;

    .goods_title{
      font-size: 20px;
      font-weight: bold;
    }

    .price_info {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;

      .newprice {
        font-size: 24px;
        color: #ff5777;
      }

      .oldprice {
        font-size: 13px;
        margin-left: 5px;
        // margin-right: 20px;
        text-decoration: line-through;
      }

      .card {
        padding-right: 10px;
        position: relative;
        top: 6px;

        .label {
          font-weight: bold;
        }
      }
    }

    .serve {
      margin-top: 10px;
      padding-bottom: 10px;
      display: flex;

      span {
        margin-right: 15px;
        font-weight: bold;
      }

      .van-icon {
        margin-left: 35px;
      }
    }
  }

  .serve_dialog {
    .up {
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
    }

    .van-divider {
      margin: 5px 0px;
      color: black;
    }

    .down {
      .one .van-icon {
        margin-left: 10px;
        margin-right: 5px;
        background-color: green;
      }
      .two .van-icon {
        margin-left: 10px;
        margin-right: 5px;
        background-color: grey;
      }
      p {
        margin-left: 30px;
        margin-right: 5px;
      }
    }
  }

  .archives {
    margin-top: 10px;
    padding: 0 8px;
    border-bottom: 5px solid #f2f5f8;
    .archives_title {
      span {
        font-weight: bold;
        margin-right: 279px;
      }
      padding-bottom: 5px;
      // display: block;
      
    }

    .archives_attr {
      padding-bottom: 6px;
      div {
        padding: 2px 0;
      }
    }
  }

  .good_pics {
    margin-top: 10px;
    border-bottom: 5px solid #f2f5f8;
    span {
      font-weight: bold;
      display: block;
      padding-bottom: 10px;
      padding-left: 8px;
    }
    .good_pic {
      text-align: center;
    }
    img {
      width: 98%;
    }
  }

  .attr_dialog {
    .head {
      height: 44px;
      font-size: 20px;
      border-bottom: 5px solid #f2f5f8;
      display: flex;
      align-items: center;
      span {
        padding-left: 128px;
      }
    }
    .base_attr, .engine_attr, .break, .safe_setting, .out_setting, .inner_setting {
      padding: 8px 8px;
      border-bottom: 5px solid #f2f5f8;
      span {
        font-weight: bold;
        font-size: 22px;
        display: block;
        padding-bottom: 15px;
      }
      .van-row {
        // display: flex;
        // justify-content: space-between;
        .left {
          float: left;
          padding: 10px 0;
        }
        .right {
          float: right;
          padding: 10px 0;
        }
      }
    }
  }

  .recommen {
    margin-top: 15px;

    span {
      font-weight: bold;
      display: block;
      padding-bottom: 10px;
      padding-left: 8px;
    }
  }
</style>