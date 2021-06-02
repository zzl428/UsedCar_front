<template>
  <div class="home">
    <navbar title="怪兽汽车" v-if="!search"></navbar>
    <van-search v-model="queryInfo.query" v-else shape="round" background="#F5F5F6" @clear="getGoods"
      placeholder="请输入搜索关键词" input-align="center" @search="getGoods" clearable show-action>
      <template #action>
        <div @click="searchKey">筛选</div>
      </template>
    </van-search>  
    <scroll ref="scroll" 
      :probe-type="3" :pull-up-load="true" 
      @scroll="contentScroll" @pullingUp="loadMore">
      <swiper></swiper>

      <goods-list :goods="goodlist"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>

    <van-popup v-model="show">
      <van-field v-model="selectedKeys" label="品牌车系" @click="showbrand = true"/>
      <van-field clickable name="车型" :value="keys.car_type" label="车型" placeholder="车型"
        @click="showCarType = true" />
      <van-row>
        <van-col span="15">
          <van-field v-model="keys.engine_min" label="发动机功率" placeholder="min"/>
        </van-col>
        <van-col span="9"><van-field v-model="keys.engine_max" placeholder="max"/></van-col>
      </van-row>
      <van-row>
        <van-col span="15">
          <van-field v-model="keys.price_min" label="价格(万)" placeholder="min"/>
        </van-col>
        <van-col span="9"><van-field v-model="keys.price_max" placeholder="max"/></van-col>
      </van-row>
      <van-row>
        <van-col span="15">
          <van-field v-model="keys.age_min" label="车龄(年)" placeholder="min"/>
        </van-col>
        <van-col span="9"><van-field v-model="keys.age_max" placeholder="max"/></van-col>
      </van-row>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="searchByKeys">筛选</van-button>
      </div>
    </van-popup>

    <van-popup v-model="showbrand" round position="bottom">
      <van-cascader :options="brands_trains" @close="show = false" @finish="onFinish" :field-names="fieldNames"/>
    </van-popup>
    <van-popup v-model="showCarType" position="bottom">
      <van-picker @confirm="onConfirmCarType" show-toolbar :columns="options"/>
    </van-popup>
  </div>
</template>

<script>
import Navbar from 'components/navbar/Navbar'
import Swiper from 'components/swiper/Swiper'
import GoodsList from 'components/goods/GoodsList'
import Scroll from 'components/scroll/Scroll'
import BackTop from 'components/backtop/BackTop'

import {getGoods, searchByKeys} from 'network/home'
import {getCateList, getParams} from 'network/user'
import { Toast } from 'vant';

export default {
  name: 'Home',
  data() { 
    return {
      show: false,
      showbrand: false,
      showCarType: false,
      keys: {
        // brand: '',
        train: '',
        car_type: '',
        engine_min: 0,
        engine_max: 0,
        price_min: 0,
        price_max: 0,
        age_min: 0,
        age_max: 0,
      },
      selectedKeys: '',
      // 父级分类数据
      brands_trains: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 20
      },
      flag: 0,
      // 商品列表
      goodlist: [],
      // 控制返回顶部的显示隐藏
      isShow:false,
      search: true,
      fieldNames: {
        text: 'name',
        value: 'name',
        children: 'children',
      },
      // 级别选项数据
      options: [],
      // 燃料类型选项数据
      options2: [],
    }
  },
  components: {
    Navbar,
    Swiper,
    GoodsList,
    Scroll,
    BackTop
  },
  created () {
    // 获取商品数据
    this.getGoods()
    // 获取品牌车系数据
    this.getBrandTrain()
    // 获取参数数据
    this.getParams()
  },
  mounted () {
    
  },
  methods: {
    // 网络请求
    async getGoods() {
      const {data} = await getGoods(this.queryInfo)
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,商品信息加载失败');
      if(data.data.result.length === 0) return Toast.fail('到底了~');
      if(this.queryInfo.query !== '') {
        if(this.flag === 0) {
          this.goodlist = data.data.result
          this.flag = 1
        } else this.goodlist.push(...data.data.result)
      } else {
        if(this.flag === 1) {
          this.goodlist = data.data.result
          this.flag = 0
          this.queryInfo.pagenum = 1
        } else this.goodlist.push(...data.data.result)
      }
      
      // this.goodlist = data.data.result
      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    },
    // 获取品牌车系数据
    async getBrandTrain() {
      const {data} = await getCateList({type: 3})
      if(!data) return
      if(data.meta.status !== 200) return Toast.fail('获取父级分类信息失败')
      let brands = []
      let start = 65
      let key = 0
      let code = String.fromCharCode(start)
      brands[key] = {
        id: 0,
        name: code,
        children: []
      }
      for(let i of data.data.result.result) {
        if(i.initial === code) {
          brands[key].children.push(i)
        } else {
          start ++,
          key++
          code = String.fromCharCode(start)
          brands[key] = {
            id: 0,
            name: code,
            children: []
          }
          brands[key].children.push(i)
        }
      }
      this.brands_trains = brands
    },
    // 获取汽车级别数据
    async getParams() {
      const {data} = await getParams()
      if(!data) return
      if(data.meta.status !== 200) return Toast.fail('获取参数信息失败')
      let {car_type, fuel_type} = data.data.result
      for(let i of car_type) {
        if(i.car_type === 'undefined') continue
        this.options.push(i.car_type)
      }
      for(let i of fuel_type) {
        if(!i.fuel_type) continue
        this.options2.push(i.fuel_type)
      }
    },
    // 关键字查询
    async searchByKeys() {
      if(this.keys.train === '' && this.keys.car_type === '' && this.keys.price_min == 0 && this.keys.price_max == 0 
          && this.keys.engine_min == 0 && this.keys.engine_max == 0 && this.keys.age == 1)
        return  Toast.fail('请输入查询条件')
      if((this.keys.price_min - this.keys.price_max) > 0) return Toast.fail('请输入正确的价格区间')
      if((this.keys.engine_min - this.keys.engine_max) > 0) return Toast.fail('请输入正确的功率区间')
      if((this.keys.age_min - this.keys.age_max) > 0) return Toast.fail('请输入正确的车龄区间')
      const {data} = await searchByKeys(this.keys)
      if(!data) return
      if(data.meta.status !== 200) return Toast.fail('获取参数信息失败')
      if(data.data.result.length === 0) return Toast.fail('没有符合条件的爱车')
      this.goodlist = data.data.result
      this.show = false
    },

    // 功能
    // 回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // 是否显示backtop
      this.isShow = position.y < -800
      this.search = position.y > -60
    },
    loadMore() {
      this.queryInfo.pagenum++
      this.getGoods()
    },
    searchKey() {
      this.show = true
    },
    // 功能
    onFinish({ value, selectedOptions, tabIndex }) {
      // this.keys.brand = selectedOptions[1].name
      this.keys.train = selectedOptions[2].name
      this.selectedKeys = selectedOptions[1].name + '/' + this.keys.train
    },
    onConfirmCarType(value) {
      this.keys.car_type = value
      this.showCarType = false
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
  .home {
    height: calc(100vh - 50px);
  }

  .navbar {
    border-bottom: .1px solid black;
  }

  .wrapper{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 46px;
    bottom: 50px;
    left: 0px;
    right: 0px;
  }

  .van-popup {
    width: 100%;
  }
</style>