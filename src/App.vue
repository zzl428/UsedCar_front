<template>
  <div id="app">
    <keep-alive exclude="Detail,Orders,Sell,Profile">
      <router-view/>
    </keep-alive>
    
    <tabbar/>
  </div>
</template>

<script>
import Tabbar from 'components/tabbar/Tabbar'

export default {
  name: 'App',
    components: {
      Tabbar
    }
}
</script>

<style>
@import url('./assets/css/global.css');
</style>
