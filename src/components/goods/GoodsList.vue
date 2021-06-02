<template>
  <div class="goods_list">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item">
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  props: {
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() { 
    return {

    }
  },
  components: {
    GoodsListItem
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

  .goods_list {
    height: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>