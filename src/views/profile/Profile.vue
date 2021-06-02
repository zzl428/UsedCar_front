<template>
  <div class="profile">
    <div class="avatar_box">
      <div class="avatar"><img src="~assets/img/avatar.png" alt=""></div>
    </div>
    <div class="panel_box">
      <div class="panel">
        <div class="sign"><span>{{phone}}</span></div>
        <!-- 功能单元格区域 -->
        <div class="cell">
          <!-- <van-cell value="个人信息" icon="manager" center is-link /> -->
          <van-cell value="我的订单" icon="label" center is-link @click="show = true"/>
          <van-cell value="了解更多" is-link url="https://github.com/zzl428" icon="weapp-nav"/>
          <van-cell value="分享面板" icon="share" @click="showShare = true" is-link/>
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </div>
        
      </div>
    </div>
    <div style="margin: 10px;" class="logout">
        <van-button round block type="danger" @click="logout">退出</van-button>
    </div>

    <van-popup v-model="show" position="right" :style="{ width: '100%', height: '100%' }" class="order_dialog">
      <div class="head">
        <van-icon name="arrow-left" @click="show = false" />
        <span>我的订单({{orders.length}})</span>
      </div>
      <!-- 订单 -->
        <van-swipe-cell v-for="item in orders" :key="item.id">
          <van-card 
            :thumb="item.cover"
            :thumb-link="`/detail/${item.cars_id}`">
            <template #title>
              <span class="title">{{item.title}}</span>
            </template>
            <template #desc>
              <p class="desc">{{item.order_number}}</p>
            </template>
            <template #price>
              <span class="price">{{item.order_price}}万</span>
            </template>
            <template #footer>
              <van-tag color="#7232dd" size="large" v-if="item.order_pay === 0">未付款</van-tag>
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="cancelOrder(item.id)"/>
          </template>
        </van-swipe-cell>
    </van-popup>
  </div>
</template>

<script>
import {orderList, cancelOrder} from 'network/user'

export default {
  name: 'Profile',
  data() { 
    return {
      phone: '',
      orders: [],
      showShare: false,
      show: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    }
  },
  created () {
    this.phone = localStorage.getItem('phone')
    this.orderList()
  },
  methods: {
    // 网络请求
    async orderList() {
      const {data} = await orderList()
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,订单加载失败');
      this.orders = data.data.result
    },
    // 取消收藏
    async cancelOrder(id) {
      const {data} = await cancelOrder(id)
      if(!data) return
      if(data.meta.status !== 200)  return Toast.fail('网络错误,取消订单失败');
      this.orderList()
    },

    // 功能
    // 退出
    logout() {
      window.localStorage.removeItem('front_token')
      window.localStorage.removeItem('phone')
      window.localStorage.removeItem('front_id')
      this.$router.push('/login')
    }
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
  .profile {
    width: 100%;
    height: 100%;
  }



  .avatar_box {
    position: relative;
    z-index: 9;
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;
    border-radius: 0 0 30% 30%;
    background-color: #001938;
  }

  .avatar {
    position: absolute;
    top: 30%;
    margin: auto;
    width: 130px;
    height: 130px;
    img {
      width: 100%;
    }
  }

  .panel_box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 65%;
  }
  .panel {
    position: relative;
    bottom: 40px;
    border-radius: 3%;
    width: 95%;
    height: 100%;
    background-color: hsla(0,0%,90.2%,.404);

    .sign {
      position: absolute;
      top: 50px;
      left: 38.5%;
    }

    .cell {
      position: absolute;
      width: 95%;
      top: 100px;
      left: 9px;

      .van-cell__value--alone {
        margin-left: 15px;
      }
    }
  }

  .logout {
    position: absolute;
    width: 80%;
    bottom: 75px;
    right: 27px;
  }

  .order_dialog {
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

    .van-card {
      margin-top: 8px;

      .title {
        font-size: 18px;
      }

      .desc {
        font-size: 14px;
      }

      .price {
        font-size: 15px;
        color: red;
      }

      .number {
        display: inline-block;
      }
    }
  }

  .delete-button {
    height: 100%;
  }
</style>