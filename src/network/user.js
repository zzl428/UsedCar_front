import {request} from './request'

// 注册
export function register(phone, password){
  return request({
    method: 'post',
    url:'/front/register',
    headers: {
      "Content-Type": 'application/json'
    },
    data:{
      form: {
        phone,
        password
      }
    }
  })
}

// 验证手机号是被已被注册
export function checkPhone(phone){
  return request({
    method: 'get',
    url:`/front/register/${phone}`,
  })
}

// 登录
export function login(phone, password){
  return request({
    method: 'post',
    url:'/front/login',
    headers: {
      "Content-Type": 'application/json'
    },
    data:{
      form: {
        phone,
        password
      }
    }
  })
}

// 获取用户收藏商品
export function getCollect(id){
  return request({
    method: 'get',
    url:`/front/user/${id}/collect`,
  })
}

// 取消收藏
export function cancelCollect(id){
  return request({
    method: 'delete',
    url:`/front/user/collect/${id}`,
  })
}

// 生成订单
export function addOrders(id, price){
  return request({
    method: 'post',
    url:`/front/user/orders/${id}`,
    params: {
      price
    }
  })
}

export function getCateList(queryInfo){
  return request({
    method: 'get',
    url:'/cars/categories',
    params: {
      queryInfo
    }
  })
}

// 获取参数信息
export function getParams(){
  return request({
    method: 'get',
    url:`/cars/params`,
  })
}

export function removeTempFile(path){
  return request({
    method: 'delete',
    url:'/temp/goods/cate/logo',
    params: {
      path
    }
  })
}

// 添加商品
export function addGood(addform, paramsform, attrsform, pics){
  return request({
    method: 'post',
    url:`/cars`,
    headers: {
      "Content-Type": 'application/json'
    },
    data: {
      addform,
      paramsform,
      attrsform,
      pics
    }
  })
}

// 获取订单列表
export function orderList(){
  return request({
    method: 'get',
    url:`/front/orders`,
  })
}

// 取消订单
export function cancelOrder(id){
  return request({
    method: 'delete',
    url:`/front/orders/${id}`,
  })
}