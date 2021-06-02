import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Home = () => import('views/home/Home.vue')
const Cate = () => import('views/cate/Cate.vue')
const Orders = () => import('views/order/Orders.vue')
const Profile = () => import('views/profile/Profile.vue')
const Login = () => import('views/profile/Login.vue')
const Register = () => import('views/profile/Register.vue')
const Detail = () => import('views/detail/Detail.vue')
const Sell = () => import('views/sell/Sell.vue')

const routes = [
  {path: '/', redirect: '/home'},
  { path: '/home', component: Home },
  { path: '/category', component: Cate },
  { path: '/orders', component: Orders },
  { path: '/profile', component: Profile},
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/sell', component: Sell},
  { path: '/detail/:id', component: Detail},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
  if (to.path === '/login' || to.path === '/register') {
    if(window.localStorage.getItem('front_token')) return next('/home')
    else return next()
  } else if (to.path === '/profile') {
    if(!window.localStorage.getItem('front_token')) return next('/login')
    else return next()
  }
  next()
})

export default router
