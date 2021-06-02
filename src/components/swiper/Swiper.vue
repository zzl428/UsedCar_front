<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    images: {
      type: Array,
      default() {
        return [
          'https://image1.guazistatic.com/qn2105171507543481962f9e2f4b3fde8194b64a137a08.jpg?imageView2/2',
          'https://image1.guazistatic.com/qn200915164657f3c8728a24be42079364a09d819cdcad.jpg?imageView2/2',
        ]
      }
    }
  },
  data() { 
    return {

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
  .swiper{
    overflow: hidden;
    // height: ;
    width: 100%;

    img {
      width: 100%;
    }
  }
</style>