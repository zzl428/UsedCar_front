<template>
  <div class="order">
    <navbar :title='"我的收藏("+total+")"'></navbar>
    
    <scroll>
      <van-swipe-cell v-for="item in collect" :key="item.id">
        <van-card 
          :thumb="item.cover"
          :thumb-link="`/detail/${item.car_id}`">
          <template #title>
            <span class="title">{{item.title}}</span>
          </template>
          <template #desc>
            <p class="desc">{{item.card_time.split('-')[0]}}/{{item.odograph}}万公里</p>
          </template>
          <template #price>
            <span class="price">{{item.price}}万</span>
          </template>
          <template #footer>
            <van-button size="small" @click="addOrders(item.car_id, item.price, item.id)">立即订购</van-button>
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="cancelCollect(item.id)"/>
        </template>
      </van-swipe-cell>
    </scroll>

    
  </div>
</template>

<script>
import Navbar from 'components/navbar/Navbar'
import Scroll from 'components/scroll/Scroll'

import {getCollect, cancelCollect, addOrders} from 'network/user'
import { Toast } from 'vant';

export default {
  name: 'Orders',
  data() { 
    return {
      collect: [],
      total: 0
    }
  },
  components: {
    Navbar,
    Scroll,
  },
  created () {
    this.getCollect()
  },
  methods: {
    // 网络请求
    async getCollect() {
      const {data} = await getCollect(localStorage.getItem('front_id'))
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,商品信息加载失败');
      this.collect = data.data.result
      this.total = data.data.result.length
    },
    // 取消收藏
    async cancelCollect(id) {
      const {data} = await cancelCollect(id)
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,取消收藏失败');
      this.getCollect()
    },
    // 生成订单
    async addOrders(id, price, collectId) {
      const {data} = await addOrders(id, price)
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,生成订单失败');
      this.cancelCollect(collectId)
      Toast.success('订单已生成,请尽快完成交易');
      
    },

    // 功能
    // 跳转到详情页
    // toGoods(id) {
    //   this.$router.push(`/detail/${id}`)
    // }
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

  .order {
    height: 100vh;
    height: calc(100vh - var(--vh-offset, 0px));
  }

  .wrapper{
    position: absolute;
    top: 46px;
    bottom: 50px;
    left: 0px;
    right: 0px;
  }

  .van-card {
    margin-top: 8px;

    .van-button {
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }

  .delete-button {
    height: 100%;
  }

  .title {
    font-size: 18px;
  }

  .desc {
    font-size: 13px;
  }

  .price {
    font-size: 15px;
    color: red;
  }
</style>