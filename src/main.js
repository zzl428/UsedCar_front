import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
// import vConsole  from './common/vconsole'
import 'element-ui/lib/theme-chalk/index.css';
import { Upload } from 'element-ui';
import { Button } from 'element-ui';
Vue.use(Upload);
Vue.use(Button);

Vue.use(Vant);
// Vue.use(vConsole)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
