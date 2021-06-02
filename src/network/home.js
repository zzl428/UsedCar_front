import {request} from './request'

// 获取首页商品数据
export function getGoods(queryInfo){
  return request({
    method: 'get',
    url:`/front/home/goods`,
    params: {
      queryInfo
    }
  })
}

// 关键字查询
export function searchByKeys(keys){
  return request({
    method: 'get',
    url:`/front/home/goods/keys`,
    params: {
      keys
    }
  })
}