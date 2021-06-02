<template>
  <div class="navbar">
    <van-nav-bar :title="title" :left-arrow="back"
      @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        <slot name="left"></slot>
      </template>
      <template #title class="title">
        <slot name="title"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    back: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() { 
    return {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      Toast('按钮');
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

  .van-nav-bar {
    background-color: #F5F5F6;
  }
</style>