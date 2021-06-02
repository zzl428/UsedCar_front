<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
    <!-- <van-tabbar-item name="category" icon="apps-o" to="/category">分类</van-tabbar-item> -->
    <van-tabbar-item name="sell" icon="gold-coin-o" to="/sell">卖车</van-tabbar-item>
    <van-tabbar-item name="orders" icon="orders-o" to="/orders">收藏</van-tabbar-item>
    <van-tabbar-item name="profile" icon="friends-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'Tabbar',
  data() { 
    return {
      active: 'home',
    }
  },
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

  .van-tabbar {
    border-top: .1px solid black;
    background-color: #fff;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>