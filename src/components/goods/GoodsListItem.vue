<template>
  <div class="goods_list_item" @click="itemClick">
    <img :src="goodsItem.cover" alt="">
    <div class="info">
      <p>{{goodsItem.title}}</p>
      <div class="price_serve">
        <span class="price">{{goodsItem.price}}万</span>
        <van-tag type="success">到店服务</van-tag>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsListItem',
  props: {
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() { 
    return {

    }
  },
  methods: {
    // imageLoad() {
    //   console.log(1);
    // }
    itemClick() {
      this.$router.push(`/detail/${this.goodsItem.id}`)
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

  .goods_list_item {
    border: 1px solid #fbfbfb;
    box-shadow: .1px .1px .1px .1px;
    padding-bottom: 40px;
    margin-bottom: 10px;
    position: relative;
    width:45%;

    img {
      width: 100%;
      height: 120px;
      border-radius: 5px;
    }

    .info {
      font-size: 14px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      // text-align: center;

      p {
        padding-left: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }


      .price_serve {
        display: flex;
        justify-content: space-between;

        .price {
          color: red;
          padding-left: 3px;
        }

        .van-tag {
          margin-right: 5px;
        }
      }
      

      
    }
  }
</style>