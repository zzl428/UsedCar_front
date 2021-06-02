<template>
  <div class="back-top">
    <img src="~assets/img/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
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
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>