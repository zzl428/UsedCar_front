<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDom from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import ObserveImage from '@better-scroll/observe-image'

BScroll.use(ObserveDom)
BScroll.use(Pullup)
BScroll.use(ObserveImage)

export default {
  name: 'Scroll',
  props: {
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() { 
    return {
      scroll:null
    }
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('11');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted(){
    // 创建对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      observeDOM: true,
      click:true,
      pullUpLoad:this.pullUpLoad,
      observeImage: true // 开启 observe-image 插件
    })
    // 监听滚动位置
    if(this.probeType===2||this.probeType===3) {
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })
    }
    
    // 监听滚到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        // console.log('2');
        this.$emit('pullingUp')
      })
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
</style>